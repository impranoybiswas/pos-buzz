import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private readonly ALL_PRODUCTS_KEY;
    private readonly PRODUCT_KEY_PREFIX;
    create(data: CreateProductDto): Promise<{
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
    } | {
        id: string;
        createdAt: Date;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
    }[] | null>;
    update(id: string, data: UpdateProductDto): Promise<{
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
