import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * SalesController exposes API endpoints for the POS sales functionality.
 * Routes are protected by JwtAuthGuard.
 */
@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  /**
   * POST /sales
   * Creates a new sale and deducts stock.
   */
  @Post()
  create(@Body() body: { productId: number; quantity: number }) {
    return this.salesService.createSale(body);
  }

  /**
   * GET /sales
   * Returns a history of all sales.
   */
  @Get()
  findAll() {
    return this.salesService.findAll();
  }
}
