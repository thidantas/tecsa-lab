import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListPatientsQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  search?: string;
}
