import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Stripe from "stripe";

import dotenv from "dotenv";
dotenv.config();

// Initializes Stripe API.
// https://stripe.com/docs/checkout/quickstart
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const getOrders = async (req, res) => {
  const { userName, email, products } = req.body;

  try {
    //
    // Creates a list array of products ordered ("lineItems").
    const lineItems = await Promise.all(
      products.map(async (product) => {
        // Fetch details of the item using its ID
        const item = await Item.findById(product._id);

        // The returned product object (its data structure and specific keys)
        // is based on Stripe's API.
        // API documentation :-
        // https://stripe.com/docs/api/checkout/sessions/create
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // 'unit_amount' is denominated in cents therefore we need to multiply 'item.price' by 100
          },
          quantity: product.count,
        };
      })
    );

    // Create a Stripe checkout session
    // Documentation :-
    // https://stripe.com/docs/checkout/quickstart
    // API notes :-
    // https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}`,
      line_items: lineItems, // Represents an array of items that the customer is purchasing.
    });

    // Creates and save a new entry (document) in the "order" collection
    // of the database.
    await Order.create({
      userName,
      products,
      stripeSessionId: session.id,
    });

    // Returns the session id (as a response body) to the frontend.
    // See "client\src\scenes\checkout\Checkout.jsx"
    res.status(200).json({ id: session.id });
    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
