import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
