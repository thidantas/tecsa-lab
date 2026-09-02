import { IsString, MaxLength } from 'class-validator';

export class UpdatePatientNotesDto {
  @IsString()
  @MaxLength(2000)
  notes!: string;
}
