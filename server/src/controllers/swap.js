import Swap from "../models/Swap.js";
import Property from "../models/Property.js";
import { validateSwapFields, isValidObjectId } from "../models/Swap.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const createSwapRequest = async (req, res) => {
  const swapRequestData = req.body;

  const errors = validateSwapFields(swapRequestData);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errors) });
  }

  // check if "Invalid" mongo ObjectId
  if (!isValidObjectId(swapRequestData.sender_propertyId)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid sender_propertyId" });
  }
  if (!isValidObjectId(swapRequestData.receiver_propertyId)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid receiver_propertyId" });
  }

  // check if the swapped propertiesId exist
  const senderPropertyExists = await Property.exists({
    _id: swapRequestData.sender_propertyId,
  });
  if (!senderPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid sender_propertyId" });
  }

  const receiverPropertyExists = await Property.exists({
    _id: swapRequestData.receiver_propertyId,
  });
  if (!receiverPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid receiver_propertyId" });
  }

  //check if the request exists
  const existingSwapRequest = await Swap.findOne({
    sender_propertyId: swapRequestData.sender_propertyId,
    receiver_propertyId: swapRequestData.receiver_propertyId,
    "swap_date.start": swapRequestData.swap_date.start,
    "swap_date.end": swapRequestData.swap_date.end,
  });
  if (existingSwapRequest) {
    return res
      .status(400)
      .json({ success: false, msg: "This swap request already exists" });
  }

  try {
    const newSwapRequest = await Swap.create(swapRequestData);
    res.status(201).json({ success: true, newSwapRequest });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "An unexpected error occurred, please try again later",
    });
  }
};
