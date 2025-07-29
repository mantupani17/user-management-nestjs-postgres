import { Injectable, OnModuleInit } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import {
  User,
  Role,
  Client,
  Module,
  Permission,
  RoleModulePermission,
} from '@app/entities'
import { CryptoService } from './crypto/crypto.service'
import { RolesService } from '@app/roles/roles.service'
import { ClientService } from '@app/client/client.service'
import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { PermissionsService } from '@app/permissions/permissions.service'
import { ModulesService } from '@app/modules/modules.service'
import { RoleModulePermissionsService } from '@app/role_module_permissions/role_module_permissions.service'

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly roleService: RolesService,
    private readonly clientService: ClientService,
    private readonly cfgService: ConfigService,
    private readonly permissionService: PermissionsService,
    private readonly moduleService: ModulesService,
    private readonly roleModulePermissionService: RoleModulePermissionsService,
  ) {}

  async addDefaultRoles() {
    const defaultRoles = ['Admin', 'User', 'Editor', 'Viewer']
    for (const role of defaultRoles) {
      const adminRoleExists = await this.roleService.findOneByCond({
        role,
      })
      if (adminRoleExists) {
        console.log(`${role} role already exists!`)
        continue
      }
      const newRole = new Role()
      newRole.role = role

      await this.roleService.create(newRole) // Assuming you have a create method
      console.log(`${role} role created!`)
    }
  }

  async addDefaultModules() {
    const defaultModules = [
      'User',
      'Modules',
      'Roles',
      'Permissions',
      'Role-Module-Permissions',
      'Documents',
      'Auth',
    ]

    for (const module of defaultModules) {
      const adminRoleExists = await this.moduleService.findOneByCond({
        module,
      })
      if (adminRoleExists) {
        console.log(`${module} module already exists!`)
        continue
      }
      const newRole = new Module()
      newRole.module = module

      await this.moduleService.create(newRole) // Assuming you have a create method
      console.log(`${module} module created!`)
    }
  }

  async addDefaultPermissions() {
    const defaultPermissions = [
      'read',
      'write',
      'view',
      'delete',
      'add',
      'create',
      'update',
    ]

    for (const permission of defaultPermissions) {
      const adminRoleExists = await this.permissionService.findOneByCond({
        permission,
      })
      if (adminRoleExists) {
        console.log(`${permission} permission already exists!`)
        continue
      }
      const newRole = new Permission()
      newRole.permission = permission

      await this.permissionService.create(newRole) // Assuming you have a create method
      console.log(`${permission} permission created!`)
    }
  }

  async addDefaultRoleModulePermission() {
    const defaultRoleModulePer = [
      { moduleId: 1, permissionId: 7, roleId: 2 },
      { moduleId: 1, permissionId: 3, roleId: 2 },
    ]
    for (const permission of defaultRoleModulePer) {
      const adminRoleExists =
        await this.roleModulePermissionService.findOneByCond({
          permissionId: permission.permissionId,
          moduleId: permission.moduleId,
          roleId: permission.roleId,
        })
      if (adminRoleExists) {
        console.log(`${JSON.stringify(permission)} permission already exists!`)
        continue
      }
      const newRole = new RoleModulePermission()
      newRole.permissionId = permission.permissionId
      newRole.moduleId = permission.moduleId
      newRole.roleId = permission.roleId

      await this.roleModulePermissionService.create(newRole) // Assuming you have a create method
      console.log(`${permission} permission created!`)
    }
  }

  // Method to create an admin user if it doesn't exist
  async createAdminUser() {
    // Check if an admin already exists
    const adminExists = await this.userService.findOneByCond({
      roleId: 1,
    }) // Assuming you have a role column
    if (adminExists) {
      console.log('Admin user already exists!')
      return
    }
    const password = this.cfgService.get<string>('ADMIN_PASSWORD')
    // Hash password for the admin
    const hashedPassword: string =
      await this.cryptoService.hashPassword(password)

    // Create the admin user
    const newUser = new User()
    newUser.username = 'admin@example.com'
    newUser.password = hashedPassword
    newUser.roleId = 1 // Assuming the role column exists
    newUser.email = 'admin@example.com'
    newUser.firstName = 'Admin'
    newUser.lastName = 'User'
    newUser.status = 1
    newUser.isVerified = 1

    await this.userService.create(newUser) // Assuming you have a create method
    console.log('Admin user created!')
    return
  }

  async createAdminRole() {
    // Check if an admin already exists
    const adminRoleExists = await this.roleService.findOneByCond({
      role: 'Admin',
    }) // Assuming you have a role column
    if (adminRoleExists) {
      console.log('Admin role already exists!')
      return
    }

    const newRole = new Role()
    newRole.role = 'Admin'

    await this.roleService.create(newRole) // Assuming you have a create method
    console.log('Admin role created!')
    return
  }

  async createClient() {
    // Check if an admin already exists
    const adminRoleExists = await this.clientService.findOneByCond({
      name: 'GEN-AI-SERVICE',
    }) // Assuming you have a role column
    if (adminRoleExists) {
      console.log('GEN-AI-SERVICE Client already exists!')
      return
    }

    const newRole = new Client()
    newRole.name = 'GEN-AI-SERVICE'
    newRole.secret = uuidv4()
    newRole.created_by = 1
    newRole.url = this.cfgService.get<string>('genAIServiceURL')

    await this.clientService.create(newRole) // Assuming you have a create method
    console.log(`Client created! - ${newRole.secret}`)
    return
  }

  // This hook will run when the module is initialized
  async onModuleInit() {
    await this.addDefaultRoles()
    await this.addDefaultModules()
    await this.addDefaultPermissions()
    await this.addDefaultRoleModulePermission()
    await this.createAdminUser()
    await this.createClient()
  }
}
