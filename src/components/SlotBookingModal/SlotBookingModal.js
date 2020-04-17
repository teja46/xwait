import React from "react";
import { Modal, Overlay } from "react-bootstrap";
import ratnadeepImage from "../../assets/images/ratnadeep.png";
import "./SlotBookingModal.scss";
import DatePicker from "react-horizontal-datepicker";

function SlotBookingModal(props) {
  const target = React.useRef(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const selectedDay = val => {
    console.log(val);
  };
  const confirmBooking = () => {
    setShowConfirmation(false);
    props.onHide();
  };
  return (
    <div className="slot-booking">
      <Modal
        show={props.showBooking}
        centered
        onHide={props.onHide}
        size="xl"
        className={`slot-selection-modal ${
          showConfirmation ? "confirmation-show" : ""
        }`}
        backdropClassName={`slot-booking ${
          showConfirmation ? "confirmation-show" : ""
        }`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a time slot</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-start modal-body">
          <div className="slot-card">
            <div className="super-market-details d-flex align-items-center">
              <div className="image-section">
                <img
                  src={ratnadeepImage}
                  className="supermarket-logo"
                  alt="market-im"
                />
              </div>
              <div className="store-address">
                <div className="super-market-name">Ratnadeep Super Market</div>
                <div className="super-market-location">
                  Jubilee Hills, Hyderabad
                </div>
              </div>
            </div>
            <div className="date-picker">
              <DatePicker
                getSelectedDay={selectedDay}
                labelFormat={"MMMM"}
                color={"#374e8c"}
              />
            </div>
            <div className="slots-spread">
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
              <button onClick={() => setShowConfirmation(true)}>
                10:30 am
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer ref={target}>
          <Overlay
            target={target.current}
            show={showConfirmation}
            rootClose={true}
            onHide={() => setShowConfirmation(false)}
            placement="top"
          >
            <div className="confirmation d-flex flex-column justify-content-end">
              <div className="confirmation-details">
                <div className="confirmation-heading">Confirm your booking</div>

                <div className="super-market-details d-flex align-items-start">
                  <div className="image-section">
                    <img
                      src={ratnadeepImage}
                      className="supermarket-logo"
                      alt="market-im"
                    />
                  </div>
                  <div className="store-address">
                    <div className="super-market-name">
                      Ratnadeep Super Market
                    </div>
                    <div className="super-market-location">
                      Jubilee Hills, Hyderabad
                    </div>
                  </div>
                </div>
                <div className="date-time">
                  <div>9th December, 2020</div>
                  <div>10:30 AM</div>
                </div>
              </div>
              <div className="confirm-action">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  className="confirm-btn"
                  onClick={() => confirmBooking()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Overlay>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SlotBookingModal;
