import { SalesService } from './sales.service';
export declare class SalesController {
    private service;
    constructor(service: SalesService);
    create(body: {
        productId: string;
        quantity: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        total: number;
        productId: number;
    }>;
}
