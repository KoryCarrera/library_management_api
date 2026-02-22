import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async loginAuthUser(data) {
        const userFound = await this.userRepository.getUserByEmail(data.email);
        if (!userFound) {
            return null;
        }
        const passwordVerify = await bcrypt.compare(data.password, userFound.password);
        if (!passwordVerify) {
            return null;
        }
        const payload = {
            id: userFound.id,
            rol: userFound.rolId
        };
        const accessKey = process.env.JWT_ACCESS_SECRET ?? "super_secret_and_long_key";
        const accessToken = jwt.sign(payload, accessKey, {
            expiresIn: "2h"
        });
        const refreshKEY = process.env.JWT_REFRESH_SECRET ?? "other_super_secret_and_long_key";
        const refreshToken = jwt.sign(payload, refreshKEY, {
            expiresIn: "168h"
        });
        await this.userRepository.saveToken(refreshToken, userFound.id);
        return {
            user: {
                name: userFound.name,
                rol: userFound.rolId
            },
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
    async registerAuthUser(dataNewUser) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(dataNewUser.password, salt);
        const newUser = {
            ...dataNewUser,
            password: hashed
        };
        const userCreated = await this.userRepository.createRow(newUser);
        const { password, ...userWithoutPassword } = userCreated;
        return userWithoutPassword;
    }
}
//# sourceMappingURL=authService.js.map