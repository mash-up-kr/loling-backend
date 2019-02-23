import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            console.log('Request:', req.originalUrl, JSON.stringify(req.body));
            next();
        };
    }
}
