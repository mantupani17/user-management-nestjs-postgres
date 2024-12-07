import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const { method, url } = request;
      const ip = request.ip;
      const userAgent = request.get('User-Agent');
  
      const startTime = Date.now();
      this.logger.log(`Incoming request: ${method} ${url} from ${ip} (${userAgent})`);
  
      return next
        .handle()
        .pipe(
          tap((data) => {
            const responseTime = Date.now() - startTime;
            this.logger.log(
              `Request completed: ${method} ${url} in ${responseTime}ms`,
            );

            // Debugging purpose added the code
            // const formattedResponse = {
            //   statusCode: response.statusCode,
            //   message: 'Request processed successfully',
            //   data: data,
            //   responseTime: `${responseTime}ms`,
            // };
            // console.log(formattedResponse)
            // Optionally, modify the response before sending it back to the client
            // response.locals.formattedResponse = formattedResponse;

            // return response
            // .send(formattedResponse);
          }),
        );
    }
  }
  