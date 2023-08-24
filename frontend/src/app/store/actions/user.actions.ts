import { createAction, props } from "@ngrx/store";
import { User } from "../types/user";

export const loginUser=createAction(
    '[Login Page] Login User',
    props<{user:{username:string,password:string}}>()
)
export const loginUserSuccess=createAction(
    '[Login Page] Login User success',
    props<{message:string}>()
)
export const loginUserFailure=createAction(
    '[Login Page] Login User failure',
    props<{error:string}>()
)
export const logoutUser=createAction(
    '[Logout Page] Logout User',
)
export const logoutUserSuccess=createAction(
    '[Logout Page] Logout User success',
    props<{message:string}>()
)
export const logoutUserFailure=createAction(
    '[Logout Page] Logout User failure',
    props<{error:string}>()
)
export const refreshUser = createAction(
    '[User Page] Rehydrate',
    props<{ message: string }>()
  );
  
  export const refreshUserFailure = createAction(
    '[User Page] Rehydrate Failure',
    props<{ error: string }>()
  );