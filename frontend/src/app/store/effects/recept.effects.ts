import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ReceptActions from '../actions/recept.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { ReceptService } from "src/app/services/recept.service";
import { Router } from "@angular/router";
@Injectable()
export class ReceptEffects{
    vratiSveRecepte$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReceptActions.vratiRecepte),
        mergeMap(()=> {
            return this.receptService.vratiSveRecepte().pipe(
                map((recepti)=>ReceptActions.vratiRecepteSuccess({recepts:recepti})),
                catchError((error)=>
                of(ReceptActions.vratiRecepteFailure({error: error.message})))
            )
        })
    )
    )
    vratiRecept$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReceptActions.vratiRecept),
        mergeMap((action)=> {
            return this.receptService.vratiRecept(action.id).pipe(
                map((recept)=>ReceptActions.vratiReceptSuccess({recept:recept})),
                catchError((error)=>
                of(ReceptActions.vratiRecepteFailure({error: error.message})))
            )
        })
    )
    )

    vratiSveRecepteZaUsera$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReceptActions.vratiRecepteZaUsera),
        mergeMap((action)=> {
            return this.receptService.vratiRecepteZaUsera(action.id).pipe(
                map((recepti)=>ReceptActions.vratiRecepteZaUseraSuccess({recepts:recepti})),
                catchError((error)=>
                of(ReceptActions.vratiRecepteZaUseraFailure({error: error.message})))
            )
        })
    )
    )
    dodajRecept$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReceptActions.kreirajRecept),
        mergeMap((action)=>this.receptService.dodajRecept(action.recept).pipe(
            map((recept)=>ReceptActions.kreirajReceptSuccess({recept})),
            catchError((error)=>
            of(ReceptActions.kreirajReceptFailure({error: error.message})))
        ))
    )
    )
    izbrisiRecept$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ReceptActions.izbrisiRecept),
        mergeMap((action)=>this.receptService.izbrisiRecept(action.id).pipe(
            map((id)=>ReceptActions.izbrisiReceptSuccess({id:action.id})),
            catchError((error)=>
            of(ReceptActions.izbrisiReceptFailure({error: error.message})))
        ))
    )
    )


    constructor(private actions$: Actions,private receptService: ReceptService,private router: Router){}
}