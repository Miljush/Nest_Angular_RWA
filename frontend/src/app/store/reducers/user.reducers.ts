import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "../types/user";
import { UserStateInterface } from "../types/user.interface";
import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions';


export const adapter:EntityAdapter<User>=createEntityAdapter<User>();

export const initialState:UserStateInterface=adapter.getInitialState({
    isLoading:false,
    error:null,
    isLoggedIn:false
})
export const reducers=createReducer(
    initialState,
    on(UserActions.loginUser,(state)=>({...state,isLoading:true})),
    on(UserActions.loginUserSuccess,(state)=>({...state ,isLoading:false,isLoggedIn:true})),
    on(UserActions.loginUserFailure,(state,action)=>({...state ,isLoading:false,isLoggedIn:false,error:action.error})),
    on(UserActions.logoutUser,(state)=>({...state,isLoading:true})),
    on(UserActions.logoutUserSuccess,(state)=>({...state ,isLoading:false,isLoggedIn:false})),
    on(UserActions.logoutUserFailure,(state,action)=>({...state ,isLoading:false,error:action.error}))
    )
