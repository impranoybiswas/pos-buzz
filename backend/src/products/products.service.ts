import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  private readonly ALL_PRODUCTS_KEY = 'products:all';
  private readonly PRODUCT_KEY_PREFIX = 'product:';

  async create(data: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: data.name,
          sku: data.sku,
          price: data.price,
          stockQuantity: data.stockQuantity,
        },
      });
      // Invalidate list cache
      await this.redis.del(this.ALL_PRODUCTS_KEY);
      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll() {
    // Try to get from cache
    const cached = await this.redis.get(this.ALL_PRODUCTS_KEY);

    if (cached !== null) {
      return JSON.parse(cached) as Product[];
    }

    const products = await this.prisma.product.findMany();
    // Set cache with 1 hour TTL
    await this.redis.set(this.ALL_PRODUCTS_KEY, JSON.stringify(products), 3600);
    return products;
  }

  async findOne(id: string) {
    const key = `${this.PRODUCT_KEY_PREFIX}${id}`;
    const cached = await this.redis.get(key);
    if (cached !== null) {
      return JSON.parse(cached) as Product[];
    }

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (product) {
      await this.redis.set(key, JSON.stringify(product), 3600);
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data,
      });
      // Invalidate caches
      await this.redis.del(this.ALL_PRODUCTS_KEY);
      await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${id}`);
      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });
      // Invalidate caches
      await this.redis.del(this.ALL_PRODUCTS_KEY);
      await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${id}`);
      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}
