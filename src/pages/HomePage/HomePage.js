import React from "react";
import "./HomePage.scss";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import StoreCard from "../../components/StoreCard/StoreCard";
import getStores from "../../dbCalls/getStores";

function HomePage() {
  // const mapsAPI = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   x.innerHTML = "Geolocation is not supported by this browser.";
  // }
  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await getStores();
      setStores(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="home-page container">
      <div className="home-page-section">
        <div className="header-component">
          <HeaderComponent />
        </div>
        <div className="store-types d-flex flex-column justify-content-around">
          <input
            type="text"
            placeholder="Search Stores, Hospitals, Cafes and more"
          />
          <div className="d-flex align-items-center justify-content-around">
            <div className="d-flex align-items-center flex-column">
              <div>
                <div className="store-image" />
              </div>
              <div>Stores</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>
                <div className="store-image" />
              </div>
              <div>Hospitals</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>
                <div className="store-image" />
              </div>
              <div>Restaurants</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>
                <div className="store-image" />
              </div>
              <div>Beauty</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>
                <div className="store-image" />
              </div>
              <div>All</div>
            </div>
          </div>
        </div>
        <div className="all-places d-flex">All Places</div>
      </div>
      <div className="cards-section row d-flex justify-content-center">
        {stores.map((store, id) => (
          <StoreCard key={id} storeDetails={store} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
