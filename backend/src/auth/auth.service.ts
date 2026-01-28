import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException();

    const token = this.jwt.sign({
      userId: user.id,
      email: user.email,
    });
    return { access_token: token };
  }

  async register(fullName: string, email: string, password: string) {
    console.log('SERVICE fullName:', fullName, typeof fullName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
    return { id: user.id, email: user.email };
  }
}
