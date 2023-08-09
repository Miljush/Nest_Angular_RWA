import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
    ){}

    createUser(user: UserEntity){
        return this.userRepository.save(user);
    }
    async vratiUseraZaId(id: number): Promise<UserEntity | undefined> {
        return this.userRepository.findOneById(id);
    }
    async lajkuj(idrecepta:number,idusera:number){
        const userizbaze=await this.userRepository.findOneById(idusera);
        if (!userizbaze.lajkovaniRecepti) {
            userizbaze.lajkovaniRecepti = [];
          }
        userizbaze.lajkovaniRecepti.push(idrecepta);
        return this.userRepository.save(userizbaze);
    }
    async vratiSveUsere(){
        const user=await this.userRepository.find()
        return user
    }
    async vratiUsera(id:number){
        const user:UserEntity=await this.userRepository.findOneById(id);
        if(user!=null){
            return user
        }else{
            throw new BadRequestException("Ne postoji user");
        }
        
    }


}
