import { PrismaClient } from "@prisma/client";

export class BaseRepository<T> {
    protected connection: PrismaClient;
    protected model: any;

    public constructor(prismaType: PrismaClient, model: any) {
        this.connection = prismaType;
        this.model = model;
    }

    public async createRow(data: any): Promise<T> {
        return await this.model.create({ data });
    }

    public async getAll(): Promise<T[]> {
        return await this.model.findMany();
    }

    public async findRowById(id: number): Promise<T | null> {
        return await this.model.findUnique({
            where: { id }
        });
    }

    public async updateById(id: number, newData: Partial<T>): Promise<T> {
        return await this.model.update({
            where: { id },
            data: newData
        });
    }

    public async deleteById(id: number): Promise<T> {
        return await this.model.delete({
            where: { id }
        });
    }
}