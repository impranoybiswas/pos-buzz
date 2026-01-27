import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * AuthService handles authentication logic including user registration and login.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user by hashing their password and saving it to the database.
   * @param email User's email address
   * @param password User's plain text password
   * @returns The newly created user object
   */
  async register(email: string, password: string) {
    // Hash the password with a salt rounds of 10
    const hashed = await bcrypt.hash(password, 10);
    // Delegate user creation to the UsersService
    return this.usersService.createUser(email, hashed);
  }

  /**
   * Authenticates a user by checking their credentials and returning a JWT if valid.
   * @param email User's email address
   * @param password User's plain text password
   * @returns An object containing the JWT access token
   */
  async login(email: string, password: string) {
    // Attempt to find the user by their email
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // Create a JWT payload containing the user's ID and email
    const payload = { sub: user.id, email: user.email };
    return {
      // Sign the payload to generate the access token
      access_token: this.jwtService.sign(payload),
    };
  }
}
