import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAllCategories: ["data"],
  getAllCategoriesSuccess: ["data"],
  getAllCategoriesFailure: ["error"],
  getCategory: ["data"],
  getCategorySuccess: ["data"],
  getCategoryFailure: ["error"],
  resetCategoryState: [],
  resetCategoryStateSuccess: [],
});
export const CATEGORIES = Types;
export default Creators;

