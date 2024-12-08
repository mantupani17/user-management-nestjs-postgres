import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AbilityService } from './casl-ability.service'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private readonly abilityService: AbilityService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user // Get user from the request, e.g., after authentication
    // Get the required permissions from the route metadata (if specified)
    const requiredAbilities = this.reflector.get<[string, string][]>(
      'abilities',
      context.getHandler(),
    )
    if (!requiredAbilities && !user.permission) {
      return true
    }

    const ability = this.abilityService.defineAbility(user, request)

    let hasAccess = false
    for (const [action, subject] of user.permission) {
      if (ability.can(action, subject)) {
        hasAccess = true
      }
    }

    // If the role having all access
    if (ability.can('manage', 'all')) {
      hasAccess = true
    }

    if (!hasAccess) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      )
    }

    return true
  }
}
