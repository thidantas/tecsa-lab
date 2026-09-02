import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { FlagsService } from '../flags/flags.service';
import { PatientsService } from '../patients/patients.service';
import { buildAiActionsUserPrompt, AI_ACTIONS_SYSTEM_PROMPT } from './build-prompt';
import { parseActions } from './parse-actions';
import { LLM_PROVIDER, type LlmProvider } from './llm/llm-provider';

@Injectable()
export class AiActionsService {
  constructor(
    private readonly flagsService: FlagsService,
    private readonly patientsService: PatientsService,
    @Inject(LLM_PROVIDER) private readonly llm: LlmProvider,
  ) {}

  async generate(patientId: string) {
    const enabled = await this.flagsService.isEnabled('ai_actions');

    if (!enabled) {
      throw new ForbiddenException({
        message: 'AI actions are disabled',
        code: 'AI_DISABLED',
      });
    }

    const patient = await this.patientsService.getById(patientId);
    const payload = await this.llm.completeJson({
      system: AI_ACTIONS_SYSTEM_PROMPT,
      user: buildAiActionsUserPrompt(patient),
    });
    const actions = parseActions(payload);

    if (actions.length < 3) {
      throw new BadGatewayException('LLM returned fewer than 3 actions');
    }

    return { actions };
  }
}
