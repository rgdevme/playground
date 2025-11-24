import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDosModule } from '../schemas/todo/todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:UXnjo95dYGKDpIBk@playground.6o4d5w1.mongodb.net/?appName=playground'),
    ToDosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
