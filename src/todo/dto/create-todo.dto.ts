import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  checked: boolean;
}
