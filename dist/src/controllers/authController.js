import { UserValidations } from "../schemas/userSchema.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    authLogin = async (req, res) => {
        try {
            const cleanData = UserValidations.validateDataLogin(req.body);
            if (!cleanData.success) {
                res.status(400).json({
                    success: false,
                    error: cleanData.error.errors
                });
                return;
            }
            const responseLogin = await this.authService.loginAuthUser(cleanData.data);
            if (!responseLogin) {
                res.status(401).json({
                    success: false,
                    data: "Credenciales Invalidas!"
                });
            }
            res.status(200).json({
                success: true,
                data: responseLogin
            });
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: err
            });
        }
    };
    registerUser = async (req, res) => {
        try {
            const cleanData = UserValidations.validateUser(req.body);
            if (!cleanData.success) {
                res.status(400).json({
                    success: false,
                    error: cleanData.error.errors
                });
                return;
            }
            const newUser = await this.authService.registerAuthUser(cleanData.data);
            res.status(201).json({
                success: true,
                data: newUser
            });
        }
        catch {
        }
    };
}
//# sourceMappingURL=authController.js.map