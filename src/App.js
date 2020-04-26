import React from "react";
import "./App.scss";
import xWaitLogo from "./assets/images/xwaitblack-logo.png";
import googleLogo from "./assets/images/google-logo.png";
import { Button } from "react-bootstrap";
import { googleLogin, appLogout } from "./login/googleLogin";
import HomePage from "./pages/HomePage/HomePage";
import updateUserToken from "./dbCalls/updateUserToken";
import firebase from "firebase";
import LoadingOverlay from "react-loading-overlay";

function App() {
  const [showHome, setShowHome] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [userId, setUserId] = React.useState();

  const loginWithGoogle = () => {
    setLoader(true);
    googleLogin()
      .then(res => {
        setShowHome(true);
        setLoader(false);
      })
      .catch(err => alert(err.message));
  };
  const updateToken = (userId, token) => {
    updateUserToken(userId, token)
      .then(res => {
        console.log("updated");
      })
      .catch(err => {
        console.log("Error!!");
      });
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setShowHome(true);
        setLoader(false);
        setUserId(user.uid);
        const messaging = firebase.messaging();
        messaging
          .requestPermission()
          .then(() => {
            return messaging.getToken();
          })
          .then(token => {
            console.log(token);
            updateToken(user.uid, token);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setShowHome(false);
        setLoader(false);
      }
    });
  }, []);

  const logout = () => {
    appLogout();
    setShowHome(false);
  };
  return (
    <LoadingOverlay active={loader} spinner>
      <div className="app">
        {!showHome && (
          <>
            <header>
              <div className="mobile-header d-sm-flex d-xs-flex d-md-none d-lg-none"></div>
            </header>
            <div className="app-login-body">
              <div className="mobile-logo d-flex justify-content-center">
                <img src={xWaitLogo} alt="x-wait-logo" />
              </div>
              <div className="login-button-controls d-flex justify-content-center">
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
        {showHome && (
          <HomePage
            showBooking={showHome}
            logout={() => logout()}
            userId={userId}
          />
        )}
      </div>
    </LoadingOverlay>
  );
}

export default App;
