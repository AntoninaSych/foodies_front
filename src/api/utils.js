const getToken = () => localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`

