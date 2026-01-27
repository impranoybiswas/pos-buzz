import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

/**
 * AppModule is the root module of the application.
 * It imports all the necessary sub-modules for database (Prisma),
 * caching (Redis), authentication, and feature modules (Products, Sales, Users).
 */
@Module({
  imports: [
    PrismaModule,
    RedisModule,
    AuthModule,
    ProductsModule,
    SalesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
