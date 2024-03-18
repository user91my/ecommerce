"use strict";

// Initializes Stripe API.
// https://stripe.com/docs/checkout/quickstart
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// Strapi core controller for the "api::order.order" model.
module.exports = createCoreController(
  //
  "api::order.order",
  //
  // Controller method goes here.
  // https://docs.strapi.io/dev-docs/backend-customization/controllers
  // The "strapi" prop contains various services, models and utilities
  // that are part of the Strapi framework.
  ({ strapi }) => ({
    // Creating a CUSTOM controller action "create()".
    // Every controller action receives a context object ("ctx") as a parameter.
    // "ctx" contains information about the current HTTP request and response.
    async create(ctx) {
      // The request body (from the frontend) arises from calling the "makePayment"
      // function in "client\src\scenes\checkout\Checkout.jsx".
      // The 'requestBody' data structure can be seen there.
      // @ts-ignore
      const { products, userName, email } = ctx.request.body; // Destructure the request body from the frontend checkout.

      try {
        //
        // Creates a list array of products ordered ("lineItems").
        const lineItems = await Promise.all(
          products.map(async (product) => {
            // Fetch details of the item using its ID
            const item = await strapi
              .service("api::item.item") // Accessing the "item" model in the "api" plugin.
              .findOne(product.id); // Retrieves a single item from the database based on the id.

            // The returned product object (its data structure and specific keys) is based on Stripe's API.
            // API documentation :-
            // https://stripe.com/docs/api/checkout/sessions/create
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
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
          success_url: "http://localhost:3000/checkout/success",
          cancel_url: "http://localhost:3000",
          line_items: lineItems, // Represents an array of items that the customer is purchasing.
        });

        // Create a new entry (document) in the "order" collection of
        // the Strapi server.
        // NOTE: This is NOT AT ALL creating a new field named "data".
        // https://docs.strapi.io/dev-docs/api/entity-service/crud#create
        await strapi.service("api::order.order").create({
          data: { userName, products, stripeSessionId: session.id },
        });

        // Returns the session id (as a response body) to the frontend.
        // See "client\src\scenes\checkout\Checkout.jsx"
        return { id: session.id };
        //
      } catch (error) {
        ctx.response.status = 500;
        return {
          error: { message: "There was a problem creating the charge." },
        };
      }
    },
  })
);
