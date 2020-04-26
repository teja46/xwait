import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./StoreDetailsModal.scss";
import getServices from "../../dbCalls/getServices";
import LoadingOverlay from "react-loading-overlay";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal";

export default function StoreDetailsModal(props) {
  const [services, setServices] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [serviceDetails, setServiceDetails] = React.useState();
  const [showBooking, setShowBooking] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      getServices(props.storeDetails.id)
        .then(res => {
          console.log(res);
          setServices(res.data);
          setLoader(false);
        })
        .catch(err => {
          alert(err);
        });
    }
    fetchData();
  }, [props.storeDetails.id]);

  const showBookingModal = service => {
    setServiceDetails(service);
    setShowBooking(true);
  };

  const bookingSuccess = () => {
    setShowBooking(false);
    props.bookingSuccess();
  };

  return (
    <Modal
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
              <div className="store-name">{props.storeDetails.name}</div>
              <div className="store-address">
                {props.storeDetails.storeAddress}
              </div>
            </div>
            <div>
              <div>{props.storeDetails.storeRating}</div>
              <div className="store-timings">
                <span>{props.storeDetails.startTime}</span>
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
        {
          <SlotBookingModal
            showBooking={showBooking}
            userId={props.userId}
            service={serviceDetails}
            storeDetails={props.storeDetails}
            onHide={() => setShowBooking(false)}
            bookingSuccess={() => bookingSuccess()}
          />
        }
      </LoadingOverlay>
    </Modal>
  );
}
