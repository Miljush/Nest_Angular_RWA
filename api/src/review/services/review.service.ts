import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReviewEntity } from '../models/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/createReviewDto';
import { ReceptifeedService } from 'src/recept/services/recept.service';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/models/user.entity';
import { ReceptPostEntity } from 'src/recept/models/recept.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository:Repository<ReviewEntity>,
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(ReceptifeedService)
        private readonly receptService: ReceptifeedService,
    ){}
    async kreirajReview(createReviewDto:CreateReviewDto){
        const user:UserEntity=await this.userService.vratiUseraZaId(createReviewDto.userId);
        if(user==null){
            throw new BadRequestException("Ne postoji user");
        }
        const recept:ReceptPostEntity=await this.receptService.vratiRecept(createReviewDto.receptId);
        if(recept==null){
            throw new BadRequestException("Ne postoji recept");
        }
        const review = new ReviewEntity();
        review.komentar=createReviewDto.komentar;
        review.starRating=createReviewDto.starRating;
        review.recipe=recept;
        review.user=user;
        return this.reviewRepository.save(review);
    }

}
