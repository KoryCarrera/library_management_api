import { BaseRepository } from "./baseRepository.js";
export class BookRepository extends BaseRepository {
    constructor(prismaType) {
        super(prismaType, prismaType.section);
    }
}
//# sourceMappingURL=bookRepository.js.map