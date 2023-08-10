import { Body, Controller, Get, Post, Res, UseGuards,UseInterceptors  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../models/user.entity';
import { LoginDto } from '../dto/loginDto';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('register')
    register(@Body() user: UserEntity){
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
    @Post('login')
    async login(@Body() loginDto:LoginDto, 
                @Res({passthrough:true}) response:Response ){
        const token=await this.userService.login(loginDto);
        response.cookie('jwt',token,{httpOnly:true});
        return {message:'success'};
    }
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt'); 
    return { message: 'logged out' };
  }

}
