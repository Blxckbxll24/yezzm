import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    createUser(user: createUserDto){
        const newUser =  this.userRepository.create(user)
        return this.userRepository.save(newUser)


    }

    getUsers(){
      return this.userRepository.find()
    }

    getUser(id:number){
      return this.userRepository.findOne({
        where: {
          id
        }
      })

    }

    deleteUser(id: number){
      return this.userRepository.delete({id});
    }

    updateUser(id: number, user: updateUserDto){
      this.userRepository.update({id}, user)

    }


}
