import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number

  @Column()
  role: string

  @Column({ default: 1 })
  status: number
}
