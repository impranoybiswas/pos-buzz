import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

/**
 * SalesService handles the creation of sales and stock management.
 * It ensures that stock is sufficient before a sale and deducts it atomically.
 */
@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /**
   * Creates a new sale and updates product stock in a single transaction.
   * @param data Details of the sale (productId, quantity).
   * @returns The created sale.
   */
  async createSale(data: { productId: number; quantity: number }) {
    // We use $transaction to ensure both creating the sale and updating stock
    // happen together or not at all.
    return this.prisma.$transaction(async (tx) => {
      // 1. Check if product exists and HAS enough stock
      const product = await tx.product.findUnique({
        where: { id: data.productId },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.stockQuantity < data.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      // 2. Calculate total price
      const total = product.price * data.quantity;

      // 3. Create the sale record
      const sale = await tx.sale.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          total: total,
        },
      });

      // 4. Deduct stock from the product
      await tx.product.update({
        where: { id: data.productId },
        data: {
          stockQuantity: {
            decrement: data.quantity,
          },
        },
      });

      // Invalidate products cache in Redis since stock has changed
      await this.redis.del('products');

      return sale;
    });
  }

  /**
   * Retrieves all sales history.
   * @returns List of sales with product details.
   */
  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
