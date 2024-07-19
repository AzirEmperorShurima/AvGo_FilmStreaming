import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { SECRET_KEY } from '../../config';
import user from '../models/user';
import { getCookies } from '../Middlewares/Cookies';
import Role from '../models/Role';

export const Signup_Handler = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const CreateUser = new user({ username, password, email });

        const role = await Role.findOne({ name: 'user' });
        CreateUser.roles = [role._id];
        const saveUser = await CreateUser.save();
        const token = await getCookies(CreateUser, res)
        CreateUser.tokens = [{ token, signedAt: Date.now().toString() }];
        await CreateUser.save();
        return res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in Create User Task', error });
    }

}



export const loginHandler = async (req, res) => {
    const UserName = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;

    if (!Password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password is required' });
    }

    try {
        let findUser;

        if (Email && !UserName) {
            findUser = await user.findOne({ email: Email }).populate("role");
            if (!findUser) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Email' });
            }
        }

        if (!Email && UserName) {
            findUser = await user.findOne({ username: UserName });
            if (!findUser) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Username' });
            }
        }

        if (!findUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(Password, findUser.password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Password' });
        }


        await getCookies(findUser, res)
        await manageTokens(findUser)

        return res.status(StatusCodes.OK).json({ message: 'Login Successful', token });

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err });
    }
};
export const logoutHandler = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: '' })
    try {
        const userDecoded = jwt.verify(token, SECRET_KEY);
        // await user.updateOne({
        //     $pull: { tokens: { token: token } },
        // });
        const User = await user.findById(decoded.id, { password: 0 });
        if (!User) return res.status(404).json({ message: "No user found" });
        await User.findByIdAndUpdate(userDecoded.id, { tokens: [] });

    } catch (error) {

    }
}

export const manageTokens = async (user) => {
    let tokensArray = user.tokens || []
    if (tokensArray.length) {
        tokensArray = tokensArray.filter(token => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
            if (timeDiff < 86400) {
                return token;
            }
        });
    }
    await user.findByIdAndUpdate(user.id, {
        tokens: [...tokensArray, { token, signedAt: Date.now().toString() }],
    });
}
