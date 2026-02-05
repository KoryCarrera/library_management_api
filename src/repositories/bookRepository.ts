import { PrismaClient, Book } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js"

export class BookRepository extends BaseRepository<Book> {

    constructor(prismaType: PrismaClient) {

        super(prismaType, prismaType.section)
    }
}