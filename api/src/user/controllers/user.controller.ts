import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../models/user.entity';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('createUser')
    create(@Body() user: UserEntity){
            return this.userService.createUser(user);
    }
    @Get('vratiSveUsere')
    vratiSveUsere(){
        return this.userService.vratiSveUsere();
    }
    @Get('vratiUsera')
    vratiUsera(@Body() id:number){
        return this.userService.vratiUsera(id);
    }
}
