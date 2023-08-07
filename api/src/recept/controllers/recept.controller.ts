import { Body, Controller, Post } from '@nestjs/common';
import { ReceptifeedService } from '../services/recept.service';
import { Recept } from '../models/recept.interface';

@Controller('recept')
export class ReceptifeedController {
    constructor(private receptService:ReceptifeedService){}


    @Post('createRecept')
    create(@Body() recept: Recept){
            return this.receptService.createRecept(recept);
    }
}
