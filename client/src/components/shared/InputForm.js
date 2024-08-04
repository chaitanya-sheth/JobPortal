import React from "react";

const InputForm = ({htmlFor, labelText, inputType, name,value,handleChange}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={htmlFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name={name}
          value={value}
          onChange={handleChange}
          
        />
      </div>
    </>
  );
};

export default InputForm;
