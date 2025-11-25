
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateToDoDto, UpdateToDoDto } from './todo.dto';
import { ToDoDocument } from './todo.schema';
import { ToDosService } from './todo.service';

@Controller('todo')
export class ToDosController {
  constructor(private readonly todoService: ToDosService) { }

  @Get()
  findAll(): Promise<ToDoDocument[]> {
    return this.todoService.findAll()
  }

  @Get()
  findOne(@Param() id: string): Promise<ToDoDocument> {
    return this.todoService.find(id)
  }

  @Post()
  create(@Body() todo: CreateToDoDto): Promise<ToDoDocument> {
    return this.todoService.create(todo)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: UpdateToDoDto): Promise<ToDoDocument> {
    return this.todoService.findOneAndUpdate(id, todo)
  }
}
