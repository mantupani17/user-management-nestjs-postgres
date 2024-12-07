import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Query, Param, Patch, Delete, NotFoundException, UseGuards, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, FileDto, UpdateDocumentDto } from './dtos/create-document.dto';
import { PartialQueryOptions } from '@app/common/dtos/query.dto';
import { instanceToPlain } from 'class-transformer';
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard';
import { CaslGuard } from '@app/common/ability/casl.guard';
import { Response } from 'express';

@Controller('documents')
@UseGuards(JwtAuthGuard, CaslGuard)
export class DocumentsController {
    constructor(private readonly documentService: DocumentsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))  // 'file' is the field name in the form
    async saveDocument(@UploadedFile() file: FileDto, @Body() createDocumentDto: CreateDocumentDto) {
        const details = await this.documentService.uploadFile(file, createDocumentDto);
        return this.documentService.create(details)
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const details = instanceToPlain(await this.documentService.findOne(+id));
        // remove the document
        if(!details) throw new NotFoundException('Document not found')
        const { mimeType, stream } = await this.documentService.downloadFile(details.filePath);
        
        // Set the content-type for the response
        res.setHeader('Content-Type', mimeType);
        
        // Pipe the file to the response
        stream.pipe(res);
    }

    @Get()
    findAll(@Query() q: PartialQueryOptions) {
        const { limit, skip, order, select } = q
        return this.documentService.findAll({}, select, limit, skip, order );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateModuleDto: UpdateDocumentDto) {
        return this.documentService.update(+id, updateModuleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const details = instanceToPlain(await this.documentService.findOne(+id));
        // remove the document
        if(!details) throw new NotFoundException('Document not found')
        
        await this.documentService.removeDocument(details.filePath)
        return this.documentService.remove(+id);
    }
}
