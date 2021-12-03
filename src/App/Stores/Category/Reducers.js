import { INITIAL_STATE_CATEGORIES } from "./InitialState";
import { createReducer } from "reduxsauce";
import { CATEGORIES } from "./Actions";
import {INITIAL_STATE_DEALS} from "../Deals/InitialState";

export const getAllCategories = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAllCategoriesSuccess = (state, { data }) => {
  return {
    ...state,
    categoryList: data,
  };
};

export const getAllCategoriesFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const getCategory = (state, { data }) => {
  return {
    ...state,
  };
};

export const getCategorySuccess = (state, { data }) => {
  return {
    ...state,
    category: data,
  };
};

export const getCategoryFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const resetCategoryState = (state, { error }) => ({
  ...state,
});

export const resetCategoryStateSuccess = (state, { error }) => ({
  ...INITIAL_STATE_DEALS,
});

export const reducer = createReducer(INITIAL_STATE_CATEGORIES, {
  [CATEGORIES.GET_ALL_CATEGORIES]: getAllCategories,
  [CATEGORIES.GET_ALL_CATEGORIES_SUCCESS]: getAllCategoriesSuccess,
  [CATEGORIES.GET_ALL_CATEGORIES_FAILURE]: getAllCategoriesFailure,
  [CATEGORIES.GET_CATEGORY]: getCategory,
  [CATEGORIES.GET_CATEGORY_SUCCESS]: getCategorySuccess,
  [CATEGORIES.GET_CATEGORY_FAILURE]: getCategoryFailure,
  [CATEGORIES.RESET_CATEGORY_STATE]: resetCategoryState,
  [CATEGORIES.RESET_CATEGORY_STATE_SUCCESS]: resetCategoryStateSuccess,
});


