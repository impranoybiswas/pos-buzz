import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private service;
    constructor(service: ProductsService);
    create(body: CreateProductDto): Promise<{
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
    update(id: string, body: UpdateProductDto): Promise<{
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
