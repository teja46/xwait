import React from "react";
import { backIcon } from "../../assets/imageFiles";
import { Modal } from "react-bootstrap";
import "./BookingConfirmed.scss";
import distance from "../../utils/distance";

export default function BookingConfirmed(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.close()}
      className="booking-confirmed"
    >
      <Modal.Header>
        <img
          src={backIcon}
          className="back-icon"
          alt="back"
          onClick={() => props.close()}
        />
        <Modal.Title>Booking Placed</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {props.bookingDetails && (
          <>
            <div>
              Congratulations your booking has been successfully placed.
            </div>
            <div>
              You will be notified when the store confirms your booking.
            </div>
            <div className="mt-4 mb-4">
              <div className="font-weight-bold">
                {props.bookingDetails.storeName}
              </div>
              <div>{props.bookingDetails.storeAddress}</div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-4 booking-slot-timing-section pt-2 pb-2">
                <div className="date-time">
                  <div>Date & Time</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.slotDate}
                  </div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.slotTime}
                  </div>
                </div>
                <div className="w-50 text-center">
                  <div>Booking ID</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.bookindId}
                  </div>
                </div>
              </div>
              <div className="text-center pb-4">
                {distance(
                  props.userLocation.latitude,
                  props.userLocation.longitude,
                  props.bookingDetails.storeLatitude,
                  props.bookingDetails.storeLongitude
                )}{" "}
                Km from your place{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://maps.google.com/?q=${props.bookingDetails.storeLatitude},${props.bookingDetails.storeLongitude}`}
                >
                  Open Maps
                </a>
              </div>
              <div className="border-top">
                <div className="border-bottom pt-2 pb-2">
                  <div>Booked For</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.userName}
                  </div>
                </div>
                <div className="border-bottom pt-2 pb-2">
                  <div>Booking Email</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.userEmail}
                  </div>
                </div>
                <div className="border-bottom pt-2 pb-2">
                  <div>Booking Phone</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.phoneNumber}
                  </div>
                </div>
              </div>
              <div>
                <div>Give Feedback</div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
