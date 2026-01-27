import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    sku: string;
    price: number;
    stock_quantity: number;
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        price: data.price,
        stockQuantity: data.stock_quantity,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      sku?: string;
      price?: number;
      stock_quantity?: number;
    },
  ) {
    const updateData: any = { ...data };
    if (data.stock_quantity !== undefined) {
      updateData.stockQuantity = data.stock_quantity;
      delete updateData.stock_quantity;
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
