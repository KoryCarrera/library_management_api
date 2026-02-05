import { PrismaClient, Rol } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js"

export class RolRepository extends BaseRepository<Rol>{

    constructor (prismaType: PrismaClient) {
        
        super(prismaType, prismaType.rol)
    }
}