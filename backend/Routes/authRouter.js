import express from "express"
import { signUp } from "../controllers/signUp.js";
import { login } from "../controllers/Login.js"
import { auth } from "../controllers/auth.js";

const router= express.Router();

router.post('/signup',signUp)
router.post("/login",login)
router.post("/auth",auth)

export { router as userRouter}