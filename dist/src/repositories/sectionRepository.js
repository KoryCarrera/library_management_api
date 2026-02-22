import { BaseRepository } from "./baseRepository.js";
export class SectionRepository extends BaseRepository {
    constructor(prismaType) {
        super(prismaType, prismaType.section);
    }
}
//# sourceMappingURL=sectionRepository.js.map