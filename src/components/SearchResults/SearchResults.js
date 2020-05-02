import React from "react";
import { Modal, Button } from "react-bootstrap";
import StoreCard from "../StoreCard/StoreCard";

export default function SearchResults(props) {
  console.log(props);
  window.history.pushState(
    { page: "showMyBookingModal" },
    "title 1",
    "?page=1"
  );
  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Search Results for "{props.searchText}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.stores &&
          props.stores.length === 0 &&
          "Sorry!! No Results Found!!"}
        {props.stores &&
          props.stores.map((store, id) => (
            <StoreCard
              key={id}
              storeDetails={store}
              userDetails={props.userDetails}
              userId={props.userId}
              showToast={() => props.setShowToast(true)}
            />
          ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
