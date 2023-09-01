import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStateInterface } from "../types/user.interface";
import { ReceptSingleStateInterface, ReceptStateInterface, ReceptiUserStateInterface } from "../types/recept.interface";
import { adapter } from "../reducers/recept.reducers";

export const selectReceptFeature = createFeatureSelector<ReceptStateInterface>('recept');
export const selectSingleReceptFeature = createFeatureSelector<ReceptSingleStateInterface>('Singlerecept');
export const selectReceptiUserFeature = createFeatureSelector<ReceptiUserStateInterface>('receptZaUsera');

export const selectorLoading = createSelector(
    selectReceptFeature,
    (state:ReceptStateInterface)=>state.isLoading
);
export const selectorError = createSelector(
    selectReceptFeature,
    (state:ReceptStateInterface)=>state.error
);
export const selectorRecepti=createSelector(
    selectReceptFeature,
    adapter.getSelectors().selectAll
)
export const selectorLoadingSingleRecept = createSelector(
    selectSingleReceptFeature,
    (state:ReceptSingleStateInterface)=>state.isLoading
);
export const selectorErrorSingleRecept = createSelector(
    selectSingleReceptFeature,
    (state:ReceptSingleStateInterface)=>state.error
);
export const selectorRecept=createSelector(
    selectSingleReceptFeature,
    (state:ReceptSingleStateInterface)=>state.recept
)

export const selectorLoadingReceptiUser = createSelector(
    selectReceptiUserFeature,
    (state:ReceptiUserStateInterface)=>state.isLoading
);
export const selectorErrorReceptiUser = createSelector(
    selectReceptiUserFeature,
    (state:ReceptiUserStateInterface)=>state.error
);
export const selectorReceptiZaUsera=createSelector(
    selectReceptiUserFeature,
    adapter.getSelectors().selectAll
)