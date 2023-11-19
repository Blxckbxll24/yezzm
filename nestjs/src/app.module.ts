import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
//checa tu proyecto de majo como lo conectaste a vite
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      username:'root',
      password:'',
      database:'YeezyMusic',//sin la s es el legitmo
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
