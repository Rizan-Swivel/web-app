import React ,{useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryAction from "../../Stores/Category/Actions";

const CategoryStore = (Component) =>
  function Comp(props) {
    const dispatch = useDispatch();
    useEffect(() => {  },[])

    const categoryList = useSelector((state) => state.categories.categoryList);
    const category = useSelector(state => state.categories.category)
    const selectedCategoryId = useSelector(state => state.categories.selectedCategoryId)
    
    const getProps = () => ({
      ...props,
      categoryList,
      selectedCategoryId,
      category,    
      getCategoryList: (data) => dispatch(CategoryAction.getAllCategories(data)),
      getCategory:(data) => dispatch(CategoryAction.getCategory(data)),
      resetCategoryState: () => dispatch(CategoryAction.resetCategoryState())
    });
    return <Component {...getProps()} />;
  };

export default CategoryStore;
