import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { shades } from "../../theme";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0); // Stepper starts at 0
  const [isSameAddress, setIsSameAddress] = useState(true);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  // "values" parameter refers to "initialValues" object.
  // "actions" parameter is an object containing Formik props and methods (e.g. setFieldValue, setTouched, etc.) :-
  // https://formik.org/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({}); // Resets the validation (everytime before going onto the next step).
  };

  const makePayment = async (values) => {
    //
    // Loading Stripe
    const stripe = await stripePromise;

    // "requestBody" follows the schema of "order" collection.
    // The "order" collection is inside the strapi server.
    const requestBody = {
      userName: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
      ].join(" "),
      email: values.email,
      // "cart.map()" returns an array of objects each only containing '_id' and 'count' keys.
      products: cart.map(({ _id, count }) => ({
        _id,
        count,
      })),
    };

    // Makes the API call to "order" collection in strapi server.
    // Directory of the server file which handles the "requestBody" :-
    //     "server\controllers\orders.js"
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    // The response (from the backend; see "server\controllers\orders.js")
    // will be in the form of a session id object :-
    //     { id: session.id }
    const session = await response.json();

    // Redirect to Checkout (a Stripe-hosted page to securely
    // collect payment information).
    // https://stripe.com/docs/js/deprecated/redirect_to_checkout
    // Redirects to a Stripe's test checkout page. Use the test
    // card number below to trigger payment success :-
    //      4242424242424242
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <Box width="80%" m="100px auto">
      {/* STEPPER */}
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billings</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      {/* FORM */}
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {/* Inside the Formik component, several props from Formik */}
          {/* are destructured (i.e. values, errors, etc.) as arguments. */}
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* If "isFirstStep", show BILLING/SHIPPING FORM  */}
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setIsSameAddress={setIsSameAddress}
                  isSameAddress={isSameAddress}
                />
              )}

              {/* If "isSecondStep", show CONTACT FORM (email, phone number) */}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              {/* BUTTONS SECTION */}
              {/* Buttons appear depending on whether "isFirstStep" or "isSecondStep" */}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {/* 'BACK' button */}
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                {/* 'NEXT' / 'PLACE ORDER' buttons */}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                  onClick={() => {
                    // Copies the billing address onto shipping address.
                    if (isFirstStep && isSameAddress) {
                      values.shippingAddress = { ...values.billingAddress };
                    }
                    console.log(values);
                  }}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
