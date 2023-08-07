import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReceptPostEntity } from '../models/recept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Recept } from '../models/recept.interface';

@Injectable()
export class ReceptifeedService {
    constructor(
        @InjectRepository(ReceptPostEntity)
        private readonly receptiPostRepository:Repository<ReceptPostEntity>
    ){}

    createRecept(recept: Recept){
        return this.receptiPostRepository.save(recept);
    }
}
