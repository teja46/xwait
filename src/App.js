import React from "react";
import "./App.scss";
import xWaitLogo from "./assets/images/xwaitblack-logo.png";
import googleLogo from "./assets/images/google-logo.png";
import { Button } from "react-bootstrap";
import googleLogin from "./login/googleLogin";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [showHome, setShowHome] = React.useState(false);
  const loginWithGoogle = () => {
    googleLogin()
      .then(res => {
        console.log(res);
        setShowHome(true);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="app">
      {showHome && (
        <>
          <header>
            <div className="mobile-header d-sm-flex d-xs-flex d-md-none d-lg-none"></div>
          </header>
          <div className="app-login-body">
            <div className="mobile-logo d-flex justify-content-center">
              <img src={xWaitLogo} alt="x-wait-logo" />
            </div>
            <div className="login-button-controls d-flex justify-content-center">
              {/* <Button className="signup-btn" variant="outline-secondary">
            Signup
          </Button> */}
              <Button
                className="login-btn d-flex justify-content-between align-items-center"
                variant="outline-secondary"
                onClick={() => loginWithGoogle()}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="google-logo"
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        </>
      )}
      {!showHome && <HomePage showBooking={showHome} />}
    </div>
  );
}

export default App;
