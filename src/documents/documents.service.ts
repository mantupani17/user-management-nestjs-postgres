import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document as DocumentEntity } from '@app/entities';
import { CreateDocumentDto, FileDto } from './dtos/create-document.dto';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from '@app/common/base.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types';

@Injectable()
export class DocumentsService extends BaseService{
  uploadPath: any = null
  constructor(
    @InjectRepository(DocumentEntity) documentRepository: Repository<DocumentEntity>,
    private readonly configService: ConfigService
  ) {
    super(documentRepository)
    this.uploadPath = path.join(__dirname, '..', '..', this.configService.get<string>('upload.dir'));
  }

  // This method will save the file metadata and move the file
  async uploadFile(file: FileDto, createDocumentDto: CreateDocumentDto): Promise<any> {
    // Define the path where the file will be stored
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath);
    }

    const uniqueFileName = `${uuidv4()}-${file.originalname}`;

    // Create a path for the file
    const filePath = path.join(this.uploadPath, uniqueFileName);

    // Move the file from the temp storage to the desired directory
    fs.writeFileSync(filePath, file.buffer);
   

    // Create the document record in the database
    return {
        fileName: file.originalname,
        filePath: uniqueFileName,
        fileType: file.mimetype,
        size: file.size,
        description: createDocumentDto.description,
    }
    
  }

  async removeDocument(fileName: string) {
    const filePath = path.join(this.uploadPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found on server');
    }
    return fs.unlinkSync(filePath)
  }

  async downloadFile(fileName) {
    const filePath = path.join(this.uploadPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found on server');
    }
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    return {
      mimeType,
      stream: fs.createReadStream(filePath),
    };
  }
}
