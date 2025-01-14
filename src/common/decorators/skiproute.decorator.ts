import { SetMetadata } from '@nestjs/common'
export const SkipGuard = () => SetMetadata('skipGuard', true)
