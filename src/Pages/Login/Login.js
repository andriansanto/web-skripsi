import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div class="container">
      <div class="wrapper">
        <div class="title"><span>Login Form</span></div>
        <form onSubmit={e => e.preventDefault()}>
          <div class="row">
            <i class="fas fa-user"></i>
            <input
              type="text"
              className="login__textBox"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Secret ID"
            />
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div class="row button">
            <input
              type="submit"
              className="login__btn"
              onClick={() => logInWithEmailAndPassword(secret, password)}
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );

}
export default Login;