// import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
