import { StatusCodes } from 'http-status-codes';
import { SECRET_KEY } from '../../config';
import user from '../models/user';
import jwt from 'jsonwebtoken';
import Role from '../models/Role';

export const verifyJwt = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    !token && res.status(StatusCodes.FORBIDDEN).json({ message: "Token Not Provided" })

    try {
        const user_Decode = jwt.verify(token, SECRET_KEY)
        req.userID = user_Decode.id;

        const User = await user.findOne({ id: req.userID }, { password: 0 });
        const checkTokenExist = User.tokens.some(Us => Us.tokens === token)
        const healthCheck = User.isActive
        if (!User) {

            return res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found " })

        } else if (!healthCheck) {

            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "This User Is Lock Now" })
        }

        if (!checkTokenExist) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token Is Invalid" })
        }
        next()
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized!" })
    }

}
export const isAdmin = async (req, res, next) => {
    try {
        const User = await user.findOne({ id: req.userID }, { password: 0 });
        const roles = await Role.find({ _id: { $in: User.roles } });
        const isVip = roles.some(role => role.name === "admin");

        if (isVip) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Require ADMIN Role!" });
        }
    } catch (err) {
        console.error('Error checking VIP role:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
export const isCreator = async (req, res, next) => {
    try {
        const User = await user.findOne({ id: req.userID }, { password: 0 });
        const roles = await Role.find({ _id: { $in: User.roles } });
        const isVip = roles.some(role => role.name === "creator");

        if (isVip) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Require CREATOR Role!" });
        }
    } catch (err) {
        console.error('Error checking CREATOR role:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
export const isCensor = async (req, res, next) => {
    try {
        const User = await user.findOne({ id: req.userID }, { password: 0 });
        const roles = await Role.find({ _id: { $in: User.roles } });
        const isVip = roles.some(role => role.name === "censor");

        if (isVip) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Require CENSOR Role!" });
        }
    } catch (err) {
        console.error('Error checking CENSOR role:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ typeErr: "Required CENSOR role", message: "Internal Server Error" });
    }
};

export const isVipUser = async (req, res, next) => {
    try {
        const User = await user.findOne({ id: req.userID }, { password: 0 });
        // if (!User) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: "No user found" });
        // }

        const roles = await Role.find({ _id: { $in: User.roles } });
        const isVip = roles.some(role => role.name === "vip");

        if (isVip) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Require VIP Role!" });
        }
    } catch (err) {
        console.error('Error checking VIP role:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ typeErr: "Required VIP role", message: "Internal Server Error" });
    }
};

const checkRole = (roles) => async (req, res, next) => {
    try {
        const User = await user.findOne({ id: req.userID }, { password: 0 });
        if (!User) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
        }

        const userRoles = await Role.find({ _id: { $in: User.roles } });
        const hasRole = userRoles.some(role => roles.includes(role.name));

        if (hasRole) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: `Require ${roles.join(' or ')} Role!` });
        }
    } catch (err) {
        console.error(`Error checking ${roles.join(' or ')} role:`, err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

export const isADMIN = checkRole(['admin'])
export const isCREATOR = checkRole(['creator']);
export const isCENSOR = checkRole(['censor']);
export const isVIPUSER = checkRole(['vip']);