import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./DisplayFeedback.scss";
import submitFeedback from "../../dbCalls/submitFeedback";
import LoadingOverlay from "react-loading-overlay";
import StarRatingComponent from "react-star-rating-component";

export default function DisplayFeedback({ hide, booking, show, userDetails }) {
  const [name, setName] = React.useState(userDetails.name);
  const [email, setEmail] = React.useState(userDetails.email);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [feedback, setFeedback] = React.useState();
  const [rating, setRating] = React.useState(0);
  const [loader, setLoader] = React.useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setLoader(true);
      const feedbackObj = {
        name,
        email,
        phoneNumber,
        feedback,
        storeId: booking.storeId,
        bookingId: booking.id,
        rating,
        photoURL: userDetails.photoURL
      };
      submitFeedback(feedbackObj)
        .then(res => {
          setLoader(false);
          alert("Feedback submitted successfully");
          hide();
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  return (
    <Modal
      show={show}
      rootClose={true}
      id="booking-modal-show"
      onHide={() => hide()}
      centered
      className="bookings-modal"
    >
      <LoadingOverlay active={loader} spinner>
        <Modal.Header closeButton>{booking.storeName}</Modal.Header>
        <Modal.Body>
          <div>{booking.storeName}</div>
          <div>{booking.storeAddress}</div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                required
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your number with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                as="textarea"
                placeholder="Your feedback"
                required
                rows="3"
                onChange={e => setFeedback(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStoreRating">
              <Form.Text className="text-muted">
                Please rate the store
              </Form.Text>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={nextValue => {
                  setRating(nextValue);
                }}
              />
            </Form.Group>
            <Button variant="secondary" onClick={() => hide()}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </LoadingOverlay>
    </Modal>
  );
}
