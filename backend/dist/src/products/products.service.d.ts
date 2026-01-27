import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    } | null>;
    update(id: string, data: {
        name?: string;
        sku?: string;
        price?: number;
        stockQuantity?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }>;
}
