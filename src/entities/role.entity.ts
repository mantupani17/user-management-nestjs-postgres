import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number;

  @Column()
  role: string;

  @Column({ default: 1 })
  status: number;
}
