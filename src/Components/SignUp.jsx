import "bootstrap/dist/css/bootstrap.min.css";
import "./Components_Css.css";
import { useState } from "react";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const reponse = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await reponse.json();

    if (data.status === "ok") {
      navigate("/dashboard/home", { replace: true });
    }

    console.log(data);
  }

  return (
    <Container>
      <div className="Sign-Up">
        <form onSubmit={registerUser}>
          <i className="bi bi-facebook facebook-logo"></i>
          <h1 className="h3 mb-3 fw-normal">Please Sign-up</h1>

          <div className="form-floating">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              data-temp-mail-org="0"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="column-flex">
            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>

            <a href="/login">
              <p> Log in </p>
            </a>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign up
          </button>
          <br />
          <br />
        </form>
        <GoogleLogin name={"Sign Up"} />
      </div>
    </Container>
  );
};

export default SignUp;
