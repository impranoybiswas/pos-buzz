import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createSaleDto: CreateSaleDto): Promise<{
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
