import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number

  @Column()
  module: string

  @Column({ default: 1 })
  status: number
}
