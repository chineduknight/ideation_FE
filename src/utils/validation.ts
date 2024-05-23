export type UserTypeError = {
  username?: string;
  email?: string;
  password?: string;
};

export const validateForm = (
  formInfo: {
    [key: string]: string;
  },
  type: "login" | "register"
): UserTypeError => {
  const errors: UserTypeError = {};
  if (!formInfo.username) errors.username = "Username is required";
  if (type === "register") {
    if (formInfo.email !== undefined) {
      if (!formInfo.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formInfo.email)) {
        errors.email = "Email is invalid";
      }
    }
  }
  if (!formInfo.password) {
    errors.password = "Password is required";
  } else if (formInfo.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  return errors;
};
