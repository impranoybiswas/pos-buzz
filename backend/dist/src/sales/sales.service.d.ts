import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private readonly ALL_SALES_KEY;
    private readonly SALE_KEY_PREFIX;
    private readonly PRODUCT_KEY_PREFIX;
    private readonly ALL_PRODUCTS_KEY;
    create(data: CreateSaleDto): Promise<{
        product: {
            id: string;
            createdAt: Date;
            name: string;
            sku: string;
            price: number;
            stockQuantity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    }[] | ({
        product: {
            id: string;
            createdAt: Date;
            name: string;
            sku: string;
            price: number;
            stockQuantity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    })>;
}
