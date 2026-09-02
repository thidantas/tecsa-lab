import { Module } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { PatientsModule } from '../patients/patients.module';
import { AiActionsController } from './ai-actions.controller';
import { AiActionsService } from './ai-actions.service';
import { LLM_PROVIDER } from './llm/llm-provider';
import { OpenAiLlmProvider } from './llm/openai-llm.provider';

@Module({
  imports: [FlagsModule, PatientsModule],
  controllers: [AiActionsController],
  providers: [
    AiActionsService,
    {
      provide: LLM_PROVIDER,
      useClass: OpenAiLlmProvider,
    },
  ],
})
export class AiActionsModule {}
