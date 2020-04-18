import React from "react";
import "./StoreCard.scss";
import ratnadeepImage from "../../assets/images/ratnadeep.png";
import ratingIcon from "../../assets/images/rating-icon.png";
import locationIcon from "../../assets/images/location-icon.png";
import timeIcon from "../../assets/images/time-icon.png";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal";
function StoreCard(props) {
  const [showBooking, setShowBooking] = React.useState(false);
  return (
    <div className="col-sm-12 col-md-4 card-section">
      <div className="store-card">
        <div className="row card-heading">
          <div className="col-3 d-flex align-items-start">
            <img
              src={ratnadeepImage}
              alt="store-logo"
              className="store-image"
            />
          </div>
          <div className="col-9 store-details">
            <div className="store-name">{props.storeDetails.name}</div>
            <div className="store-location">
              {props.storeDetails.storeAddress}
            </div>
            <div className="store-stats d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-between">
                <span className="store-rating d-flex align-items-center justify-content-between">
                  <img src={ratingIcon} alt="rating" className="icons" />{" "}
                  <span className="ratingDigit">4.2</span>
                </span>
                <span className="store-distance d-flex align-items-center justify-content-between">
                  <img src={locationIcon} alt="rating" className="icons" />{" "}
                  <span className="ratingDigit">5 kms</span>
                </span>
              </div>
              <div className="store-timings d-flex">
                <img src={timeIcon} alt="rating" className="icons" />
                <span className="timing">10am - 6pm</span>
              </div>
            </div>
            <div className="store-description">
              <div className="store-serve-items">Cafe, fastfood, deserts</div>
            </div>
          </div>
        </div>
        <div className="card-action d-flex justify-content-between align-items-center">
          <div className="sponsored-section">Sponsored</div>
          <div className="booknow-section">
            <button onClick={() => setShowBooking(true)}>Book Now</button>
          </div>
        </div>
      </div>

      {
        <SlotBookingModal
          showBooking={showBooking}
          storeDetails={props.storeDetails}
          onHide={() => setShowBooking(false)}
          confirm={() => setShowBooking(false)}
        />
      }
    </div>
  );
}

export default StoreCard;
