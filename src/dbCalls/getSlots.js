import axios from "axios";
import { apiUrl } from "../constants/constants";

const getSlots = async (storeId, date) => {
  const slotDetails = await axios.get(`${apiUrl}/slots/${storeId}/${date}`);
  return slotDetails;
};

export default getSlots;
