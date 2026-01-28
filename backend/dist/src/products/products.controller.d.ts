import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private service;
    constructor(service: ProductsService);
    create(body: CreateProductDto): Promise<{
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    } | {
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    }[] | null>;
    update(id: string, body: UpdateProductDto): Promise<{
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        sku: string;
        price: number;
        stockQuantity: number;
        createdAt: Date;
    }>;
}
