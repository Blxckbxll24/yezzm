import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { updateUserDto } from './dto/update-user.dto';



@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}


    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe)id:number): Promise<User> {
        console.log(id)
        console.log(typeof id)
        return this.userService.getUser(id);
    }


    @Post()
    createUser(@Body()newUser:createUserDto): Promise<User>{
        return this.userService.createUser(newUser)

    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe)id: number){
        return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id:number, @Body() user:updateUserDto){
    this.userService.updateUser(id, user)

}

}
