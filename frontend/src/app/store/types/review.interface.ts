import { EntityState } from "@ngrx/entity";
import { Review } from "./komentar";



export interface ReviewStateInterface extends EntityState<Review>{
    isLoading:boolean;
    error:string|null;
}