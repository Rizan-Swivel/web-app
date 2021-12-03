import { INITIAL_STATE_BRANDS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { BRANDS } from "./Actions";

export const getAllBrands = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAllBrandsSuccess = (state, { data }) => {
  return {
    ...state,
    brandList: data,
  };
};

export const getAllBrandsFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const getBrand = (state, { data }) => {
  return {
    ...state,
  };
};

export const getBrandSuccess = (state, { data }) => {
  return {
    ...state,
    brand: data,
  };
};

export const getBrandFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const resetBrandsState = (state, { error }) => ({
  ...state,
});

export const resetBrandsStateSuccess = (state, { error }) => ({
  ...INITIAL_STATE_BRANDS,
});


export const reducer = createReducer(INITIAL_STATE_BRANDS, {
  [BRANDS.GET_ALL_BRANDS]: getAllBrands,
  [BRANDS.GET_ALL_BRANDS_SUCCESS]: getAllBrandsSuccess,
  [BRANDS.GET_ALL_BRANDS_FAILURE]: getAllBrandsFailure,
  [BRANDS.GET_BRAND]: getBrand,
  [BRANDS.GET_BRAND_SUCCESS]: getBrandSuccess,
  [BRANDS.GET_BRAND_FAILURE]: getBrandFailure,
  [BRANDS.RESET_BRANDS_STATE]: resetBrandsState,
  [BRANDS.RESET_BRANDS_STATE_SUCCESS]: resetBrandsStateSuccess,
});
