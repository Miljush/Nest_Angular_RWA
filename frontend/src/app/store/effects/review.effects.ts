import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ReviewActions from '../actions/review.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { ReceptService } from "src/app/services/recept.service";
import { Router } from "@angular/router";
import { ReviewService } from "src/app/services/review.service";
@Injectable()
export class ReviewEffects{
    vratiReviewZaRecept$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReviewActions.vratiRevieweZaRecept),
        mergeMap((action)=> {
            return this.reviewService.vratiSveReviews(action.id).pipe(
                map((review)=>ReviewActions.vratiRevieweZaReceptSuccess({reviews:review})),
                catchError((error)=>
                of(ReviewActions.vratiRevieweZaReceptFailure({error: error.message})))
            )
        })
    )
    )
    dodajReview$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReviewActions.kreirajReview),
        mergeMap((action)=>this.reviewService.dodajReview(action.review).pipe(
            map((review)=>ReviewActions.kreirajReviewSuccess({review})),
            catchError((error)=>
            of(ReviewActions.kreirajReviewFailure({error: error.message})))
        ))
    )
    )
    constructor(private actions$: Actions,private reviewService: ReviewService,private router: Router){}
}