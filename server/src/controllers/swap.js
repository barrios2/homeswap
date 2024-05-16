import Swap from "../models/Swap.js";
import { validateSwapFields } from "../models/Swap.js";
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
      msg: "Unable to create swap request, try again later",
    });
  }
};
