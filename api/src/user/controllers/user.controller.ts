import { Body, Controller, Get, Post, Req, Res, UseGuards,UseInterceptors,Request, Param, Put  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../models/user.entity';
import { LoginDto, updateUserDto } from '../dto/loginDto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService,private readonly jwtService: JwtService){}

    @Post('register')
    register(@Body() user: UserEntity){
            console.log(user);
            return this.userService.createUser(user);
    }
    @Get('vratiSveUsere')
    vratiSveUsere(){
        return this.userService.vratiSveUsere();
    }
    @Get('vratiUsera/:id')
    vratiUsera(@Param('id') id:number){
        return this.userService.vratiUsera(id);
    }
    @Get('vratiUseraZaCookie')
    async vratiUseraCookie(@Req() request: any){
        let cookie = request.cookies['jwt'];
        const data=await this.jwtService.verifyAsync(cookie);
        const userbaza=await this.userService.vratiUseraCookie(data);
        return userbaza;
    }
    @Get('vratiLoggedStatus')
    async vratiLoggedStatus(@Req() request: any){
        let cookie = request.cookies['jwt'];
        try{const data=await this.jwtService.verifyAsync(cookie);
            const userbaza=await this.userService.vratiUseraCookie(data);
            if(userbaza){
                return true
            }else{
                return false
            }}
            catch{
                return false
            }
        
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto:LoginDto,@Res({ passthrough: true }) response: Response){
       const token=await this.userService.login(loginDto);
       response.cookie('jwt',token,{httpOnly:false});
       return {message:'success'}
    }
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt'); 
    return { message: 'logged out' };
  }
  @Put('updateUser')
    lajkujReceptt(
        @Body() updateUser: updateUserDto
    ){
        return this.userService.updateUser(updateUser);
    }

}
