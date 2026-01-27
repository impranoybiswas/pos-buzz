import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId as any },
    });

    if (!product || product.stockQuantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    await this.prisma.product.update({
      where: { id: productId as any },
      data: { stockQuantity: product.stockQuantity - quantity },
    });

    return this.prisma.sale.create({
      data: {
        productId: productId as any,
        quantity,
        total: (product.price * quantity) as any,
      } as any,
    });
  }
}
