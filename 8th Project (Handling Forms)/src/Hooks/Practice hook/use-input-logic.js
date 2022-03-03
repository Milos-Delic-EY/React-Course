import { useState } from "react";

const useInputLogic = (checkValidity) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = checkValidity(enteredValue);
  const hasError = !isValid && isTouched;

  const inputValueHandler = (e) => setEnteredValue(e.target.value);
  const inputBlurHandler = (e) => setIsTouched(true);

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    inputValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputLogic;
