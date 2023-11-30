import { createAction, props } from "@ngrx/store"
import { KomentarAdd, Review } from "../types/komentar"



export const vratiRevieweZaRecept=createAction(
    '[ReceptDetaljno Page] VratiZaRecept Review',
    props<{id:number}>()
)
export const vratiRevieweZaReceptSuccess=createAction(
    '[ReceptDetaljno Page] VratiZaRecept Review success',
    props<{reviews:Review[]}>()
)
export const vratiRevieweZaReceptFailure=createAction(
    '[ReceptDetaljno Page] VratiZaRecept Review failure',
    props<{error:string}>()
)
export const kreirajReview=createAction(
    '[Detaljno Page] KreirajReview Review',
    props<{review:KomentarAdd}>()
)
export const kreirajReviewSuccess=createAction(
    '[Detaljno Page] KreirajReview Review success',
    props<{review:KomentarAdd}>()
)
export const kreirajReviewFailure=createAction(
    '[Detaljno Page] KreirajReview Review failure',
    props<{error:string}>()
)