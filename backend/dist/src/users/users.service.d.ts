import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    } | null>;
    createUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    }>;
}
