import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number;

  @Column()
  permission: string;

  @Column({ default: 1 })
  status: number;
}
