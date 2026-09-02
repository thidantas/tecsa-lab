import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ListPatientsQueryDto } from './dto/list-patients-query.dto';
import { UpdatePatientNotesDto } from './dto/update-patient-notes.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  list(@Query() query: ListPatientsQueryDto) {
    return this.patientsService.list(query.search);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.getById(id);
  }

  @Patch(':id')
  updateNotes(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePatientNotesDto,
  ) {
    return this.patientsService.updateNotes(id, dto);
  }
}
