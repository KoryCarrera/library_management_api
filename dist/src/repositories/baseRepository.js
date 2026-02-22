export class BaseRepository {
    connection;
    model;
    constructor(prismaType, model) {
        this.connection = prismaType;
        this.model = model;
    }
    async createRow(data) {
        return await this.model.create({ data });
    }
    async getAll() {
        return await this.model.findMany();
    }
    async findRowById(id) {
        return await this.model.findUnique({
            where: { id }
        });
    }
    async updateById(id, newData) {
        return await this.model.update({
            where: { id },
            data: newData
        });
    }
    async deleteById(id) {
        return await this.model.delete({
            where: { id }
        });
    }
}
//# sourceMappingURL=baseRepository.js.map