import axios from "axios";
import { apiUrl } from "../constants/constants";

const cancelBooking = async slotDetails => {
  const obj = {
    userId: slotDetails.userId,
    slotId: slotDetails.slotId
  };
  const cancelBooking = await axios.post(`${apiUrl}/cancelBooking`, obj);
  return cancelBooking;
};

export default cancelBooking;
