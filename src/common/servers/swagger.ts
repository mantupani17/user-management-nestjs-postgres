import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export class SwaggerService {
  config = null
  constructor(app: INestApplication) {
    this.config = new DocumentBuilder()
      .setTitle('RAG Document Ingestion User Module') // Title of the API
      .setDescription('User Management') // Description of the API
      .setVersion('1.0') // Version of the API
      .addTag('cats') // Optionally add a tag
      .build()
    const document = SwaggerModule.createDocument(app, this.config) // Create the Swagger document
    SwaggerModule.setup('api-docs', app, document)
  }
}
