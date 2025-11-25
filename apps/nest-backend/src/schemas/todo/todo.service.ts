
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateToDoDto, UpdateToDoDto } from './todo.dto';
import { ToDo, ToDoDocument } from './todo.schema';

@Injectable()
export class ToDosService {
  constructor(@InjectModel(ToDo.name) private todoModel: Model<ToDo>) { }

  async create(createToDoDto: CreateToDoDto): Promise<ToDoDocument> {
    const createdToDo = new this.todoModel(createToDoDto);
    const now = new Date()
    createdToDo.createdAt = now
    createdToDo.updatedAt = now
    return createdToDo.save();
  }

  async findOneAndUpdate(id: string, updateToDoDto: UpdateToDoDto): Promise<ToDoDocument> {
    const updatedToDo = await this.todoModel.findOneAndUpdate(
      { _id: id },
      { ...updateToDoDto, updatedAt: new Date() }
    );
    return updatedToDo.save()
  }

  async findAll(filter?: FilterQuery<ToDo>): Promise<ToDoDocument[]> {
    return this.todoModel.find(filter);
  }

  async find(id:string): Promise<ToDoDocument> {
    return this.todoModel.findById(id);
  }
}
