import validator from "validator";

export const loginValidator = (loginForm: { email: string; password: string }) => {
  if (Object.values(loginForm).some((v) => !v)) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.EMPTY_FORM,
    };
  }

  if (!validator.isEmail(loginForm.email)) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.INVALID_EMAIL,
    };
  }
  if (!validator.isLength(loginForm.password, { min: 8 })) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.INVALID_PASSWORD,
    };
  }
  return {
    isValid: true,
  };
};

export const USER_VALIDATION_ERRORS = {
  EMPTY_FORM: "Email/password value is empty",
  INVALID_EMAIL: "Please enter it according to the email format",
  INVALID_PASSWORD: "Password length must be at least 8",
  USER_NOT_FOUND: "Please check your email and password",
  EXIST_USER: "User already exists",
};

export const TODO_VALIDATION_ERRORS = {
  TODO_SOMETHING_WRONG: "There was a problem looking for todo",
  INVALID_VALUE: "Please check the input again",
};
