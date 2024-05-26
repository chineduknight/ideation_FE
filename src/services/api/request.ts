export const authRequest = {
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  ME: "/users/me",
  VERIFY_EMAIL: "/users/verifyemail",
  FORGOT_PASSWORD: "/users/forgotPassword",
  RESET_PASSWORD: (resetToken: string) => `/users/resetPassword/${resetToken}`,
  LOGOUT: "/users/logout",
};

export const noteRequest = {
  NOTES: "/notes",
};
