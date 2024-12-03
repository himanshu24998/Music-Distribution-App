import Container from "./Components/Container";
import SignUp from "./Components/SignUp";
import "./Components/Components_Css.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import GoogleLogin from "./Components/GoogleLogin";
import WrappedGoogleLogin from "./Components/GoogleLogin";

function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
