import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
    else toast.error("please enter Email and Password");
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/bookmarks", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer ">
      <h2>Login</h2>
      <form onSubmit={submitHandler} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="text"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
