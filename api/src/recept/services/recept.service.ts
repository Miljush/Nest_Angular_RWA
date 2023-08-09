import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReceptPostEntity } from '../models/recept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Recept } from '../models/recept.interface';
import { CreateReceptDto } from '../dto/createreceptdto';
import { UserService } from 'src/user/services/user.service';
import { STATUS_CODES } from 'http';


@Injectable()
export class ReceptifeedService {
    constructor(
        @InjectRepository(ReceptPostEntity)
        private readonly receptiPostRepository:Repository<ReceptPostEntity>,
        @Inject(UserService)
        private readonly userService: UserService,
        
    ){}

    async createRecept(createReceptDto: CreateReceptDto): Promise<ReceptPostEntity> {
        
        const userizbaze=await this.userService.vratiUseraZaId(createReceptDto.id)
        const recept = new ReceptPostEntity();
        recept.user=userizbaze;
        recept.ime=createReceptDto.ime;
        recept.opis=createReceptDto.opis;
        recept.sastojci=createReceptDto.sastojci;
        recept.slike=createReceptDto.slike;
    
        return this.receptiPostRepository.save(recept);
      }

    vratiSveRecepte(){
        return this.receptiPostRepository
      .createQueryBuilder('recept')
      .leftJoinAndSelect('recept.user', 'user')
      .select(['recept', 'user.id'])
      .getMany();
    }
    azurirajRecept(id:number,recept:ReceptPostEntity){
        return this.receptiPostRepository.update(id,recept)
    }
    async lajkujRecept(idrecepta:number,idusera:number){
        const rec=await this.receptiPostRepository.findOneById(idrecepta)
        if(rec!=null){
        return this.userService.lajkuj(idrecepta,idusera)
        }
        else{
            throw new BadRequestException("Recept nije prondadjen!");
        }
        

    }
    izbrisiRecept(id:number){
        return this.receptiPostRepository.delete(id);
    }
}
