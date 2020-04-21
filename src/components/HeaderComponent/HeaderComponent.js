import React from "react";
import xWaitLogo from "../../assets/images/xwaitblack-logo.png";
import userLogo from "../../assets/images/user-icon.png";
import "./HeaderComponent.scss";
import { Overlay, Button, Modal, Nav } from "react-bootstrap";
import getBookedSlots from "../../dbCalls/getBookedSlots";
import moment from "moment";
import redeemBooking from "../../dbCalls/redeemBooking";
import cancelBooking from "../../dbCalls/cancelBooking";
import LoadingOverlay from "react-loading-overlay";

function HeaderComponent(props) {
  const userMenu = React.useRef(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showBookings, setShowBookings] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [bookings, setBookings] = React.useState();
  const getBookings = type => {
    setLoader(true);
    setShowBookings(true);
    getBookedSlots(props.userId, type)
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
  const cancel = booking => {
    setLoader(true);
    cancelBooking(booking)
      .then(res => {
        setLoader(false);
        alert("Booking Cancelled");
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
            <Button variant="link" onClick={() => getBookings("Current")}>
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
        className="bookings-modal"
      >
        <LoadingOverlay active={loader} spinner>
          <Modal.Header closeButton>
            <h3 className="confirmation-heading">Your Bookings</h3>
          </Modal.Header>
          <div className="confirmation d-flex flex-column">
            <div className="tabs-pane">
              <Nav justify variant="tabs" defaultActiveKey="/current">
                <Nav.Item>
                  <Nav.Link
                    eventKey="/current"
                    onClick={() => getBookings("Current")}
                  >
                    Current Bookings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="/history"
                    onClick={() => getBookings("History")}
                  >
                    History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="confirmation-details d-flex flex-column">
              <div>
                {bookings && !bookings.length && (
                  <div>Sorry!! You don't have any items booked</div>
                )}
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
                            {moment(booking.slotTime).format("hh:mm a")}
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
                          <span>{booking.bookingStatus}</span>
                        </b>
                      </div>
                      <div className="d-flex align-items-center justify-content-end booking-action">
                        {booking.bookingStatus !== "Cancelled" &&
                          booking.bookingStatus !== "Redeemed" && (
                            <div className="cancel-booking">
                              <Button onClick={() => cancel(booking)}>
                                Cancel Booking
                              </Button>
                            </div>
                          )}
                        {booking.bookingStatus === "Accepted" && (
                          <div>
                            <Button onClick={() => completeBooking(booking.id)}>
                              Redeem Booking
                            </Button>
                          </div>
                        )}
                      </div>
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
