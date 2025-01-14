import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@app/common/decorators/role'
import { Role } from '@app/common/decorators/role/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const request = context.switchToHttp().getRequest()
    if (!requiredRoles) {
      return true
    }
    return requiredRoles.some((role) => request?.user?.role == role)
  }
}
