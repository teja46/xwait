import axios from "axios";
import { apiUrl } from "../constants/constants";

const getBookedSlots = async userId => {
  const slotDetails = await axios.get(`${apiUrl}/bookedSlots/${userId}`);
  return slotDetails;
};

export default getBookedSlots;
