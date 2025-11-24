
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateToDoDto, UpdateToDoDto } from './todo.dto';
import { ToDo } from './todo.schema';
import { ToDosService } from './todo.service';

@Controller('todo')
export class ToDosController {
  constructor(private readonly todoService: ToDosService) { }

  @Get()
  findAll(): Promise<ToDo[]> {
    return this.todoService.findAll()
  }

  @Post()
  create(@Body() todo: CreateToDoDto): Promise<ToDo> {
    return this.todoService.create(todo)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: UpdateToDoDto): Promise<ToDo> {
    return this.todoService.findOneAndUpdate(id, todo)
  }
}
