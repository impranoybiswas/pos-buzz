import { PrismaService } from '../prisma/prisma.service';
export declare class SalesService {
    private prisma;
    constructor(prisma: PrismaService);
    createSale(productId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    }>;
}
