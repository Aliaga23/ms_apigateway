import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    // Extraer token del header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    // Guardar token en el request para uso posterior
    request.user = { token };
    return true;
  }
}
