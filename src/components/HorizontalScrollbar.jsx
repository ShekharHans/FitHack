import React, { useContext, useRef } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Typography } from "@mui/material";
import BodyPart from "./BodyPart";
import ExerciseCard from "./ExerciseCard";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

const LeftArrow = ({ onClick }) => (
  <Typography onClick={onClick} className="left-arrow">
    <img src={RightArrowIcon} alt="left-arrow" />
  </Typography>
);

const RightArrow = ({ onClick }) => (
  <Typography onClick={onClick} className="right-arrow">
    <img src={LeftArrowIcon} alt="right-arrow" />
  </Typography>
);

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const menuRef = useRef(null);

  const scrollToNext = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" }); // Adjust the scroll distance as needed
    }
  };

  const scrollToPrev = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" }); // Adjust the scroll distance as needed
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RightArrow onClick={scrollToNext} />

        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            maxWidth: "100vw", // Adjust the maximum width as needed
          }}
          ref={menuRef}
        >
          {data.map((item) => (
            <Box
              key={item.id || item}
              itemID={item.id || item}
              title={item.id || item}
              m="0 20px"
            >
              {bodyParts ? (
                <BodyPart
                  item={item}
                  setBodyPart={setBodyPart}
                  bodyPart={bodyPart}
                />
              ) : (
                <ExerciseCard exercise={item} />
              )}
            </Box>
          ))}
        </div>
        <LeftArrow onClick={scrollToPrev} />
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
