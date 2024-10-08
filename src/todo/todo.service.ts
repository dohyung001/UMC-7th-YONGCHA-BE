import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    // const todo = await this.todoRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Todo)
    //   .values(createTodoDto)
    //   .execute();

    return this.todoRepository.save(createTodoDto);
  }

  async findAll(title?: string) {
    const todo = this.todoRepository.createQueryBuilder('todo');

    if (title) {
      todo.where('todo.title LIKE :title', { title: `%${title}%` });
    }

    return await todo.getManyAndCount(); // 쿼리를 실행하고 결과를 반환
  }

  async findOne(id: number) {
    const todo = await this.todoRepository
      .createQueryBuilder('todo')
      .where('id = :id', { id })
      .getOne();

    if (!todo) {
      throw new NotFoundException(
        `${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`,
      );
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository
      .createQueryBuilder('todo')
      .where('id = :id', { id })
      .getOne();

    if (!todo) {
      throw new NotFoundException(
        `${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`,
      );
    }

    await this.todoRepository
      .createQueryBuilder('todo')
      .update(Todo)
      .set(updateTodoDto)
      .where('id = :id', { id })
      .execute();

    return `This action updates a #${id} todo`;
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException(
        `${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`,
      );
    }

    await this.todoRepository
      .createQueryBuilder('todo')
      .delete()
      .from(Todo)
      .where('id = :id', { id })
      .execute();

    return `${id}번의 todo를 삭제했습니다.`;
  }
}
