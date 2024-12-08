import { SetMetadata } from '@nestjs/common'

// Define abilities as metadata for specific routes
export const SetAbilities = (abilities: [string, string][]) => {
  return SetMetadata('abilities', abilities)
}
