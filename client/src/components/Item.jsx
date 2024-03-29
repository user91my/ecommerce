import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  // Data structure for "item" response body :-
  //      [ {…}, {…}, {…}, {…}, {…}, ... ]
  const { category, price, name, image, _id } = item;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Item image */}
        <img
          alt={name}
          width="300px"
          height="400px"
          src={`${process.env.REACT_APP_BASE_URL}${image}`}
          onClick={() => navigate(`/item/${_id.toString()}`)}
          style={{ cursor: "pointer", objectFit: "cover" }}
        />
        {/* Upon hovering the item, */}
        {/* a small box will appear with options to adjust item amount */}
        {/* and to add the item to cart.  */}
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* AMOUNT ADJUSTMENT */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              {/* Decrease count */}
              <IconButton
                onClick={() => setCount(Math.max(count - 1, 1))} // Math.max() returns the number with the highest value.
              >
                <RemoveIcon />
              </IconButton>

              {/* Item count */}
              <Typography color={shades.primary[300]}>{count}</Typography>

              {/* Increase count */}
              <IconButton onClick={() => setCount(Math.max(count + 1))}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* ADD TO CART BUTTON */}
            <Button
              // Before adding any item into the cart, checks
              // whether the item is already in the cart.
              onClick={() => {
                const isItemInCart = cart.some(
                  (cartItem) => cartItem._id === _id
                );
                if (isItemInCart) return;
                dispatch(addToCart({ ...item, count }));
              }}
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
                "&:hover": {
                  backgroundColor: shades.primary[200],
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ITEM DESCRIPTIONS */}
      <Box mt="3px">
        {/* Item category */}
        <Typography variant="subtitle2" color={neutral.dark}>
          {/* "category" is a camelCase string, e.g. "newArrivals". */}
          {/* "newArrivals" will be transformed into "New Arrivals" */}
          {category &&
            category
              // Captures each capital letter in the string and inserts a space before it.
              // The 'g' flag ensures that this replacement is done globally for all occurrences of capital letters.
              .replace(/([A-Z])/g, " $1")
              // Replaces the first character of the string with its uppercase version.
              .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        {/* Item name */}
        <Typography>{name}</Typography>
        {/* Item price */}
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
