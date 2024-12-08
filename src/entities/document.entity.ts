import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fileName: string

  @Column()
  filePath: string

  @Column()
  fileType: string

  @Column()
  size: number

  @Column()
  description: string // Other details, e.g., a description for the document
}
