import { PrismaClient, Section } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js"

export class SectionRepository extends BaseRepository<Section> {

    constructor(prismaType: PrismaClient) {

        super(prismaType, prismaType.section)
    }
}