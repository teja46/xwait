import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./DisplayFeedback.scss";
import submitFeedback from "../../dbCalls/submitFeedback";
import LoadingOverlay from "react-loading-overlay";

export default function DisplayFeedback({ hide, booking, show }) {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [feedback, setFeedback] = React.useState();
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
        bookingId: booking.id
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
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email Address"
                required
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
