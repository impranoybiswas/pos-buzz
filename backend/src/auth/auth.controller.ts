import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * AuthController defines the public API endpoints for authentication.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/register
   * Registers a new user.
   */
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    // Delegate registration to the AuthService
    return this.authService.register(body.email, body.password);
  }

  /**
   * POST /auth/login
   * Authenticates a user and returns a token.
   */
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    // Delegate login to the AuthService
    return this.authService.login(body.email, body.password);
  }
}
