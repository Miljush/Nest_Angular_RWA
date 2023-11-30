import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './models/review.entity';
import { UserModule } from 'src/user/user.module';
import { ReceptifeedModule } from 'src/recept/recept.module';

@Module({
    imports:[
    UserModule,ReceptifeedModule,TypeOrmModule.forFeature([ReviewEntity]),       
      ],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
