import useInputLogic from "../Hooks/Practice hook/use-input-logic";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    enteredValue: enteredName,
    isValid: isNameValid,
    hasError: nameInputError,
    inputValueHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInputLogic(isNotEmpty);
  const {
    enteredValue: enteredFirstname,
    isValid: isFirstnameValid,
    hasError: firstnameInputError,
    inputValueHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInputLogic(isNotEmpty);
  const {
    enteredValue: enteredEmail,
    isValid: isEmailValid,
    hasError: emailInputError,
    inputValueHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInputLogic(isEmail);

  let formIsValid = false;
  if (isNameValid && isEmailValid && isFirstnameValid) formIsValid = true;

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetNameInput();
    resetEmailInput();
    resetFirstnameInput();
  };

  const nameClasses = nameInputError ? "form-control invalid" : "form-control";
  const firstnameClasses = firstnameInputError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailInputError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputError && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={firstnameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
            value={enteredFirstname}
          />
          {firstnameInputError && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={emailClasses}>
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputError && (
            <p className="error-text">Please enter valid email.</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
