import { PrismaClient, User } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js"

export class UserRepository extends BaseRepository<User> {
    

    constructor (prismaType: PrismaClient) {
        super(prismaType, prismaType.user)
    }

    public async getUserByEmail(email: string){
        return await this.model.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                rolId: true,
                password: true
            }
        })
    }

    public async saveToken (refreshToken: string, idUser: number) {
        return await this.model.update({
            where: { id: idUser},
            data: { refreshToken: refreshToken}
        })
    }
}
