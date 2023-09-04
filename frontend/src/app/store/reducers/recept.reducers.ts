import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "../types/user";
import { UserStateInterface } from "../types/user.interface";
import { createReducer, on } from "@ngrx/store";
import * as ReceptActions from '../actions/recept.actions';
import { Recept } from "../types/recept";
import { ReceptDodajInterface, ReceptSingleStateInterface, ReceptStateInterface, ReceptiUserStateInterface } from "../types/recept.interface";


export const adapter:EntityAdapter<Recept>=createEntityAdapter<Recept>();

export const initialState:ReceptStateInterface=adapter.getInitialState({
    isLoading:false,
    error:null,
})
export const initialStateZaUsera:ReceptiUserStateInterface=adapter.getInitialState({
    isLoading:false,
    error:null,
})

export const initialStateZaDodavanje:ReceptDodajInterface=adapter.getInitialState({
    isLoading:false,
    error:null,
})

export const initialStateJedanRecept: ReceptSingleStateInterface={
    isLoading:false,
    recept: null,
    error: null
}



export const receptReducers=createReducer(
    initialState,
    on(ReceptActions.vratiRecepte,(state)=>({...state,isLoading:true})),
    on(ReceptActions.vratiRecepteSuccess,(state,action)=>{
        return adapter.addMany(action.recepts, {...state, isLoading:false})
    }),
    on(ReceptActions.vratiRecepteFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    )
export const receptSingleReducers=createReducer(
        initialStateJedanRecept,
        on(ReceptActions.vratiRecept,(state)=>({...state,isLoading:true})),
        on(ReceptActions.vratiReceptSuccess,(state,action)=>
            ({...state,isLoading:false,recept:action.recept})),
        on(ReceptActions.vratiReceptFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
        )
export const recptiZaUseraReducers=createReducer(
    initialStateZaUsera,
    on(ReceptActions.vratiRecepteZaUsera,(state)=>({...state,isLoading:true})),
    on(ReceptActions.vratiRecepteZaUseraSuccess,(state,action)=>{
        return adapter.addMany(action.recepts, {...state, isLoading:false})
    }),
    on(ReceptActions.vratiRecepteZaUseraFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    on(ReceptActions.kreirajRecept,(state)=>({...state,isLoading:true})),
    on(ReceptActions.kreirajReceptSuccess,(state,action)=>{
        return adapter.addOne(action.recept, {...state, isLoading:false})
    }),
    on(ReceptActions.kreirajReceptFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
)
