import { createAction, props } from "@ngrx/store"
import { Review } from "../types/komentar"



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