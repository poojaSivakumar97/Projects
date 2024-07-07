import React from "react";
import { numberWithCommas } from "../utils/config";

const Slider = ({
  title,
  underlineTitle,
  minValue,
  maxValue,
  value,
  onChange,
  labelMin,
  labelMax,
}) => {
  return (
    <div className="sliderContainer">
      <span className="title">{title}</span>

      <span className="underline-title" style={{ textDecoration: "underline" }}>
        {underlineTitle}
      </span>
      <input
        className="slider"
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <div className="labels">
        <label>{numberWithCommas(labelMin)}</label>
        <b>{numberWithCommas(value)}</b>
        <label>{numberWithCommas(labelMax)}</label>
      </div>
    </div>
  );
};

export default Slider;
