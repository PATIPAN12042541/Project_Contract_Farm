import Plants from "../models/Plant_M.js";

export const getPlant = async (req, res) => {
  try {
    res.json(Plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};
