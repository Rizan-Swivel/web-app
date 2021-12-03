import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAllBrands: ["data"],
  getAllBrandsSuccess: ["data"],
  getAllBrandsFailure: ["error"],
  getBrand: ["data"],
  getBrandSuccess: ["data"],
  getBrandFailure: ["error"],
  resetBrandsState: [],
  resetBrandsStateSuccess: []
});

export const BRANDS = Types;
export default Creators;
