import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import sendContactDetails from "../../dbCalls/sendContactDetails";
import LoadingOverlay from "react-loading-overlay";
import { backIcon } from "../../assets/imageFiles";

export default function ContactUs(props) {
  const [queryType, setQueryType] = React.useState("Enquiry");
  const [userName, setUserName] = React.useState(props.userDetails.name);
  const [userEmail, setUserEmail] = React.useState(props.userDetails.email);
  const [userNumber, setUserNumber] = React.useState();
  const [userMessage, setUserMessage] = React.useState();
  const [loader, setLoader] = React.useState(false);

  const sendContactInfo = () => {
    const contactObj = {
      queryType,
      userName,
      userEmail,
      userNumber,
      userMessage
    };
    setLoader(true);
    sendContactDetails(contactObj)
      .then(res => {
        setLoader(false);
        alert("Thank you for contacting us! We will reach out to you soon!");
        props.onHide();
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });
  };
  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
      <LoadingOverlay active={loader} spinner>
        <Modal.Header>
          <img
            src={backIcon}
            className="back-icon"
            alt="back"
            onClick={() => props.onHide()}
          />
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {queryType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setQueryType("Enquiry")}>
                Enquiry
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setQueryType("Register Business")}>
                Register Business
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setQueryType("Give Feedback")}>
                Give Feedback
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form autoComplete="off">
            <Form.Group controlId="formBasicName">
              <Form.Control
                type="name"
                placeholder="Name"
                value={props.userDetails.name}
                onChange={e => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={props.userDetails.email}
                onChange={e => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="number"
                placeholder="Phone Number"
                onChange={e => setUserNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMessage">
              <Form.Control
                as="textarea"
                placeholder="Your Message"
                maxLength="300"
                rows="4"
                onChange={e => setUserMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={() => sendContactInfo()}>
            Contact Us
          </Button>
        </Modal.Body>
      </LoadingOverlay>
    </Modal>
  );
}
