import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Module as ModuleEntity } from './module.entity';
import { Permission } from './permission.entity';

@Entity("role_module_permissions")
export class RoleModulePermission {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number;

  @Column()
  moduleId: number;

  @Column()
  permissionId: number;

  @Column()
  roleId: number;

  @Column({ default: 1 })
  status: number;

  // Reference for join
  @ManyToOne(() => ModuleEntity)
  @JoinColumn([{ name: 'moduleId' }])
  modules: ModuleEntity;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  roles: Role;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permissions: Permission;
}
