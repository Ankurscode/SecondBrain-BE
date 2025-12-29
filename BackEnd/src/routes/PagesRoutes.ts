import { Router } from "express";
import { singIn, singUp } from "../controller/authController";
import {resetPassword} from "../controller/forgotPassword"

export const routes=Router();

routes.post("/signUp",singUp);
routes.post("/signIn",singIn);
routes.post("/forgot-password",resetPassword)