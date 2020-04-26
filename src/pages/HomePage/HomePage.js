import React from "react";
import "./HomePage.scss";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import StoreCard from "../../components/StoreCard/StoreCard";
import getStores from "../../dbCalls/getStores";
import getCategories from "../../dbCalls/getCategories";
import { Toast } from "react-bootstrap";
// import geoLocation from "../../location/geolocation";
import LoadingOverlay from "react-loading-overlay";
import debounce from "debounce";
import { filterResults } from "../../utils/utils";
import {
  allCategoriesIcon,
  hospitalsIcon,
  storesIcon,
  beautyIcon,
  restaurantIcon
} from "../../assets/imageFiles";

function HomePage(props) {
  const [stores, setStores] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [allCategories, setAllCategories] = React.useState([]);
  const [categoryType, setCategoryType] = React.useState("All Categories");
  const [showToast, setShowToast] = React.useState(false);
  // geoLocation();
  React.useEffect(() => {
    async function fetchData() {
      getStores()
        .then(res => {
          setStores(res.data);
          setAllCategories(res.data);
          setLoader(false);
        })
        .catch(err => {
          props.logout();
        });
    }
    fetchData();
  }, [props]);

  const searchFor = type => {
    setLoader(true);
    setCategoryType(type);
    getCategories(type)
      .then(res => {
        setStores(res.data);
        setLoader(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  const getAllCategories = () => {
    setLoader(true);
    setCategoryType("All Categories");
    getStores()
      .then(res => {
        setStores(res.data);
        setLoader(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  const debouncedFn = debounce(event => {
    let searchString = event.target.value;
    let res = filterResults(allCategories, searchString);
    setStores(res);
    setLoader(false);
  }, 800);

  const searchFields = event => {
    event.persist();
    setLoader(true);
    debouncedFn(event);
  };

  return (
    <LoadingOverlay active={loader} spinner>
      <div className="home-page">
        <div className="home-page-section">
          <div className="header-component">
            <HeaderComponent logout={props.logout} userId={props.userId} />
          </div>
          <div className="store-types d-flex flex-column justify-content-around">
            <div className="container">
              <input
                minLength={2}
                placeholder="Search Stores, Hospitals, Cafes and more"
                className="search-field"
                onChange={event => searchFields(event)}
              />
              <div className="d-flex align-items-center justify-content-around">
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => getAllCategories()}
                >
                  <div>
                    <img
                      className="store-image"
                      src={allCategoriesIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">All</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("stores")}
                >
                  <div>
                    <img
                      className="store-image"
                      src={storesIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Stores</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("hospitals")}
                >
                  <div>
                    <img
                      className="store-image"
                      src={hospitalsIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Hospitals</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("restaurants")}
                >
                  <div>
                    <img
                      className="store-image"
                      src={restaurantIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Restaurants</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("beauty")}
                >
                  <div>
                    <img
                      className="store-image"
                      src={beautyIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Beauty</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container showPlaces">
          <div className="all-places d-flex">{categoryType}</div>

          <div className="cards-section row d-flex justify-content-center">
            {stores.length === 0 && !loader && "Sorry!! No Results Found!!"}
            {stores.map((store, id) => (
              <StoreCard
                key={id}
                storeDetails={store}
                userId={props.userId}
                showToast={() => setShowToast(true)}
              />
            ))}{" "}
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          show={showToast}
          className="success-booking"
          onClose={() => setShowToast(false)}
          autohide
        >
          <Toast.Header closeButton={true}>
            <strong className="mr-auto">Booking Successful</strong>
          </Toast.Header>
          <Toast.Body>
            <div>
              Your booking has been successfully submitted to store. Please
              check under my bookings for booking status
            </div>
          </Toast.Body>
        </Toast>
      )}
    </LoadingOverlay>
  );
}

export default HomePage;
