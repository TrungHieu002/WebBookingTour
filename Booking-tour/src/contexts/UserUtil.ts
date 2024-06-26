export const getUserFromSession = (): string | null => {
  const userSession = sessionStorage.getItem("userSession");
  return userSession ? JSON.parse(userSession) : null;
};

export const saveUserToSession = (user: any): void => {
  sessionStorage.setItem("userSession", JSON.stringify(user));
};
