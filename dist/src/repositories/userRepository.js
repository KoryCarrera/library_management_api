import { BaseRepository } from "./baseRepository.js";
export class UserRepository extends BaseRepository {
    constructor(prismaType) {
        super(prismaType, prismaType.user);
    }
    async getUserByEmail(email) {
        return await this.model.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                rolId: true,
                password: true
            }
        });
    }
    async saveToken(refreshToken, idUser) {
        return await this.model.update({
            where: { id: idUser },
            data: { refreshToken: refreshToken }
        });
    }
}
//# sourceMappingURL=userRepository.js.map