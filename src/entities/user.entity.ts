import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column({ default: null, unique:true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  mobile: string;

  @Column()
  password: string;

  @Column({default: 1})
  status: number;

  @Column({default :null, unique: false})
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({default :0, nullable: true})
  isVerified: number

  @Column({type: 'bigint', nullable: true})
  verifyTokenExpirey:number

  @Column({type: 'varchar', nullable: true})
  verifyToken: string

  @Column({type: 'bigint', nullable: true})
  forgotPasswordTokenExpirey:number

  @Column({type: 'varchar', nullable: true})
  forgotPasswordToken: string

  @Column({type: 'timestamp', nullable: true})
  created_at: Date;

  @Column({type: 'timestamp', nullable: true})
  updated_at: Date;

  @Column({nullable: true})
  refreshToken: string
}
