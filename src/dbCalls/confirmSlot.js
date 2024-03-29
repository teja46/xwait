import axios from "axios";
import { apiUrl } from "../constants/constants";

const confirmSlot = async slotDetails => {
  const slotObj = {
    slotId: slotDetails.slotId,
    slotTime: slotDetails.slotTime,
    slotDate: slotDetails.slotDate,
    storeId: slotDetails.storeId,
    serviceId: slotDetails.serviceId,
    serviceType: slotDetails.serviceType,
    userId: slotDetails.userId,
    storeName: slotDetails.storeName,
    storeAddress: slotDetails.storeAddress,
    number: slotDetails.number,
    instructions: slotDetails.instructions,
    userName: slotDetails.userName,
    userEmail: slotDetails.userEmail,
    latitude: slotDetails.storeLatitude,
    longitude: slotDetails.storeLongitude
  };
  console.log(slotObj);
  const bookedSlot = await axios.post(`${apiUrl}/bookSlot`, slotObj);
  return bookedSlot;
};

export default confirmSlot;
