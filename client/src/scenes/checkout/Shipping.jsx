import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  setIsSameAddress,
  isSameAddress,
}) => {
  return (
    <Box m="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress" // Represents the type of validation schema that is to be implemented.
          values={values.billingAddress} // "values" represents the "initialValues" object in "client\src\scenes\checkout\Checkout.jsx".
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      {/* CHECKBOX TO ENABLE/DISABLE SHIPPING FORM */}
      <Box>
        <FormControlLabel
          // The label that is associated to the control component
          // (as defined in the "control" prop below).
          label="Same for Shipping Address"
          // "control" prop is designed to receive a component that controls the
          // form (i.e. 'Checkbox' in this case). Typically the control components
          // are input elements like <Checkbox>, <Radio>, <Switch>, etc.
          control={
            <Checkbox
              checked={isSameAddress} // 'isSameAddress' is a boolean value
              value={isSameAddress}
              onChange={() => setIsSameAddress(!isSameAddress)}
            />
          }
        />
      </Box>

      {/* SHIPPING FORM */}
      {!isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress" // Represents the type of validation schema that is to be implemented.
            values={values.shippingAddress} // "values" represents the "initialValues" object in "client\src\scenes\checkout\Checkout.jsx".
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
