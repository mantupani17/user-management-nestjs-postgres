import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('clients')
// this is for internal service calling
export class Client {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number

  @Column({ default: null })
  name: string

  @Column({ default: null })
  url: string

  @Column({ default: null, unique: true })
  secret: string

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date

  @Column({ type: 'integer' })
  created_by: number
}
