import React from "react";
import xWaitLogo from "../../assets/images/xwaitblack-logo.png";
import userLogo from "../../assets/images/user-icon.png";
import "./HeaderComponent.scss";
import { Overlay, Button } from "react-bootstrap";

function HeaderComponent() {
  const userMenu = React.useRef(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  return (
    <div className="header-component d-flex align-items-center justify-content-between">
      <div className=" d-flex align-items-center justify-content-between">
        <img src={xWaitLogo} alt="x-wait-img" className="x-wait-logo" />
        <div>Hyderabad</div>
      </div>
      <div>
        <img
          src={userLogo}
          alt="user"
          className="user-logo"
          ref={userMenu}
          onClick={() => setShowOverlay(true)}
        />
      </div>
      <Overlay
        target={userMenu.current}
        show={showOverlay}
        rootClose={true}
        onHide={() => setShowOverlay(false)}
        placement="bottom"
      >
        <div className="text-center user-menu">
          <div>
            <Button variant="link">My Bookings</Button>
          </div>
          <div>
            <Button variant="link">Logout</Button>
          </div>
        </div>
      </Overlay>
    </div>
  );
}

export default HeaderComponent;
