import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isMinWidth550px = useMediaQuery("(min-width:550px)");

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    // OVERLAY
    <Box
      // "block" - each child component will take up a whole width (placed on top one another).
      // "none" - element will be completely removed.
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)" // translucent black
      position="fixed" // LOCKS the element relative to the viewport / browser window
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      // "overflow" property controls what happens to content that is too big to fit into an area.
      // "auto" - overflow is clipped and scrollbar is added to see the rest of the content (when necessary).
      // https://www.w3schools.com/css/css_overflow.asp
      overflow="auto"
      // Clicking anywhere on the translucent black overlay area will close
      // the cart menu.
      onClick={() => dispatch(setIsCartOpen({}))}
    >
      {/* MODAL */}
      <Box
        position="fixed" // LOCKS the element relative to the viewport / browser window
        right="0"
        bottom="0"
        width={`max(${isMinWidth550px ? "400px" : "60vw"}, 30%)`} // max() sets width to whichever value is the largest
        minWidth="300px"
        height="100%"
        backgroundColor="white"
        // Prevents the children from propagating (bubbling by default) the onClick event to
        // the parent. Therefore clicking within the Modal (i.e. the cart menu on the right
        // of the viewport) will not close the whole overlay.
        // https://javascript.info/bubbling-and-capturing#stopping-bubbling
        onClick={(event) => event.stopPropagation()}
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={(event) => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => {
              //
              // Optional chaining (?.)
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
              const url = item?.image;

              return (
                <Box key={`${item.name}-${item._id.toString()}`}>
                  <FlexBox p="15px 0">
                    <Box
                      flex="1 1 40%" // Specifies flex properties by order: flex-grow, flex-shrink, flex-basis.
                    >
                      {/* Image */}
                      <img
                        alt={item?.name} // Does 'item' exist? If yes, it is set as 'name', otherwise it'll be 'undefined'.
                        width="123px"
                        height="164px"
                        src={`${process.env.REACT_APP_BASE_URL}${url}`}
                        style={{ objectFit: "cover" }} // Image keeps its aspect ratio and fills given dimension. The image will be clipped to fit.
                      />
                    </Box>

                    <Box flex="1 1 60%">
                      <FlexBox mb="5px">
                        {/* Name */}
                        <Typography fontWeight="bold">{item.name}</Typography>

                        {/* Close Button */}
                        <IconButton
                          onClick={() =>
                            dispatch(removeFromCart({ _id: item._id }))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </FlexBox>

                      {/* Short Description */}
                      <Typography>{item.shortDescription}</Typography>

                      {/* Amount Adjustment */}
                      <FlexBox m="15px 0">
                        <Box
                          display="flex"
                          alignItems="center"
                          border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          {/* Decrease count */}
                          <IconButton
                            onClick={() =>
                              dispatch(decreaseCount({ _id: item._id }))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>

                          {/* Item count */}
                          <Typography>{item.count}</Typography>

                          {/* Increase count */}
                          <IconButton
                            onClick={() =>
                              dispatch(increaseCount({ _id: item._id }))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        {/* Price */}
                        <Typography fontWeight="bold">${item.price}</Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              );
            })}
          </Box>

          {/* SUBTOTAL PRICE + CHECKOUT BUTTON */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>

            <Button
              disabled={!Boolean(cart.length)} // disabled when cart is empty
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "15px 40px",
                m: "20px 0",
                letterSpacing: "1px",
                fontFamily: "roboto, sans-serif",
                fontSize: "13px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: shades.primary[200],
                },
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
