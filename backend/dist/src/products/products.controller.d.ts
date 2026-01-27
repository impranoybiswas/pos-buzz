import { ProductsService } from './products.service';
export declare class ProductsController {
    private service;
    constructor(service: ProductsService);
    create(body: Record<string, any>): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }[]>;
    update(id: string, body: Record<string, any>): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    delete(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
