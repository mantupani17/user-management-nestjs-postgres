import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('track_ingestions')
export class TrackIngestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  taskId: string;

  @Column({default: null})
  taskName: string;

  @Column({type: 'timestamp', nullable: true})
  startTime: Date;

  @Column({type: 'timestamp', nullable: true})
  endTime: Date;

  @Column()
  status: number; // failed - 0, success - 1, inprogress - 2
}
