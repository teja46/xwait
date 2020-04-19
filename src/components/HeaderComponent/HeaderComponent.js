import React from "react";
import xWaitLogo from "../../assets/images/xwaitblack-logo.png";
import userLogo from "../../assets/images/user-icon.png";
import "./HeaderComponent.scss";
import { Overlay, Button, Modal } from "react-bootstrap";
import getBookedSlots from "../../dbCalls/getBookedSlots";
import { getCookie } from "../../utils/utils";
import moment from "moment";
import redeemBooking from "../../dbCalls/redeemBooking";
import LoadingOverlay from "react-loading-overlay";

function HeaderComponent(props) {
  const userMenu = React.useRef(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showBookings, setShowBookings] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [bookings, setBookings] = React.useState();

  const getBookings = () => {
    setLoader(true);
    setShowBookings(true);
    getBookedSlots(getCookie("xwaitUsr"))
      .then(res => {
        console.log(res);
        setLoader(false);
        setBookings(res.data);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };

  const completeBooking = id => {
    setLoader(true);
    redeemBooking(id)
      .then(res => {
        setLoader(false);
        alert("Booking Redeemed");
        setShowBookings(false);
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });
  };

  return (
    <div className=" d-flex align-items-center justify-content-between container">
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
            <Button variant="link" onClick={() => getBookings()}>
              My Bookings
            </Button>
          </div>
          <div>
            <Button variant="link" onClick={() => props.logout()}>
              Logout
            </Button>
          </div>
        </div>
      </Overlay>
      <Modal
        show={showBookings}
        rootClose={true}
        onHide={() => setShowBookings(false)}
        centered
      >
        <LoadingOverlay active={loader} spinner>
          <div className="confirmation d-flex flex-column">
            <div className="confirmation-details d-flex flex-column">
              <div className="confirmation-heading">Your Bookings</div>
              <hr />
              <div>
                {bookings &&
                  bookings.map((booking, id) => (
                    <div className="booking-card" key={id}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="store-name">{booking.storeName}</div>
                          <div className="store-address">
                            {booking.storeAddress}
                          </div>
                          <div className="booking-time">
                            {moment(booking.slotDate).format("Do, MMMM YYYY")},{" "}
                            {booking.slotTime}
                          </div>
                        </div>
                        <div>
                          <div>Booking ID</div>
                          <div className="booking-id">{booking.bookingId}</div>
                        </div>
                      </div>
                      <div>
                        Booking Status:{" "}
                        <b>
                          {booking.bookingStatus
                            ? booking.slotCompleted
                              ? "Completed"
                              : "Accepted by store"
                            : "Pending"}
                        </b>
                      </div>
                      {!booking.slotCompleted && booking.bookingStatus && (
                        <div className="d-flex align-items-center justify-content-end booking-action">
                          {/* <Button variant="light">Cancel</Button> */}
                          <Button onClick={() => completeBooking(booking.id)}>
                            Redeem
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </Modal>
    </div>
  );
}

export default HeaderComponent;
