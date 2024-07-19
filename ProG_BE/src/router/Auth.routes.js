import { Router } from "express";
import { loginHandler, logoutHandler } from "../Controller/Auth_Controller";
import { Exist_User_Checking, Valid_Roles_Certification } from "../Middlewares/Signup_Verified";

const router = Router();

router.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();
    next();
})
router.post("/signin", loginHandler)
router.post("/logout", logoutHandler)
router.post("/signup", [Exist_User_Checking, Valid_Roles_Certification], loginHandler)

export default router;