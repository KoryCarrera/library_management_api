import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { UserRepository } from "../repositories/userRepository.js";
import { AuthService } from "../service/authService.js";
import { AuthController } from "../controllers/authController.js";

const authRouter = Router();
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/login', authController.authLogin);

authRouter.post('/register', authController.registerUser);

export default authRouter;