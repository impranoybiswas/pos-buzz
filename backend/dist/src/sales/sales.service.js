"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let SalesService = class SalesService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    ALL_SALES_KEY = 'sales:all';
    SALE_KEY_PREFIX = 'sale:';
    PRODUCT_KEY_PREFIX = 'product:';
    ALL_PRODUCTS_KEY = 'products:all';
    async create(data) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const product = await tx.product.findUnique({
                    where: { id: data.productId },
                });
                if (!product) {
                    throw new common_1.NotFoundException(`Product with ID ${data.productId} not found`);
                }
                if (product.stockQuantity < data.quantity) {
                    throw new common_1.BadRequestException(`Insufficient stock for product ${product.name}. Available: ${product.stockQuantity}, Requested: ${data.quantity}`);
                }
                await tx.product.update({
                    where: { id: data.productId },
                    data: {
                        stockQuantity: {
                            decrement: data.quantity,
                        },
                    },
                });
                const sale = await tx.sale.create({
                    data: {
                        productId: data.productId,
                        quantity: data.quantity,
                    },
                    include: {
                        product: true,
                    },
                });
                await this.redis.del(this.ALL_SALES_KEY);
                await this.redis.del(this.ALL_PRODUCTS_KEY);
                await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${data.productId}`);
                return sale;
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to create sale');
        }
    }
    async findAll() {
        try {
            const cached = await this.redis.get(this.ALL_SALES_KEY);
            if (cached !== null) {
                return JSON.parse(cached);
            }
            const sales = await this.prisma.sale.findMany({
                include: {
                    product: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            await this.redis.set(this.ALL_SALES_KEY, JSON.stringify(sales), 3600);
            return sales;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch sales');
        }
    }
    async findOne(id) {
        try {
            const key = `${this.SALE_KEY_PREFIX}${id}`;
            const cached = await this.redis.get(key);
            if (cached !== null) {
                return JSON.parse(cached);
            }
            const sale = await this.prisma.sale.findUnique({
                where: { id },
                include: {
                    product: true,
                },
            });
            if (!sale) {
                throw new common_1.NotFoundException(`Sale with ID ${id} not found`);
            }
            await this.redis.set(key, JSON.stringify(sale), 3600);
            return sale;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            console.log(error);
            throw new common_1.InternalServerErrorException('Failed to fetch sale');
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], SalesService);
//# sourceMappingURL=sales.service.js.map