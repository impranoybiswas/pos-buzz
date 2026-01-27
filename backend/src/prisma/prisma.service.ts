import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService provides a single instance of PrismaClient throughout the application.
 * It also handles the connection to the database when the module initializes.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * onModuleInit is a NestJS lifecycle hook that runs when the module starts.
   * Here we establish the database connection.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
