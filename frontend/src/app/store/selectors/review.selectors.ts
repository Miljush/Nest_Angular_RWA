import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStateInterface } from "../types/user.interface";
import { ReceptSingleStateInterface, ReceptStateInterface } from "../types/recept.interface";
import { adapter } from "../reducers/recept.reducers";
import { ReviewStateInterface } from "../types/review.interface";

export const selectReviewFeature = createFeatureSelector<ReviewStateInterface>('review');

export const selectorLoadingReview = createSelector(
    selectReviewFeature,
    (state:ReviewStateInterface)=>state.isLoading
);
export const selectorErrorReview = createSelector(
    selectReviewFeature,
    (state:ReviewStateInterface)=>state.error
);
export const selectorReviews=createSelector(
    selectReviewFeature,
    adapter.getSelectors().selectAll
)
