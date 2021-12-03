import React, {useState} from "react";
import {Textarea} from "../Textarea";
import {Textfield} from "../Textfield";
import {isValid} from "../../../Utils/Validations";

const ConfirmModal = (props) => {
  const {
    closeModal,
    onModalAction,
    message,
    commentRequired,
    t
  } = props;

  //form logic
  const handleChangeAndValidate = (element = null, value= null) => {
    if (element==null){
      //no elements passed, validate all elements
      for (let key in  formState) {
        let field = formState[key];
        field.validMethod(field.value)
        setFields({...formState, [key]: {...field}})
      }
    }else {
      //validate passed element
      for (let key in formState) {
        let field = formState[key];
        if (formState[key].key == element.key) {
          field.validMethod(value)
          field = {...field, value:value}
          setFields({...formState, [key]: {...field}})
          break;
        }
      }
    }
  };

  const validateFields = (elements = {}) => {
    let valid = true;
    Object.entries(elements).map(([key, element]) => {
      if (!element.valid)
        valid = false;
    })
    return valid;
  };

  const submit = () => {

    let valid = validateFields(formState);
    if (!valid)
      handleChangeAndValidate()
    else{
      onModalAction(true, formState.comment.value)
      closeModal()
    }

  };

  let fields = {
    comment: {
      key: "comment",
      label: "common.comment",
      value: "",
      valid: null,
      validMethod: function (num) {
        this.valid = isValid(num);
      },
      errorMessage: t("error.commentRequired"),
    }
  }
  const [formState, setFields] = useState(fields);

  const renderForm = () => {
    return (
        <div className="mt-4">
          <Textfield
              required
              type={
                formState.comment.valid == null
                    ? "primary"
                    : formState.comment.valid
                    ? "green"
                    : "red"
              }
              size="sm"
              label={t(formState.comment.label)}
              onChange={(e) => handleChangeAndValidate(formState.comment, e.target.value)}
              error={
                formState.comment.valid == null
                    ? null
                    : formState.comment.valid
                    ? null
                    : formState.comment.errorMessage
              }
              placeholder={t(formState.comment.label)}
              value={formState.comment.value}
          />
        </div>
    )
  }
  //end of form logic

  const yes = () => {
    if (commentRequired){
      submit()
    }else{
      onModalAction(true)
      closeModal()
    }
  }

  const no = () => {
    onModalAction(false)
    closeModal()
  }

  return (
    <>
      <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <div className="modal-close cursor-pointer z-50">
                <svg
                  onClick={closeModal}
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                </svg>
              </div>
            </div>
            <div style={{ color: "red" }}>{message}</div>

            {commentRequired && renderForm()}
            <div className="flex justify-end pt-2">
              <button
                  onClick={() => yes()}
                className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
              >
                {t('common.yes')}
              </button>
              <button
                onClick={()=> no()}
                className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
              >
                {t('common.no')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
