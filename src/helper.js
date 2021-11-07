//save login response (user's name and token ) to session storage

export const authenticate = (res, next) => {
  console.log(res, authenticate);
  if (window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(res.data.token));
    sessionStorage.setItem("user", JSON.stringify(res.data.name));
  }

  next();
};

//access user's name from session storage

export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

//access token  from session storage

export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};
//remove token from session storage

export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  next();
};
