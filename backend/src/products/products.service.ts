import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        price: data.price,
        stockQuantity: data.stockQuantity,
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
      stockQuantity?: number;
    },
  ) {
    const updateData: any = { ...data };
    if (data.stockQuantity !== undefined) {
      updateData.stockQuantity = data.stockQuantity;
      delete updateData.stockQuantity;
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
