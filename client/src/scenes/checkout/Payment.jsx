import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email <Enter the proper email format (i.e. xxxx@xxxx.com)>"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email" // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
          error={!!touched.email && !!errors.email} // Boolean indicating whether there is an error for this field. "!!" converts values into boolean.
          helperText={touched.email && errors.email} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber" // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
          error={!!touched.phoneNumber && !!errors.phoneNumber} // Boolean indicating whether there is an error for this field. "!!" converts values into boolean.
          helperText={touched.phoneNumber && errors.phoneNumber} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
