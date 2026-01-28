import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * UsersService handles all database operations related to the User entity.
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds a user in the database by their email address.
   * @param email The email address to search for.
   * @returns The user object if found, otherwise null.
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Creates a new user in the database.
   * @param fullName The user's full name.
   * @param email The user's email address.
   * @param password The user's hashed password.
   * @returns The newly created user object.
   */
  async createUser(fullName: string, email: string, password: string) {
    return this.prisma.user.create({
      data: {
        fullName,
        email,
        password,
      },
    });
  }
}
