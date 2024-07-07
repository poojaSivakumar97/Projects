import React, { useState, useEffect } from "react";
import "./App.css";
import Slider from "./components/Slider";
import { tenureData } from "./utils/constant";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
const App = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [tenure, setTenure] = useState(12);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);

  // All logics
  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    // calculate EMI and update it
    const emi = calculateEmi(dp);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    // console.log("onchange", e.target.value);
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    // calculate DownPayment and update it
    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };

  const calculateEmi = (downPayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1] where P, R, and N are the variables.
    if (!cost) return;
    const loanAmount = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };
  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercentage = 100 - (emi / calculateEmi(0)) * 100;
    return Number(cost * (downPaymentPercentage / 100)).toFixed(0);
  };
  useEffect(() => {
    if (!(cost > 0)) {
      setEmi(0);
      setDownPayment(0);
    }
    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);
  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };
  const totalEMI = () => {
    return Number(emi * tenure).toFixed(0);
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
        placeholder={"Total Cost of Assets"}
      />
      <TextInput
        title={"Interest Rate ( in %)"}
        state={interest}
        setState={setInterest}
        placeholder={"Interest rate"}
      />
      <TextInput
        title={"Processing Fee ( in %)"}
        state={fee}
        setState={setFee}
        placeholder={"Processing Fee"}
      />

      {/* slider for downpayment */}
      <Slider
        title={"Down Payment"}
        underlineTitle={`Total Down Payment -${totalDownPayment()}`}
        minValue={0}
        maxValue={cost}
        value={downPayment}
        onChange={updateEmi}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <Slider
        title={"Loan per Month"}
        underlineTitle={
          !isNaN(totalEMI()) &&
          `Total Loan Amount - ${numberWithCommas(totalEMI())}`
        }
        minValue={calculateEmi(cost)}
        maxValue={calculateEmi(0)}
        value={emi}
        onChange={updateDownPayment}
        labelMin={calculateEmi(cost)}
        labelMax={calculateEmi(0)}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              key={t}
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default App;
