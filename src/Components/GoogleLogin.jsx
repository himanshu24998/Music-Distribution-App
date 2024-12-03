import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";

const GoogleLogin = ({ name }) => {
  const navigate = useNavigate();
  const responseGoogle = async (authresult) => {
    try {
      if (authresult["code"]) {
        const result = await googleAuth(authresult["code"]);
        const { email, name } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token };
        localStorage.setItem("user-info", JSON.stringify(obj));

        const user_id = result.data.user._id;
        console.log("result data", result.data.user);
        console.log("token", token);
        navigate("/dashboard/home");
        localStorage.setItem("user_id", user_id);
      }
      console.log(authresult);
    } catch (error) {
      console.log("error is", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: () => responseGoogle,
    flow: "auth-code",
  });

  return (
    <button className="btn btn btn-danger w-100 py-2" onClick={googleLogin}>
      <i className="bi bi-google google"></i>
      {name} with Google
    </button>
  );
};

const clientId =
  "940140076735-amnlr8584m0nrdu2s3ju5e3cu69t1om4.apps.googleusercontent.com";

const WrappedGoogleLogin = (props) => (
  <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin {...props} />
  </GoogleOAuthProvider>
);

export default WrappedGoogleLogin;
