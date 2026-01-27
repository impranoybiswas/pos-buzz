import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(body: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
    }>;
    getProfile(req: any): any;
}
