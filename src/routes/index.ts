import { Router } from "express";
import authRouter from "./authRouter.js"

const mainRouter = Router();

mainRouter.use('/auth', authRouter);

export default mainRouter;