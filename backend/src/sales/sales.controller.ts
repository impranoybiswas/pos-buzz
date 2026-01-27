import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sales')
export class SalesController {
  constructor(private service: SalesService) {}

  @Post()
  create(@Body() body: { productId: string; quantity: number }) {
    return this.service.createSale(body.productId, body.quantity);
  }
}
