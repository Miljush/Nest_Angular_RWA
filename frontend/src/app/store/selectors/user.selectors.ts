import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserSingleInterface, UserStateInterface } from "../types/user.interface";

export const selectUserFeature = createFeatureSelector<UserStateInterface>('user');
export const selectSingleUserFeature = createFeatureSelector<UserSingleInterface>('usersingle');

export const selectorLoading = createSelector(
    selectUserFeature,
    (state:UserStateInterface)=>state.isLoading
);
export const selectorLoggedin = createSelector(
    selectUserFeature,
    (state:UserStateInterface)=>state.isLoggedIn
);
export const selectorError = createSelector(
    selectUserFeature,
    (state:UserStateInterface)=>state.error
);
export const selectorLoadingSingleUser = createSelector(
    selectSingleUserFeature,
    (state:UserSingleInterface)=>state.isLoading
);
export const selectorErrorSingleUser = createSelector(
    selectSingleUserFeature,
    (state:UserSingleInterface)=>state.error
);
export const selectorUser=createSelector(
    selectSingleUserFeature,
    (state:UserSingleInterface)=>state.user
)