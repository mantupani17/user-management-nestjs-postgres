import { Controller, Get, Param, Post } from '@nestjs/common'
import { IngestionService } from './ingestion.service'

@Controller('ingestions')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}
  @Post('start')
  startProcess() {
    return this.ingestionService.startProcess()
  }

  @Get('/:taskId')
  getStatus(@Param('taskId') taskId) {
    return this.ingestionService.findOneByCond({
      taskId,
    })
  }
}
