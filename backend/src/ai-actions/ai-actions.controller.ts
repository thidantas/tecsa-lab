import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AiActionsService } from './ai-actions.service';

@Controller('patients')
export class AiActionsController {
  constructor(private readonly aiActionsService: AiActionsService) {}

  @Post(':id/ai-actions')
  generate(@Param('id', ParseUUIDPipe) id: string) {
    return this.aiActionsService.generate(id);
  }
}
