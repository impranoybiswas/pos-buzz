import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Record<string, any>): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }[]>;
    update(id: string, data: Record<string, any>): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    delete(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
