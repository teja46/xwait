import React from "react";
import { Modal } from "react-bootstrap";
import ratnadeepImage from "../../assets/images/ratnadeep.png";
import "./SlotBookingModal.scss";
import DatePicker from "react-horizontal-datepicker";
import getSlots from "../../dbCalls/getSlots";
import confirmSlot from "../../dbCalls/confirmSlot";
import moment from "moment";
import { sortSlotDetails } from "../../utils/utils";
import LoadingOverlay from "react-loading-overlay";
function SlotBookingModal(props) {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [slotDetails, setSlotDetails] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState();
  const [loader, setLoader] = React.useState(true);
  const selectedDay = val => {
    let dt = new Date(val);
    dt.setHours(0, 0, 0, 0);
    setLoader(true);
    getSlots(props.storeDetails.id, dt.toISOString())
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
    setLoader(true);
    const slotDetails = {
      slotId: slotData.slotId,
      slotTime: slotData.data.slotTime,
      slotDate: slotData.data.slotDate,
      storeId: slotData.data.storeId,
      storeName: storeDetails.name,
      storeAddress: storeDetails.storeAddress,
      userId: props.userId
    };
    confirmSlot(slotDetails)
      .then(res => {
        setShowConfirmation(false);
        alert("Booking Successful");
        props.onHide();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });
  };

  const showConfirmationModal = slotData => {
    setShowConfirmation(true);
    setSelectedSlot(slotData);
  };
  const isDisabled = slotDateISO => {
    let slotDateStr = moment(slotDateISO).toDate();
    let today = moment();
    const shouldDisable = moment(today).isAfter(slotDateStr);
    console.log(shouldDisable);
    return shouldDisable;
  };

  return (
    <div className="slot-booking">
      {props.showBooking && (
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
          <LoadingOverlay active={loader} spinner>
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
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <LoadingOverlay active={loader} spinner>
          <div className="confirmation d-flex flex-column">
            <div className="confirmation-details d-flex flex-column">
              <div className="confirmation-heading">Confirm your booking</div>
              <hr />

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
                  {selectedSlot &&
                    moment(selectedSlot.data.slotDate).format("Do, MMMM YYYY")}
                </div>
                <div>
                  {selectedSlot &&
                    moment(selectedSlot.data.slotTime).format("hh:mm a")}
                </div>
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
