import { createAction, props } from "@ngrx/store";
import { Recept, ReceptAdd } from "../types/recept";

export const vratiRecepte=createAction(
    '[SviRecepti Page] VratiSve Recept',
)
export const vratiRecepteSuccess=createAction(
    '[SviRecepti Page] VratiSve Recept success',
    props<{recepts:Recept[]}>()
)
export const vratiRecepteFailure=createAction(
    '[SviRecepti Page] VratiSve Recept failure',
    props<{error:string}>()
)
export const vratiRecept=createAction(
    '[ReceptDetaljno Page] Vrati Recept',
    props<{id:number}>()
)
export const vratiReceptSuccess=createAction(
    '[ReceptDetaljno Page] Vrati Recept success',
    props<{recept:any}>()
)
export const vratiReceptFailure=createAction(
    '[ReceptDetaljno Page] Vrati Recept failure',
    props<{error:string}>()
)
export const vratiRecepteZaUsera=createAction(
    '[Profile Page] VratiZaUsera Recept',
    props<{id:number}>()
)
export const vratiRecepteZaUseraSuccess=createAction(
    '[ReceptDetaljno Page] VratiZaUsera Recept success',
    props<{recepts:Recept[]}>()
)
export const vratiRecepteZaUseraFailure=createAction(
    '[ReceptDetaljno Page] VratiZaUsera Recept failure',
    props<{error:string}>()
)
export const kreirajRecept=createAction(
    '[ProfileKreiraj Page] KreirajRecept Recept',
    props<{recept:ReceptAdd}>()
)
export const kreirajReceptSuccess=createAction(
    '[ProfileKreiraj Page] KreirajRecept Recept success',
    props<{recept:ReceptAdd}>()
)
export const kreirajReceptFailure=createAction(
    '[ProfileKreiraj Page] KreirajRecept Recept failure',
    props<{error:string}>()
)