import { Body, Controller, Get, Post, Req, Res, UseGuards,UseInterceptors  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../models/user.entity';
import { LoginDto } from '../dto/loginDto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(private userService:UserService,private readonly jwtService: JwtService){}

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
    @Get('vratiUseraZaCookie')
    async vratiUseraCookie(@Req() request: any){
        console.log("uso sam")
        let cookie = request.cookies['jwt'];
        const data=await this.jwtService.verifyAsync(cookie);
        console.log(data);
        const userbaza=await this.userService.vratiUseraCookie(data);
        console.log(userbaza);
        return userbaza;
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
