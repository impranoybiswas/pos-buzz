import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Record<string, any>) {
    return this.prisma.product.create({ data: data as any });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  update(id: string, data: Record<string, any>) {
    return this.prisma.product.update({
      where: { id: id as any },
      data: data as any,
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({ where: { id: id as any } });
  }
}
