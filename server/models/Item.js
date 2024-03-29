import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Pasta", "Oil", "Ingredients"],
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
