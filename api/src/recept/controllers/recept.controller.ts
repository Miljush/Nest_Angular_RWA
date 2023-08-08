import { Body, Controller, Get, Param, Post,Put,Delete } from '@nestjs/common';
import { ReceptifeedService } from '../services/recept.service';
import { Recept } from '../models/recept.interface';

@Controller('recept')
export class ReceptifeedController {
    constructor(private receptService:ReceptifeedService){}


    @Post('createRecept')
    create(@Body() recept: Recept){
            return this.receptService.createRecept(recept);
    }
    @Get('vratiSveRecepte')
    vratiSveRecepte(){
        return this.receptService.vratiSveRecepte();
    }
    @Put('azurirajRecept/:id')
    azurirajRecept(
        @Param('id') id:number,
        @Body() recept:Recept
        ){
        return this.receptService.azurirajRecept(id,recept);
    }
    @Delete('izbrisiRecept/:id')
    izbrisiRecept(@Param('id') id:number){
        return this.receptService.izbrisiRecept(id)
    }
}
