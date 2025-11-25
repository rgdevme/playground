
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDosController } from './todo.controller';
import { ToDosService } from './todo.service';
import { ToDo, ToDoSchema } from './todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }])],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}
