export const regexPattern = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
};

export const errorMessage = {
  Email_Required: "Email is required",
  Invalid_Email: "Please enter a valid email address",
  Password_Required: "Password is required",
  Password_Criteria: "Minimum 8 characters with at least 1 uppercase, 1 digit, 1 special character",
};


