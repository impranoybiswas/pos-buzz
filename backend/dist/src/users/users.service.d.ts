import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        password: string;
        createdAt: Date;
    } | null>;
    createUser(fullName: string, email: string, password: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        password: string;
        createdAt: Date;
    }>;
}
