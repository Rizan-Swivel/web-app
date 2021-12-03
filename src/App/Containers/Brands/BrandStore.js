import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BrandAction from "../../Stores/Brands/Actions";
import {resetBrandsState} from "../../Sagas/brandSaga";

const BrandStore = (Component) =>
  function Comp(props) {
    const dispatch = useDispatch();

    let brandList = useSelector((state) => state.brands.brandList)
    let brand = useSelector(state => state.brands.brand)
    let selectedBrandId = useSelector(state => state.brands.selectedBrandId)

    const getProps = () => ({
        ...props,
        brandList,
        selectedBrandId,
        brand,
      getBrandList: (data) => dispatch(BrandAction.getAllBrands(data)),
      getBrand: (data) => dispatch(BrandAction.getBrand(data)),
      resetBrandsState: () => dispatch(BrandAction.resetBrandsState())
    });
    return <Component {...getProps()} />;
  };
export default BrandStore;
