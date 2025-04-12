import { Router } from "express";
import { login, register,profile } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/profile", auth, profile);

export default authRoute;
