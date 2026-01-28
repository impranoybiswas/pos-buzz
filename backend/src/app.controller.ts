import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Public health/root endpoint
   * GET /
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Protected endpoint
   * GET /me
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: { user: Record<string, any> }) {
    return req.user;
  }
}
