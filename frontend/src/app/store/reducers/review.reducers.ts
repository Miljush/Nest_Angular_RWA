import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "../types/user";
import { UserStateInterface } from "../types/user.interface";
import { createReducer, on } from "@ngrx/store";
import * as ReviewActions from '../actions/review.actions';
import { Recept } from "../types/recept";
import { ReceptSingleStateInterface, ReceptStateInterface } from "../types/recept.interface";
import { Review } from "../types/komentar";
import { ReviewStateInterface } from "../types/review.interface";


export const adapter:EntityAdapter<Review>=createEntityAdapter<Review>();

export const initialState:ReviewStateInterface=adapter.getInitialState({
    isLoading:false,
    error:null,
})


export const reviewReducers=createReducer(
    initialState,
    on(ReviewActions.vratiRevieweZaRecept,(state)=>({...state,isLoading:true})),
    on(ReviewActions.vratiRevieweZaReceptSuccess,(state,action)=>{
        return adapter.addMany(action.reviews, {...state, isLoading:false})
    }),
    on(ReviewActions.vratiRevieweZaReceptFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    on(ReviewActions.kreirajReview,(state)=>({...state,isLoading:true})),
    on(ReviewActions.kreirajReviewSuccess,(state,action)=>{
        return adapter.addOne(action.review, {...state, isLoading:false})
    }),
    on(ReviewActions.kreirajReviewFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    )
