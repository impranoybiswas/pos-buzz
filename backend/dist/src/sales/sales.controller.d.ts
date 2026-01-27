import { SalesService } from './sales.service';
export declare class SalesController {
    private service;
    constructor(service: SalesService);
    create(body: {
        productId: string;
        quantity: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        productId: string;
    }>;
}
