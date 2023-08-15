import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService:UserService){

    }
    async validateUser(username:string,password:string){
        const userDb=await this.userService.findUserByUsername(username);
        if(userDb && await bcrypt.compare(password,userDb.sifra) ){
            return userDb;
        }
        else{
            return null;
        }
    }
}
