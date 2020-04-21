// import axios from "axios";

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }

  function error(err) {
    console.log(err);
  }
};

export default getLocation;
