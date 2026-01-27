import { ProductsService } from './products.service';
export declare class ProductsController {
    private service;
    constructor(service: ProductsService);
    create(body: {
        name: string;
        sku: string;
        price: number;
        stock_quantity: number;
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
    update(id: string, body: {
        name?: string;
        sku?: string;
        price?: number;
        stock_quantity?: number;
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
