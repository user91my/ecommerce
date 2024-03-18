import React from "react";
import { useTheme, Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  const isMinWidth800px = useMediaQuery("(min-width:800px)");
  const isMinWidth600px = useMediaQuery("(min-width:600px)");
  const isMinWidth500px = useMediaQuery("(min-width:500px)");

  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light} minWidth="275px">
      <Box
        width="80%"
        margin="auto"
        display="flex"
        flexDirection={isMinWidth500px ? "row" : "column"}
        flexWrap={isMinWidth500px ? "wrap" : "nowrap"}
        alignItems={isMinWidth500px ? undefined : "center"}
        justifyContent={isMinWidth800px ? "space-between" : "space-around"}
        rowGap="40px"
        columnGap="40px"
      >
        {/* FIRST COLUMN */}
        <Box width={isMinWidth500px ? "30%" : "100%"}>
          <Typography
            variant="h4"
            fontFamily="Oswald, sans-serif"
            fontSize={isMinWidth600px ? "1.75rem" : "1.5rem"}
            mb="30px"
            color={shades.secondary[500]}
            textAlign={isMinWidth500px ? undefined : "center"}
          >
            MEDITERRANEA
          </Typography>
          <Box textAlign={isMinWidth500px ? undefined : "center"}>
            et tortor at risus viverra adipiscing at in tellus integer feugiat
            scelerisque varius morbi enim nunc faucibus a pellentesque sit amet
            porttitor eget dolor morbi non arcu risus quis varius quam quisque
            id diam vel
          </Box>
        </Box>

        {/* SECOND COLUMN */}
        <Box textAlign={isMinWidth500px ? undefined : "center"}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        {/* THIRD COLUMN */}
        <Box textAlign={isMinWidth500px ? undefined : "center"}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        {/* FOURTH COLUMN */}
        <Box textAlign={isMinWidth500px ? undefined : "center"}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">50 North Blvd, New York</Typography>
          <Typography mb="30px">
            Email: something
            <span style={{ display: isMinWidth800px ? "inline" : "block" }}>
              @gmail.com
            </span>
          </Typography>
          <Typography mb="30px">(222) 333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
