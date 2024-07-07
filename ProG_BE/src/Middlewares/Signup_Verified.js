import { StatusCodes } from "http-status-codes";
import { bloomConfig, bloomFilter, redisClient } from "../Cache/User_Cache";
import defaultRole from "../models/Role";

export const Exist_User_Checking = async (req, res, next) => {
    const nameRequiredCheck = req.body.username;
    try {
        if (!bloomConfig.has(nameRequiredCheck)) {
            return res.status(StatusCodes.OK).json({ message: "Username Not Contains" })
        }
        redisClient.get(nameRequiredCheck, async (err, cachedResult) => {
            if (err) throw err;

            if (cachedResult) {
                return res.status(200).json({ exists: JSON.parse(cachedResult) });
            }
            const user = await user.findOne({ username: nameRequiredCheck });
            const exists = !!user;
            redisClient.setEx(username, 3600, JSON.stringify(exists));
            if (exists) {
                bloomConfig.add(nameRequiredCheck);
                return res.status(StatusCodes.CONFLICT).json({ message: "Username already exists. Please choose a different one." });
            }

            next();

        })
    } catch (err) {
        console.error('Error checking username:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

export const Valid_Roles_Certification = (req, res, next) => {
    const roles = req.body.roles;

    if (!roles) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Roles Is Required - Must Provided' })
    }
    if (roles && typeof roles === 'object' && !Array.isArray(roles)) {
        req.body.roles = [roles];
    }
    const invalidRoles = roles.filter(role => !defaultRole.includes(role));
    if (invalidRoles.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `Roles '${invalidRoles.join(', ')}' are not supported.` });
    }

}