import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  private readonly ALL_SALES_KEY = 'sales:all';
  private readonly SALE_KEY_PREFIX = 'sale:';
  private readonly PRODUCT_KEY_PREFIX = 'product:';
  private readonly ALL_PRODUCTS_KEY = 'products:all';

  async create(data: CreateSaleDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Check if product exists and has enough stock
        const product = await tx.product.findUnique({
          where: { id: data.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Product with ID ${data.productId} not found`,
          );
        }

        if (product.stockQuantity < data.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name}. Available: ${product.stockQuantity}, Requested: ${data.quantity}`,
          );
        }

        // 2. Deduct stock
        const updatedProduct = await tx.product.update({
          where: { id: data.productId },
          data: {
            stockQuantity: {
              decrement: data.quantity,
            },
          },
        });

        // 3. Create sale record
        const sale = await tx.sale.create({
          data: {
            productId: data.productId,
            quantity: data.quantity,
          },
          include: {
            product: true,
          },
        });

        // 4. Invalidate caches
        await this.redis.del(this.ALL_SALES_KEY);
        await this.redis.del(this.ALL_PRODUCTS_KEY);
        await this.redis.del(`${this.PRODUCT_KEY_PREFIX}${data.productId}`);

        return sale;
      });
    } catch (error: any) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to create sale',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const cached = await this.redis.get(this.ALL_SALES_KEY);
      if (cached) {
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
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Failed to fetch sales',
        error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const key = `${this.SALE_KEY_PREFIX}${id}`;
      const cached = await this.redis.get(key);
      if (cached) {
        return JSON.parse(cached);
      }

      const sale = await this.prisma.sale.findUnique({
        where: { id },
        include: {
          product: true,
        },
      });

      if (!sale) {
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }

      await this.redis.set(key, JSON.stringify(sale), 3600);
      return sale;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch sale',
        error.message,
      );
    }
  }
}
