import { Router } from "express";
import { singIn, singUp } from "../controller/authController";
import {forgotPassword} from "../controller/forgotPassword"
import { resetPassword } from "../controller/resetPassword";
import { isAuthenticated } from "../middleware/authMiddleware";
import { content, deleteContent, newContents, shareContent } from "../controller/crudContainer";
import { share,shrelink } from "../controller/shareContent";

export const routes=Router();

routes.post("/signUp",singUp);
routes.post("/signIn",singIn);
routes.post("/forgot-password",forgotPassword);
routes.post("/reset-password", resetPassword);
routes.post("/addcontent",isAuthenticated,newContents)
routes.get("/content",isAuthenticated,content)
routes.delete("/delete/:contentId",isAuthenticated,deleteContent)
routes.get("/share/:userId",isAuthenticated,shareContent)
routes.post("/share",isAuthenticated,share)
routes.get("/:shareLink",isAuthenticated,shrelink)
