import axios from "axios";
import { apiUrl } from "../constants/constants";

const confirmSlot = async slotDetails => {
  const slotObj = {
    slotId: slotDetails.slotId,
    slotTime: slotDetails.slotTime,
    slotDate: slotDetails.slotDate,
    storeId: slotDetails.storeId,
    userId: slotDetails.userId,
    storeName: slotDetails.storeName,
    storeAddress: slotDetails.storeAddress
  };
  const bookedSlot = await axios.post(`${apiUrl}/bookSlot`, slotObj);
  return bookedSlot;
};

export default confirmSlot;
