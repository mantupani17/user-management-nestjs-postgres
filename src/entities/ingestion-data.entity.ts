import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('ingestion_data')
export class IngestionData {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id: number

  @Column()
  Column1: string

  @Column()
  Column2: string

  @Column()
  Column3: string

  @Column()
  Column4: string

  @Column()
  Column5: string

  @Column()
  Column6: string

  @Column()
  Column7: string

  @Column()
  Column8: string

  @Column()
  Column9: string
}
