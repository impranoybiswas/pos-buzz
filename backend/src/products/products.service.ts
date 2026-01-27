import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

/**
 * ProductsService handles all operations related to products,
 * including database CRUD and Redis-based caching for performance optimization.
 */
@Injectable()
export class ProductsService {
  private readonly CACHE_KEY = 'products';

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /**
   * Retrieves all products from the database or from Redis cache if available.
   * @returns A list of products.
   */
  async findAll() {
    // Attempt to get cached products from Redis
    const cached = await this.redis.get(this.CACHE_KEY);
    if (cached) {
      // If found in cache, parse and return
      return JSON.parse(cached);
    }

    // If not in cache, fetch from database
    const products = await this.prisma.product.findMany();
    // Cache the result in Redis for 60 seconds
    await this.redis.set(this.CACHE_KEY, JSON.stringify(products), 60);
    return products;
  }

  /**
   * Retrieves a single product by its ID.
   * @param id The product ID.
   * @returns The product object.
   * @throws NotFoundException if product doesn't exist.
   */
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  /**
   * Creates a new product and invalidates the products cache.
   * @param data The product details (name, sku, price, stockQuantity).
   * @returns The newly created product.
   */
  async create(data: {
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
  }) {
    const product = await this.prisma.product.create({ data });
    // Invalidate cache since data has changed
    await this.redis.del(this.CACHE_KEY);
    return product;
  }

  /**
   * Updates an existing product and invalidates the products cache.
   * @param id The product ID.
   * @param data The fields to update.
   * @returns The updated product.
   */
  async update(
    id: number,
    data: Partial<{
      name: string;
      sku: string;
      price: number;
      stockQuantity: number;
    }>,
  ) {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });
    // Invalidate cache since data has changed
    await this.redis.del(this.CACHE_KEY);
    return product;
  }

  /**
   * Deletes a product and invalidates the products cache.
   * @param id The product ID.
   */
  async delete(id: number) {
    await this.prisma.product.delete({
      where: { id },
    });
    // Invalidate cache since data has changed
    await this.redis.del(this.CACHE_KEY);
  }
}
