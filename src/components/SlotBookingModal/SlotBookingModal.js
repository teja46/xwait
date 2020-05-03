import React from "react";
import { Modal, Form } from "react-bootstrap";
import ratnadeepImage from "../../assets/images/ratnadeep.png";
import "./SlotBookingModal.scss";
import DatePicker from "react-horizontal-datepicker";
import getSlots from "../../dbCalls/getSlots";
import confirmSlot from "../../dbCalls/confirmSlot";
import { backIcon } from "../../assets/imageFiles";
import moment from "moment";
import { sortSlotDetails } from "../../utils/utils";
import LoadingOverlay from "react-loading-overlay";

function SlotBookingModal(props) {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [slotDetails, setSlotDetails] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState();
  const [loader, setLoader] = React.useState(true);
  const [number, setNumber] = React.useState();
  const [instructions, setInstructions] = React.useState();
  const [userName, setUserName] = React.useState(props.userDetails.name);
  const [userEmail, setUserEmail] = React.useState(props.userDetails.email);

  const selectedDay = val => {
    let dt = new Date(val);
    dt.setHours(0, 0, 0, 0);
    setLoader(true);
    getSlots(props.storeDetails.id, dt.toISOString(), props.service.serviceId)
      .then(slots => {
        const slotData = sortSlotDetails(slots.data.slots);
        console.log(slots);
        setSlotDetails(slotData);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const confirmBooking = (slotData, storeDetails) => {
    console.log(props);
    setLoader(true);
    const slotDetails = {
      slotId: slotData.slotId,
      slotTime: slotData.data.slotTime,
      slotDate: slotData.data.slotDate,
      serviceId: props.service.serviceId,
      serviceType: props.service.serviceDetails.serviceType,
      storeId: slotData.data.storeId,
      storeName: storeDetails.name,
      storeAddress: storeDetails.storeAddress,
      userId: props.userId,
      storeLatitude: props.storeDetails.latitude,
      storeLongitude: props.storeDetails.longitude,
      userName,
      userEmail,
      number,
      instructions
    };
    confirmSlot(slotDetails)
      .then(res => {
        setShowConfirmation(false);
        setLoader(false);
        props.bookingSuccess(res);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
        alert(err.message);
      });
  };

  const showConfirmationModal = slotData => {
    window.history.pushState(
      { page: "showConfirmation" },
      "title 5",
      "?page=1"
    );
    setShowConfirmation(true);
    setSelectedSlot(slotData);
  };

  const isDisabled = slotTime => {
    const slotTimeDate = moment(slotTime).toDate();
    const today = moment().toDate();
    return today > slotTimeDate;
  };

  return (
    <div className="slot-booking">
      {props.showBooking && (
        <Modal
          id="slot-booking-show"
          show={props.showBooking}
          centered
          onHide={() => props.onHide()}
          size="xl"
          className={`slot-selection-modal ${
            showConfirmation ? "confirmation-show" : ""
          }`}
          backdropClassName={`slot-booking slotbooking-backdrop ${
            showConfirmation ? "confirmation-show" : ""
          }`}
        >
          <LoadingOverlay active={loader} spinner>
            <Modal.Header>
              <img
                src={backIcon}
                className="back-icon"
                alt="back"
                onClick={() => props.onHide()}
              />
              <Modal.Title>Select Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-start modal-body">
              <div className="slot-card">
                <div>{props.service.serviceDetails.serviceType}</div>
                <div className="super-market-details d-flex align-items-center">
                  <div className="image-section">
                    <img
                      src={ratnadeepImage}
                      className="supermarket-logo"
                      alt="market-im"
                    />
                  </div>
                  <div className="store-address">
                    <div className="super-market-name">
                      {props.storeDetails.name}
                    </div>
                    <div className="super-market-location">
                      {props.storeDetails.storeAddress}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="date-picker">
                  <DatePicker
                    getSelectedDay={selectedDay}
                    labelFormat={"MMMM"}
                    color={"#374e8c"}
                  />
                </div>
                <div className="slots-spread">
                  {!loader &&
                    slotDetails.length === 0 &&
                    "Sorry!! No Slots found!!"}
                  {slotDetails &&
                    slotDetails.map((slot, id) => (
                      <button
                        onClick={() => showConfirmationModal(slot)}
                        key={id}
                        disabled={isDisabled(slot.data.slotTime)}
                      >
                        {moment(slot.data.slotTime).format("hh:mm a")}
                      </button>
                    ))}
                </div>
              </div>
            </Modal.Body>
          </LoadingOverlay>
        </Modal>
      )}
      <Modal
        show={showConfirmation}
        rootClose={true}
        id="show-confirmation-show"
        onHide={() => setShowConfirmation(false)}
        className="show-confirmation-modal"
        backdropClassName="show-confirmation-backdrop"
        centered
      >
        <LoadingOverlay active={loader} spinner>
          <div className="confirmation d-flex flex-column">
            <div className="confirmation-details d-flex flex-column">
              <Modal.Header>
                <img
                  src={backIcon}
                  className="back-icon"
                  alt="back"
                  onClick={() => setShowConfirmation(false)}
                />
                <Modal.Title>Confirm your booking</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                      {props.storeDetails.name}
                    </div>
                    <div className="super-market-location">
                      {props.storeDetails.storeAddress}
                    </div>
                  </div>
                </div>
                <div className="date-time">
                  <div>
                    Service:{" "}
                    {props.service &&
                      props.service.serviceDetails &&
                      props.service.serviceDetails.serviceType}
                  </div>
                  <div>
                    Booking Date:{" "}
                    {selectedSlot &&
                      moment(selectedSlot.data.slotDate).format(
                        "Do, MMMM YYYY"
                      )}
                  </div>
                  <div>
                    Booking Time:{" "}
                    {selectedSlot &&
                      moment(selectedSlot.data.slotTime).format("hh:mm a")}
                  </div>
                </div>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      placeholder="Your Email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNumber">
                    <Form.Control
                      type="number"
                      placeholder="Your number"
                      onChange={e => setNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formInstructions">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      maxLength={120}
                      placeholder="Any special Instructions to store?"
                      onChange={e => setInstructions(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Text className="text-muted">
                    By clicking on confirm booking you accept our terms and
                    conditions.
                  </Form.Text>
                </Form>
              </Modal.Body>
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
                onClick={() => confirmBooking(selectedSlot, props.storeDetails)}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </LoadingOverlay>
      </Modal>
    </div>
  );
}

export default SlotBookingModal;
