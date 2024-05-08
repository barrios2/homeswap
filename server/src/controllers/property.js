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

export const getProperties = async (req, res) => {
  try {
    //for pagination:
    const limit = parseInt(req.query.limit, 10) || 6;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const { country, city, type, bedrooms, amenities /*availability*/ } =
      req.query;
    let filter = {};

    if (country)
      filter["address.country"] = { $regex: new RegExp(`^${country}$`, "i") };
    if (city) filter["address.city"] = { $regex: new RegExp(`^${city}$`, "i") };
    if (type) filter.type = { $regex: new RegExp(`^${type}$`, "i") };
    if (bedrooms) filter.bedrooms = { $gte: parseInt(bedrooms, 10) };
    if (amenities) filter.amenities = { $in: amenities };

    const properties = await Property.find(filter).limit(limit).skip(offset);
    const total = await Property.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    if (properties.length === 0) {
      return res.status(404).json({
        success: true,
        msg: "No properties found",
        data: [],
        total,
        page: 0,
        totalPages,
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
      total,
      page,
      totalPages,
      // filterApplied: filter,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get properties, try again later",
    });
  }
};

export const viewProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        msg: "Property not found",
      });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Error retrieving property",
    });
  }
};
