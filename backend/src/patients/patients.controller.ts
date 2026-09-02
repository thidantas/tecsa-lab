import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ListPatientsQueryDto } from './dto/list-patients-query.dto';
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
}
