import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config"
import { StatusCodes } from "http-status-codes";
export const CreateUser = (req, res) => {

}

export const getCookies = async (User, res) => {
    const { id } = User.id;
    try {
        const token = jwt.sign({ id: id }, SECRET_KEY, { expiresIn: '24h' })
        await res.cookie('token', token, { maxAge: 60 * 60 * 24, httpOnly: true, secure: true })
        res.status(StatusCodes.OK).json({ message: "Cookies Created Successfully", token: token });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Create Cookies Error", error: err });
    }
}

export const verifyCookies = async (req, res, next) => {
    const token = req.cookies.token
    console.log('TOKEN : ' + token)
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
}

export const logoutCookies = async (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(StatusCodes.OK).json({ message: "Cookies Logged Out Successfully" });
}