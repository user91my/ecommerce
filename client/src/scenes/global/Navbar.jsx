import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMinWidth600px = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100vw"
      height="60px"
      backgroundColor="rgba(255, 255, 255)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width={isMinWidth600px ? "80%" : "88%"}
        minWidth="275px"
        margin="auto"
        gap="0.5rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* LEFT-SIDE : TITLE */}
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
          fontFamily="Oswald, sans-serif"
          fontSize={isMinWidth600px ? "1.75rem" : "1.5rem"}
        >
          MEDITERRANEA
        </Box>

        {/* RIGHT-SIDE ICONS */}
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap={isMinWidth600px ? "20px" : "10px"}
          zIndex="2"
          pl={isMinWidth600px ? undefined : "20px"}
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutlined />
          </IconButton>

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0} // Badge will not appear if the cart length is 0
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
