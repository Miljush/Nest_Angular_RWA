import { EntityState } from "@ngrx/entity";
import { Recept, ReceptAdd } from "./recept";

export interface ReceptStateInterface extends EntityState<Recept>{
    isLoading:boolean;
    error:string|null;
}
export interface ReceptSingleStateInterface {
    recept:any|null;
    isLoading:boolean;
    error:string|null;
}
export interface ReceptiUserStateInterface extends EntityState<Recept>{
    isLoading:boolean;
    error:string|null;
}
export interface ReceptDodajInterface extends EntityState<ReceptAdd>{
    isLoading:boolean;
    error:string|null;
}