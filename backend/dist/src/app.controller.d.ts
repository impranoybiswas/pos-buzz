import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getMe(req: {
        user: Record<string, any>;
    }): Record<string, any>;
}
