import { Injectable } from '@nestjs/common';
import { AbilityBuilder, Ability } from '@casl/ability';
// import { User } from './user.entity'; // Assuming you have a User entity

// Define the possible actions (like 'create', 'read', 'update', 'delete')
export type AppAbility = Ability<[string, string]>; // [action, subject]
export const methodsActionMapper = {
  GET: ['read', 'view'],
  PUT: ['update'],
  PATCH: ['update'],
  DELETE: ['delete'],
  POST: ['create', 'add']
} 

export const extraResourceRoutes = {
  User: ['profile']
}

@Injectable()
export class AbilityService {
  // Define the ability based on the user role or other properties
  defineAbility(user: any, req: any): any {
    const { can, cannot, build } = new AbilityBuilder(Ability);
    const [base, path, resource, param] = req?.url?.split('/')
    console.log('Ability Running')
    const method = req.method
    const permissions = user.permission  
    // Admin can do anything
    if (user.role === 'Admin') {
      can('manage', 'all'); // Allow everything
    }
    
    // Regular user can read own data
    else if (user.role === 'User') {
      for (const a of methodsActionMapper[method]) {
        for (const p of permissions) {
          const [ action , module ] = p
          if ( a.indexOf(action) > -1  && ( resource == 'auth' || resource.includes(module.toLowerCase())) && param != 'list') {
            if (+param == user.id || extraResourceRoutes[module].indexOf(param) > -1) {
              can(action, module, { id: user.id })
              break
            }
          }
        }
      }
    }

    return build();
  }
}
