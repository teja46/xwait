import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./StoreDetailsModal.scss";
import getServices from "../../dbCalls/getServices";
import LoadingOverlay from "react-loading-overlay";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal";
import DisplayStoreFeedback from "../DisplayStoreFeedback/DisplayStoreFeedback";
import StarRatingComponent from "react-star-rating-component";

export default function StoreDetailsModal(props) {
  const [services, setServices] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [serviceDetails, setServiceDetails] = React.useState();
  const [showBooking, setShowBooking] = React.useState(false);
  const [showReviews, setShowReviews] = React.useState(false);
  const [reviewCount, setReviewCount] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      getServices(props.storeDetails.id)
        .then(res => {
          console.log(res);
          setServices(res.data.serviceTypes);
          setReviewCount(res.data.reviews);
          setLoader(false);
        })
        .catch(err => {
          alert(err);
        });
    }
    fetchData();
  }, [props.storeDetails.id]);

  const showBookingModal = service => {
    window.history.pushState({ page: "bookingModal" }, "title 3", "?page=1");
    setServiceDetails(service);
    setShowBooking(true);
  };

  const showReviewModal = () => {
    window.history.pushState({ page: "showReview" }, "title 4", "?page=1");
    setShowReviews(true);
  };

  const bookingSuccess = () => {
    setShowBooking(false);
    props.bookingSuccess();
  };

  return (
    <Modal
      id="store-details-show"
      show={true}
      onHide={() => props.close()}
      className="store-details"
      backdropClassName="store-details-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.storeDetails.name}</Modal.Title>
      </Modal.Header>
      <LoadingOverlay active={loader} spinner>
        <Modal.Body>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <div className="store-name">
                {props.storeDetails.name}{" "}
                <div className="store-rating d-flex">
                  <StarRatingComponent
                    value={props.storeDetails.rating}
                    tarCount={5}
                  />
                  <span className="ml-2">
                    {Math.floor(props.storeDetails.rating)} / 5
                  </span>
                </div>
              </div>
              <div className="store-address">
                {props.storeDetails.storeAddress}
              </div>
            </div>
            <div>
              <div>{props.storeDetails.storeRating}</div>
              <div className="store-timings">
                <div className="review-count" onClick={() => showReviewModal()}>
                  {reviewCount} Reviews
                </div>
                <span>{props.storeDetails.startTime}</span>-
                <span>{props.storeDetails.endTime}</span>
              </div>
            </div>
          </div>
          <div className="services-heading">Services</div>
          {services.length === 0 && !loader && (
            <div>Sorry!! No services found for this store</div>
          )}
          {services &&
            !loader &&
            services.map(service => (
              <div className="service-section d-flex align-items-end justify-content-between">
                <div>
                  <div className="service-name">
                    {service.serviceDetails.serviceType}
                  </div>
                  <div className="service-description">
                    {service.serviceDetails.serviceDescription}
                  </div>
                  <div className="price">
                    &#8377; {service.serviceDetails.bookingPrice}
                  </div>
                </div>
                <div>
                  <button
                    className="animated-button"
                    onClick={() => showBookingModal(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.close()}>
            Close
          </Button>
        </Modal.Footer>
        <SlotBookingModal
          showBooking={showBooking}
          userDetails={props.userDetails}
          userId={props.userId}
          service={serviceDetails}
          storeDetails={props.storeDetails}
          onHide={() => setShowBooking(false)}
          bookingSuccess={() => bookingSuccess()}
        />
        {showReviews && (
          <DisplayStoreFeedback
            showReviews={showReviews}
            storeDetails={props.storeDetails}
            userDetails={props.userDetails}
            hide={() => setShowReviews(false)}
          />
        )}
      </LoadingOverlay>
    </Modal>
  );
}
