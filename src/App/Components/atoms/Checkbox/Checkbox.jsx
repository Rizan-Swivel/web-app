import React from "react";

function Checkbox(props) {
  const { label } = props;
  return (
    <div>
    <input type="checkbox" {...props} />
      {label && <label for="fname" className="ml-4">{label}</label>}
    </div>
  );
}
export default Checkbox;
