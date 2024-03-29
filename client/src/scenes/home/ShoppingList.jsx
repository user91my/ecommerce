import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isMinWidth550px = useMediaQuery("(min-width:550px");

  console.log("items", items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItems = async () => {
    const items = await fetch(`${process.env.REACT_APP_BASE_URL}/items`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson));
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pastaItems = items.filter(
    (item) => item.category === "Pasta"
  );
  const oilItems = items.filter((item) => item.category === "Oil");
  const ingredientsItems = items.filter(
    (item) => item.category === "Ingredients"
  );

  return (
    <Box width="80%" margin="40px auto">
      <Typography variant="h3" textAlign="center" fontWeight="bold">
        Product Categories
      </Typography>

      {/* TABS */}
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          sx: { display: isMinWidth550px ? "block" : "none" },
        }} // Props applied to the tab indicator element
        sx={{
          m: "17.5px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap", // enables flexible items to be wrapped (i.e. extra items move into new row or column)
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="OIL" value="oil" />
        <Tab label="INGREDIENTS" value="ingredients" />
        <Tab label="PASTA" value="pasta" />
      </Tabs>

      {/* PRODUCTS CONTAINER */}
      <Box
        margin="0 auto"
        display="grid"
        // Items inside the grid container will be automatically arranged
        // in as many columns as can fit within the container.
        // Each column will be 300px.
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around" // space before, between and after items
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item._id.toString()}`} />
          ))}
        {value === "oil" &&
          oilItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id.toString()}`} />
          ))}
        {value === "ingredients" &&
          ingredientsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id.toString()}`} />
          ))}
        {value === "pasta" &&
          pastaItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id.toString()}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
