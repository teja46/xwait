import React from "react";
import "./HomePage.scss";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import StoreCard from "../../components/StoreCard/StoreCard";
import getStores from "../../dbCalls/getStores";

function HomePage(props) {
  // const mapsAPI = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
  // if (navigator.geolocation) {
  // navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  // x.innerHTML = "Geolocation is not supported by this browser.";
  // }
  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      getStores()
        .then(res => {
          setStores(res.data);
        })
        .catch(err => {
          props.logout();
        });
    }
    fetchData();
  }, [props]);

  return (
    <div className="home-page">
      <div className="home-page-section">
        <div className="header-component">
          <HeaderComponent logout={props.logout} />
        </div>
        <div className="store-types d-flex flex-column justify-content-around">
          <div className="container">
            <input
              type="text"
              placeholder="Search Stores, Hospitals, Cafes and more"
            />
            <div className="d-flex align-items-center justify-content-around">
              <div className="d-flex align-items-center flex-column">
                <div>
                  <div className="store-image" />
                </div>
                <div className="titles">Stores</div>
              </div>
              <div className="d-flex align-items-center flex-column">
                <div>
                  <div className="store-image" />
                </div>
                <div className="titles">Hospitals</div>
              </div>
              <div className="d-flex align-items-center flex-column">
                <div>
                  <div className="store-image" />
                </div>
                <div className="titles">Restaurants</div>
              </div>
              <div className="d-flex align-items-center flex-column">
                <div>
                  <div className="store-image" />
                </div>
                <div className="titles">Beauty</div>
              </div>
              <div className="d-flex align-items-center flex-column">
                <div>
                  <div className="store-image" />
                </div>
                <div className="titles">All</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container showPlaces">
        <div className="all-places d-flex">All Places</div>

        <div className="cards-section row d-flex justify-content-center">
          {stores.map((store, id) => (
            <StoreCard key={id} storeDetails={store} />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
