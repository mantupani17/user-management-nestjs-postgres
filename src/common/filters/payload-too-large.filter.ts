import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  PayloadTooLargeException,
} from '@nestjs/common'

@Catch(PayloadTooLargeException)
export class PayloadTooLargeFilter implements ExceptionFilter {
  catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(413).json({
      statusCode: 413,
      message: 'Payload too large. Please reduce the size of the request body.',
    })
  }
}
