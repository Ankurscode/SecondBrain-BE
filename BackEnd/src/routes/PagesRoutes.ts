import { Router } from "express";
import { singIn, singUp } from "../controller/authController";
import {forgotPassword} from "../controller/forgotPassword"
import { resetPassword } from "../controller/resetPassword";

export const routes=Router();

routes.post("/signUp",singUp);
routes.post("/signIn",singIn);
routes.post("/forgot-password",forgotPassword);
routes.post("/reset-password", resetPassword);