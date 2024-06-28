import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';


@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const error: any = exception.getError();

    if (typeof error == 'object'
      && 'status' in error
      && 'message' in error) {
      return res.status(isNaN(error.status) ? HttpStatus.INTERNAL_SERVER_ERROR : error.status).json({
        message: error.message,
        status: error.status
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      message: error,
      status: HttpStatus.BAD_REQUEST
    });
  }
}