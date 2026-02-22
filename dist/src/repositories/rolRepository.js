import { BaseRepository } from "./baseRepository.js";
export class RolRepository extends BaseRepository {
    constructor(prismaType) {
        super(prismaType, prismaType.rol);
    }
}
//# sourceMappingURL=rolRepository.js.map