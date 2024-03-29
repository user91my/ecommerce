import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = async () => {
    const item = await fetch(
      `${process.env.REACT_APP_BASE_URL}/items/${itemId}`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson);
  };

  const getItems = async () => {
    const items = await fetch(`${process.env.REACT_APP_BASE_URL}/items`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    setItems(itemsJson);
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Optional chaining (?.)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const url = item?.image;

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`${process.env.REACT_APP_BASE_URL}${url}`}
            style={{ objectFit: "cover" }} // Image keeps its aspect ratio and fills given dimension. The image will be clipped to fit.
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          {/* <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box> */}

          {/* ITEM DETAILS */}
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>${item?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>{item?.longDescription}</Typography>
          </Box>

          {/* COUNT & ADD TO CART BUTTONS */}
          <Box display="flex" alignItems="center" minHeight="50px">
            {/* Count adjustment */}
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              {/* Decrease count */}
              <IconButton
                onClick={() => setCount(Math.max(count - 1, 1))} // Math.max() returns the number with the highest value.
              >
                <RemoveIcon />
              </IconButton>

              {/* Item count */}
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>

              {/* Increase count */}
              <IconButton onClick={() => setCount(Math.max(count + 1))}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to Cart Button */}
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => {
                const isItemInCart = cart.some(
                  (cartItem) => cartItem._id === item._id
                );
                if (isItemInCart) return;
                dispatch(addToCart({ ...item, count }));
              }}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{item?.longDescription}</div>}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Proucts
        </Typography>

        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {/* Arbitrarily takes the first 4 item in "items" array */}
          {/* and map them out as related items. */}
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
