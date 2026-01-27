import { PrismaService } from '../prisma/prisma.service';
export declare class SalesService {
    private prisma;
    constructor(prisma: PrismaService);
    createSale(productId: string, quantity: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        total: number;
        productId: number;
    }>;
}
