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

  // check if the swapped propertiesId exist in Property Collection
  const senderPropertyExists = await Property.exists({
    _id: swapRequestData.sender_propertyId,
  });
  if (!senderPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "This sender_propertyId does not exist" });
  }

  const receiverPropertyExists = await Property.exists({
    _id: swapRequestData.receiver_propertyId,
  });
  if (!receiverPropertyExists) {
    return res
      .status(400)
      .json({ success: false, msg: "This receiver_propertyId does not exist" });
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

export const getSwapRequest = async (req, res) => {
  if (req.params.id !== req.userData.id) {
    return res.status(401).json({
      success: false,
      msg: "You cannot view requests list of other users!",
    });
  } else {
    try {
      const userProperties = await Property.find({ userRef: req.userData.id });

      const propertyIds = userProperties.map((prop) => prop._id); //extract propertyIds

      const swapRequests = await Swap.find({
        receiver_propertyId: {
          $in: propertyIds,
        },
      }).populate({
        path: "sender_propertyId",
        select: "title type address bedrooms bathrooms photos",
      });

      if (swapRequests.length === 0) {
        return res.status(200).json({
          success: true,
          msg: "You have no requests",
        });
      }

      res.status(200).json({ success: true, data: swapRequests });
    } catch (error) {
      logError(error);
      res.status(500).json({ msg: "Error retrieving swap requests", error });
    }
  }
};
