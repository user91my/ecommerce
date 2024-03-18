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
    // https://docs.strapi.io/dev-docs/api/rest
    // https://docs.strapi.io/dev-docs/api/rest/populate-select
    // GET /api/:pluralApiId/:documentId
    // Data structure for "item" response body :-
    //      {
    //        attributes : { name, price, category, shortDescription, longDescription, image, etc... }
    //        id : <itemId>
    //      }
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  };

  const getItems = async () => {
    // https://docs.strapi.io/dev-docs/api/rest
    // https://docs.strapi.io/dev-docs/api/rest/populate-select
    // GET /api/:pluralApiId?populate=<fieldName>
    // The ":pluralApiId" represents a strapi content-type in pluralized form.
    // In this case, it's the "item" collection in pluralized form ("items").
    // The "?populate=image" is requesting to populate the "image" field
    // in "items" collection.
    // "image" field has to be explicitly populated, otherwise it'll not be
    // included in the response body.
    // Data structure for "items" response body :-
    //      [ {…}, {…}, {…}, {…}, {…}, ... ]
    // Each object element (in "items") will look like the following :-
    //      {
    //        attributes : { name, price, category, shortDescription, longDescription, image, etc... }
    //        id : <itemId>
    //      }
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const formats = item?.attributes?.image?.data?.attributes?.formats ?? {};

  const url = formats.medium?.url ?? formats.small?.url;

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${url}`}
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
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
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
                  (cartItem) => cartItem.id === item.id
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
            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
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
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
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
