import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import StartupActions from "../../../Stores/Startup/Actions";

function TranslationSwitcher(props) {
  const { i18n } = useTranslation();
  const [switcherMenuToggle, setSwitcherMenuToggle] = useState(false);
  const [selected, setSelected] = useState([]);
  const countries = [
    {
      label: "English",
      lang: "en",
      flag: "gb",
    },
    {
      label: "Russian",
      lang: "ru",
      flag: "ru",
    },
  ];

  useEffect(() => {
    setSelected(i18n.language);
  }, [i18n.language]);

  const onChangeLanguage = (country) => {
    setSelected(country.lang);
    i18n.changeLanguage(country.lang);
    props.changeLanguage(country.lang);
    setSwitcherMenuToggle(!switcherMenuToggle);
  };
  return (
    <div>
      <button
        className="relative flex rounded-md focus:outline-none focus:shadow-outline-purple"
        onClick={() => setSwitcherMenuToggle(!switcherMenuToggle)}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            className="w-5 h-5 "
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>{selected ? selected : ""} </span>
      </button>
      <div
        className={`bg-white text-gray-700 shadow-md rounded text-sm absolute mt-12 top-0 right-0 min-w-full w-48 z-30 ${
          switcherMenuToggle ? " show" : " hidden"
        }`}
      >
        <span className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 -mt-1 mr-3"></span>
        <div className="bg-gray-200 rounded-b-md shadow-lg overflow-auto relative z-10">
          <ul className="list-reset">
            <>
              {countries.map((country, index) => {
                return (
                  <li key={index}>
                    <span
                        className="px-4 py-4 flex hover:bg-gray-100  shadow-xs cursor-pointer text-black font-bold"
                      onClick={() => onChangeLanguage(country)}
                    >
                      <span
                          className={`inline-block mr-2 flag-icon flag-icon-${country.flag}`}
                      ></span>
                      <span className="inline-block">{country.label}</span>
                      {country.lang === selected ? (
                        <span className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </li>
                );
              })}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (payload) => dispatch(StartupActions.changeLanguage(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslationSwitcher);
