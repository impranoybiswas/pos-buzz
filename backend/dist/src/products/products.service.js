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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ProductsService = class ProductsService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    ALL_PRODUCTS_KEY = 'products:all';
    PRODUCT_KEY_PREFIX = 'product:';
    async create(data) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    name: data.name,
                    sku: data.sku,
                    price: data.price,
                    stockQuantity: data.stockQuantity,
                },
            });
            await this.redis.del(this.ALL_PRODUCTS_KEY);
            return product;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create product', error.message);
        }
    }
    async findAll() {
        const cached = await this.redis.get(this.ALL_PRODUCTS_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
        const products = await this.prisma.product.findMany();
        await this.redis.set(this.ALL_PRODUCTS_KEY, JSON.stringify(products), 3600);
        return products;
    }
    async findOne(id) {
        const key = `${this.PRODUCT_KEY_PREFIX}${id}`;
        const cached = await this.redis.get(key);
        if (cached) {
            return JSON.parse(cached);
        }
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (product) {
            await this.redis.set(key, JSON.stringify(product), 3600);
        }
        return product;
    }
    async update(id, data) {
        try {
            const product = await this.prisma.product.update({
                where: { id },
                data,
            });
            await this.redis.del(this.ALL_PRODUCTS_KEY);
            await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${id}`);
            return product;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update product', error.message);
        }
    }
    async remove(id) {
        try {
            const product = await this.prisma.product.delete({
                where: { id },
            });
            await this.redis.del(this.ALL_PRODUCTS_KEY);
            await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${id}`);
            return product;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete product', error.message);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ProductsService);
//# sourceMappingURL=products.service.js.map