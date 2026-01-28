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
        quantity: number;
        createdAt: Date;
        productId: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
