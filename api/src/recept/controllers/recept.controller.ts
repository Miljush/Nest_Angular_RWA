import { Body, Controller, Get, Param, Post,Put,Delete, UseGuards } from '@nestjs/common';
import { ReceptifeedService } from '../services/recept.service';
import { CreateReceptDto } from '../dto/createreceptdto';
import { ReceptPostEntity } from '../models/recept.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('recept')
export class ReceptifeedController {
    constructor(private receptService:ReceptifeedService){}


    @Post('createRecept')
    create(@Body() createReceptDto: CreateReceptDto) {
        console.log(createReceptDto);
        return this.receptService.createRecept(createReceptDto);
      }
    @Get('vratiSveRecepte')
    vratiSveRecepte(){
        return this.receptService.vratiSveRecepte();
    }
    @Get('vratiRecept/:id')
    vratiRecept(@Param('id') id:number){
        return this.receptService.vratiRecept(id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('vratiRecepteZaUsera/:id')
    vratiRecepteZaUsera(@Param('id') id:number){
        return this.receptService.vratiRecepteZaUsera(id);
    }
    @Put('azurirajRecept/:id')
    azurirajRecept(
        @Param('id') id:number,
        @Body() recept:ReceptPostEntity
        ){
        return this.receptService.azurirajRecept(id,recept);
    }
    @Delete('izbrisiRecept/:id')
    izbrisiRecept(@Param('id') id:number){
        return this.receptService.izbrisiRecept(id)
    }
    @Put('lajkujRecept/:idRecepta/:idUsera')
    lajkujReceptt(
        @Param('idRecepta') idRecepta:number,
        @Param('idUsera') idUsera:number,
    ){
        return this.receptService.lajkujRecept(idRecepta,idUsera);
    }
}
