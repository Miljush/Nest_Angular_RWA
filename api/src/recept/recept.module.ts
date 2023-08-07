import { Module } from '@nestjs/common';
import { ReceptifeedService } from './services/recept.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptPostEntity } from './models/recept.entity';
import { ReceptifeedController } from './controllers/recept.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([ReceptPostEntity])
  ],
  providers: [ReceptifeedService],
  controllers:[ReceptifeedController]
})
export class ReceptifeedModule {}
