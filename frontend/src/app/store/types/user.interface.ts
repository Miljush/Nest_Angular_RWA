import { EntityState } from "@ngrx/entity";
import { User } from "./user";

export interface UserStateInterface extends EntityState<User>{
    isLoading:boolean;
    error:string|null;
    isLoggedIn:boolean;
}
export interface UserSingleInterface {
    user:User|null;
    isLoading:boolean;
    error:string|null;
}