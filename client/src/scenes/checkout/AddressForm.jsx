import React from "react";
import { useMediaQuery, Box, TextField } from "@mui/material";
import { getIn } from "formik";

const AddressForm = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // "type" is either "billingAddress" or "shippingAddress".
  // "field" is one of the fields in "initialValues" object in "client\src\scenes\checkout\Checkout.jsx".
  // Returns formatted path values like the following :-
  // e.g. "billingAddress.firstName", "shippingAddress.firstName", etc.
  const formattedName = (field) => `${type}.${field}`;

  // "getIn()" is a Formik utility function to extract a deeply nested value from an object.
  // The "formattedName" string is a path denoted in dot syntax (e.g. "billingAddress.firstName")
  // in order to access object properties.
  // The path is based on the data structure defined in "initialValues" object
  // in "client\src\scenes\checkout\Checkout.jsx".
  // https://stackoverflow.com/questions/61206836/what-is-the-role-of-getin-with-formik

  // Returns a boolean indicating whether there's an error.
  const formattedError = (field) =>
    Boolean(
      // Checks whether the "formattedName(field)" path in "touched" object is true.
      getIn(touched, formattedName(field)) &&
        // Also, checks whether the "formattedName(field)" path in "errors" object is true.
        getIn(errors, formattedName(field))
    );

  // Returns an error message (as "helperText") from "errors" object.
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))" // Splits columns into 4 fractions with a min of 0 and max of 1fr.
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // If viewport is mobile,any immediate child divs will span 4 fractions.
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("firstName")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("firstName")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 2" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName("lastName")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("lastName")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("lastName")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 2" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("country")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("country")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("street1")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("street1")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 2" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (optional)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("street2")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("street2")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 2" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("city")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("city")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "span 2" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("state")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("state")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")} // the name attribute should match the field's path defined in "initialValues" object ("client\src\scenes\checkout\Checkout.jsx").
        error={formattedError("zipCode")} // Boolean indicating whether there is an error for this field.
        helperText={formattedHelper("zipCode")} // When 'error' prop is true, the error message is displayed in the 'helperText' area.
        sx={{ gridColumn: "1fr" }} // Note that Textfield will "span 2" if "isNonMobile", otherwise it'll "span 4" (see immediate parent "Box" container)
      />
    </Box>
  );
};

export default AddressForm;
