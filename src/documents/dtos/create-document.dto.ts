import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
    @IsOptional()
    @IsString()
    description: string; 
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}

export interface FileDto {
    originalname: string
    buffer: string
    mimetype: string
    size: number
}