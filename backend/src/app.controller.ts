import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

/**
 * AppController handles root-level or generic authentication checks.
 */
@Controller()
export class AppController {
  /**
   * GET /me
   * Returns the currently authenticated user's profile based on the JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    // req.user is populated by the Passport JWT strategy
    return req.user;
  }
}
