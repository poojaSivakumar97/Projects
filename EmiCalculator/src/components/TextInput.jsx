import React from "react";

const TextInput = ({ title, state, setState, placeholder }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;
