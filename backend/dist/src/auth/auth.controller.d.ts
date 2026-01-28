import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(body: RegisterDto): Promise<{
        id: string;
        email: string;
    }>;
    getProfile(req: {
        user: User;
    }): {
        id: string;
        email: string;
        fullName: string;
        password: string;
        createdAt: Date;
    };
}
