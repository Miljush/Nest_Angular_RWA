import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/createReviewDto';

@Controller('review')
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @Post('kreirajReview')
    kreirajReview(@Body() createReviewDto:CreateReviewDto ) {
        return this.reviewService.kreirajReview(createReviewDto);
      }

}
