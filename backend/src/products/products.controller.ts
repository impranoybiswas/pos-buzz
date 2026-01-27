import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * ProductsController exposes the API endpoints for managing products.
 * All these routes are protected by the JwtAuthGuard.
 */
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  /**
   * GET /products
   * Returns a list of all products (uses Redis cache).
   */
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * GET /products/:id
   * Returns a single product by ID.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  /**
   * POST /products
   * Creates a new product.
   */
  @Post()
  create(
    @Body()
    body: {
      name: string;
      sku: string;
      price: number;
      stockQuantity: number;
    },
  ) {
    return this.productsService.create(body);
  }

  /**
   * PUT /products/:id
   * Updates an existing product.
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: Partial<{
      name: string;
      sku: string;
      price: number;
      stockQuantity: number;
    }>,
  ) {
    return this.productsService.update(id, body);
  }

  /**
   * DELETE /products/:id
   * Deletes a product.
   */
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
