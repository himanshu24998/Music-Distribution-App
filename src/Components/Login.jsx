import "bootstrap/dist/css/bootstrap.min.css";
import "./Components_Css.css";
import { useState } from "react";
import Container from "./Container";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("user-info", JSON.stringify({ token: data.user }));
      localStorage.setItem("token", data.user);
      localStorage.setItem("email", email);
      window.location.href = "/dashboard/home"; // Redirect to the dashboard
    } else {
      alert("Please check your email and password");
    }

    console.log(data);
  }

  return (
    <Container>
      <div className="Sign-Up">
        <form onSubmit={loginUser}>
          <i className="bi bi-facebook facebook-logo"></i>
          <h1 className="h3 mb-3 fw-normal">Please Log-in</h1>

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

            <a href="/register">
              <p> Sign up</p>{" "}
            </a>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Log in
          </button>
          <br />
          <br />
        </form>
        <GoogleLogin name={"Log in"} />
      </div>
    </Container>
  );
};

export default Login;
