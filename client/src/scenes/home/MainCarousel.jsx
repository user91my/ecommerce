import React from "react";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";

// https://www.npmjs.com/package/react-responsive-carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required css file for carousel to work.

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// Function to import all images from assets folder ("client\src\assets").
// The "r" parameter represents webpack's "require.context()".
const importAll = (r) =>
  // Example data structure for "r.keys()" with subdirectory enabled :-
  //  [
  //   './image1.jpeg',
  //   './image2.jpeg',
  //   './image3.jpeg',
  //   './subdirectory/image4.jpeg',
  //   './subdirectory/image5.jpeg',
  //    ...
  //  ]
  r.keys().reduce((acc, item) => {
    // Removes the "./" portion from every file name key string.
    // "r(item)" imports the actual file content.
    // Final data structure is as per "heroTextureImports" (see further below).
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

// NOTE ABOUT "require.context()"
// ------------------------------
// "require.context()" is a webpack feature that creates a context from which one can dynamically
// import files/modules. Context can be created like such :-
//     `const context = require.context('./your-directory', false, /\.jpeg$/)`
// 1st parameter - the directory path where webpack looks for the files (required).
// 2nd parameter - boolean as to whether to include subdirectories (true by default).
// 3rd parameter - regex pattern to define matching file names (if undefined, webpack matches all files).

// Data structure for "heroTextureImports" :-
//  {
//   'image1.jpeg' :  /* image content of image1.jpeg */,
//   'image2.jpeg' :  /* image content of image2.jpeg */,
//   'image3.jpeg' :  /* image content of image3.jpeg */,
//    ...
//  }
const heroTextureImports = importAll(
  // The regex (3rd parameter) below matches file names that end with
  // '.png','.jpeg','.jpg','.svg','.webp'.
  // The "?" makes the preceding "e" optional, matching "jpg" and "jpeg".
  // "$" asserts the position at the end of the string.
  require.context(
    "../../assets/carousel-images",
    false,
    /\.(png|jpe?g|svg|webp)$/
  )
);

const MainCarousel = () => {
  const isMinWidth900px = useMediaQuery("(min-width:900px)");
  const isMinWidth600px = useMediaQuery("(min-width:600px)");
  const isMinWidth450px = useMediaQuery("(min-width:450px)");

  return (
    <Carousel
      infiniteLoop={true} // Going after the last image will move back to the first slide.
      autoPlay={true}
      interval={3500} // slide interval in millisecond when 'autoPlay' is true (defaults to 3000)
      showThumbs={false} // Don't show thumbnails.
      showIndicators={false} // Don't show the dots.
      showStatus={false}
      // "Previous" Arrow
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute", // LOCKS & ADJUSTS the element's position relative to its nearest positioned ancestor
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            display: isMinWidth450px ? undefined : "none",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      // "Next" Arrow
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute", // LOCKS & ADJUSTS the element's position relative to its nearest positioned ancestor
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            display: isMinWidth450px ? undefined : "none",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {/* Array of images for the carousel. */}
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "80vh",
              objectFit: "cover", // Image keeps its aspect ratio and fills given dimension. The image will be clipped to fit.
              //backgroundAttachment: "fixed", // The background image will not scroll with the page.
            }}
          />
          {/* Accompanying textbox for each carousel image */}
          <Box
            color="white"
            padding={isMinWidth600px ? "45px" : "30px"}
            borderRadius="10px"
            textAlign={isMinWidth900px ? "left" : "center"}
            backgroundColor="rgb(0, 0, 0, 0.6)"
            position="absolute" // LOCKS & ADJUSTS the element's position relative to its nearest positioned ancestor
            top="35%"
            minWidth="300px"
            width={
              isMinWidth900px ? undefined : isMinWidth450px ? "70vw" : "84vw"
            }
            left={
              isMinWidth900px ? "10%" : isMinWidth450px ? "13.5vw" : "6.5vw"
            }
            right={
              isMinWidth900px ? undefined : isMinWidth450px ? "15vw" : "6.5vw"
            }
          >
            <Typography
              fontFamily="Oswald, sans-serif"
              fontSize={isMinWidth600px ? "1.5rem" : "1rem"}
              letterSpacing="0.1rem"
              color={shades.secondary[300]}
            >
              NEW ARRIVALS
            </Typography>
            <Typography
              variant="h1"
              fontSize={
                isMinWidth600px
                  ? undefined
                  : isMinWidth450px
                  ? "2.25rem"
                  : "2.25rem"
              }
              sx={{ m: "10px 0" }}
            >
              PREMIUM ITALIAN <br />
              INGREDIENTS
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize={isMinWidth600px ? "0.85rem" : "0.7rem"}
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
