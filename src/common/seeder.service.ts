import { Injectable, OnModuleInit } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { User, Role, Client } from '@app/entities'
import { CryptoService } from './crypto/crypto.service'
import { RolesService } from '@app/roles/roles.service'
import { ClientService } from '@app/client/client.service'
import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly roleService: RolesService,
    private readonly clientService: ClientService,
    private readonly cfgService: ConfigService,
  ) {}

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

    // Hash password for the admin
    const hashedPassword: string =
      await this.cryptoService.hashPassword('Admin@123')

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
    await this.createAdminRole()
    await this.createAdminUser()
    await this.createClient()
  }
}
