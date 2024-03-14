import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();
const FAKE_USER = {
  name: "nahid",
  email: "nahid@example.com",
  password: "123456",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action!");
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const login = (email, password) => {
    if (email === FAKE_USER.email && FAKE_USER.password === password)
      dispatch({ type: "LOGIN", payload: FAKE_USER });
    else toast.error("Email or Password is not correct");
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
