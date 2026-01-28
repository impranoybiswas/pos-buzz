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
        quantity: number;
        createdAt: Date;
        productId: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
