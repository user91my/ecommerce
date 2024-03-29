import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    stripeSessionId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
