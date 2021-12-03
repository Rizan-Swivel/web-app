import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StartupActions from "../../Stores/Startup/Actions";
import "../../assets/styles/main.css";
import { Button } from "../../Components/atoms/Button";
import MultiSelect from "../../Components/atoms/MultiSelect/MultiSelect";
import { Textfield } from "../../Components/atoms/Textfield";

const BusinessInformation = (props) => {
  const { values, handleChange, SignUp, t, back, validateFields } = props;
  let dataOBJ = {
    page: 0,
    size: 50,
  };
  const [data, setData] = useState(dataOBJ);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const validateForm = () => {
    let valid = validateFields(values);

    if (!valid) return;
    else {
      SignUp();
    }
  };

  useEffect(() => {
    if (props.categoryList) {
      const cat = props.categoryList.categories.map((data) => ({
        value: data.id,
        label: data.name,
      }));
      setCategories(cat);
    } else {
      props.getCategoryList(data);
    }

    if (props.brandList) {
      const brand = props.brandList.brands.map((data) => ({
        value: data.id,
        label: data.name,
      }));
      setBrands(brand);
    } else {
      props.getBrandsList(data);
    }
  }, [props.categoryList, props.brandList]);

  return (
    <>
      <div className="mt-4">
        <Textfield
          type={
            values.merchantName.valid == null
              ? "primary"
              : values.merchantName.valid
              ? "green"
              : "red"
          }
          size="sm"
          label={t(values.merchantName.label)}
          onChange={(e) => handleChange(values.merchantName, e)}
          error={
            values.merchantName.valid == null
              ? null
              : values.merchantName.valid
              ? null
              : values.merchantName.errorMessage
          }
          placeholder={t(values.merchantName.label)}
          value={values.merchantName.value}
        ></Textfield>
      </div>

      <div className="mt-4">
        <MultiSelect
          options={categories}
          label={t(values.categories.label)}
          onChange={(e) => handleChange(values.categories, e)}
          error={
            values.categories.valid == null
              ? null
              : values.categories.valid
              ? null
              : values.categories.errorMessage
          }
          value={values.categories.value}
        />
      </div>

      <div className="mt-4">
        <MultiSelect
          options={brands}
          label={t(values.brands.label)}
          onChange={(e) => handleChange(values.brands, e)}
          error={
            values.brands.valid == null
              ? null
              : values.brands.valid
              ? null
              : values.brands.errorMessage
          }
          value={values.brands.value}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={back} type="primary">
          {t("merchant_sign_up.back_btn")}
        </Button>
        <Button onClick={validateForm} type="primary">
          {t("merchant_sign_up.sign_up")}
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ startup: { categories, brands } }) => ({
  categoryList: categories,
  brandList: brands,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryList: (data) => dispatch(StartupActions.getCategories(data)),
  getBrandsList: (data) => dispatch(StartupActions.getBrands(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInformation);
