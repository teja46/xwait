import React from "react";
import "./StoreCard.scss";
import ratnadeepImage from "../../assets/images/ratnadeep.png";
import locationIcon from "../../assets/images/location-icon.png";
import timeIcon from "../../assets/images/time-icon.png";
import StoreDetailsModal from "../StoreDetailsModal/StoreDetailsModal";
import StarRatingComponent from "react-star-rating-component";
import getDistance from "../../utils/distance";
import { ellipsifyText } from "../../utils/utils";

function StoreCard(props) {
  const [showStoreDetailsModal, setShowStoreDetailsModal] = React.useState(
    false
  );

  const displayShowDetailsModal = () => {
    window.history.pushState(
      { page: "showStoreDetails" },
      "title 2",
      "?page=1"
    );
    setShowStoreDetailsModal(true);
  };

  const bookingSuccess = res => {
    console.log(res);
    setShowStoreDetailsModal(false);
    props.showToast(res);
  };
  return (
    <div className="col-sm-12 col-md-6 col-xs-12 col-lg-6 card-section">
      <div className="store-card">
        <div
          className="row card-heading"
          onClick={() => displayShowDetailsModal()}
        >
          <div className="col-3 d-flex align-items-start">
            <img
              src={ratnadeepImage}
              alt="store-logo"
              className="store-image"
            />
          </div>
          <div className="col-9 store-details">
            <div className="store-name" title={props.storeDetails.name}>
              {ellipsifyText(props.storeDetails.name, 20)}
            </div>
            <div
              className="store-location"
              title={props.storeDetails.storeAddress}
            >
              {ellipsifyText(props.storeDetails.storeAddress, 30)}
            </div>
          </div>

          <div className="store-desc">
            <div className="store-stats d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-between store-rating-distance ">
                <div className="store-rating d-flex align-items-center justify-content-between">
                  <StarRatingComponent value={1} starCount={1} name="comp2" />
                  <span>{props.storeDetails.rating} / 5</span>
                </div>
                <span className="store-distance d-flex align-items-center justify-content-between">
                  <img src={locationIcon} alt="rating" className="icons" />{" "}
                  <span className="ratingDigit">
                    {getDistance(
                      props.userLocation.latitude,
                      props.userLocation.longitude,
                      props.storeDetails.latitude,
                      props.storeDetails.longitude
                    )}{" "}
                    km
                  </span>
                </span>
              </div>
              <div className="store-timings d-flex align-items-center">
                <img src={timeIcon} alt="rating" className="icons" />
                <span className="timing">
                  {props.storeDetails.startTime} - {props.storeDetails.endTime}
                </span>
              </div>
            </div>
          </div>
          <div className="store-description">
            <div className="store-serve-items">Cafe, fastfood, deserts</div>
          </div>
        </div>
        <div className="card-action d-flex justify-content-between align-items-center">
          <div className="sponsored-section">Sponsored</div>
          <button
            className="animated-button"
            onClick={() => displayShowDetailsModal()}
          >
            Book Slot
          </button>
        </div>
      </div>

      {showStoreDetailsModal && (
        <StoreDetailsModal
          storeDetails={props.storeDetails}
          userDetails={props.userDetails}
          userId={props.userId}
          close={() => setShowStoreDetailsModal(false)}
          bookingSuccess={res => bookingSuccess(res)}
        />
      )}
    </div>
  );
}

export default StoreCard;
