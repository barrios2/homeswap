import Property from "../models/Property.js";
import { validatePropertyFields } from "../models/Property.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { logError } from "../util/logging.js";

export const uploadProperty = async (req, res) => {
  const propertyData = req.body;

  const errors = validatePropertyFields(propertyData);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errors) });
  }

  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json({ success: true, newProperty });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to upload property, try again later",
    });
  }
};
