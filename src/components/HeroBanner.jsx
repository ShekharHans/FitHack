import React, { useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/images/home-bg.jpg";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import Loader from "./Loader";

const HeroBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          flexDirection: "column",
          width: "60%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <motion.div
          className="head-txt-wrapper"
          style={{
            display: "flex",
            position: "relative",
            bottom: "2rem",
            flexDirection: "column",
          }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="heading"
            style={{
              color: "#fff",
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "Antonio, sans-serif",
              fontSize: "5rem",
              fontWeight: 700,
              lineHeight: "94%",
              letterSpacing: "2px",
            }}
          >
            IT'S NOT FITNESS.
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="color"
              style={{
                color: "#FF2625",
                fontSize: "6rem",
                letterSpacing: "2px",
              }}
            >
              IT'S LIFE.
            </motion.span>
          </motion.h1>
          <motion.div
            className="heading-line-wrapper"
            style={{
              width: "100%",
              height: "0.8em",
              position: "absolute",
              top: "24%",
              bottom: "auto",
              left: "auto",
              right: "12%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="heading-line"
              style={{
                width: "100%",
                height: "12.2875px",
                backgroundColor: "#08040c",
              }}
            ></motion.div>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            fontSize: "1.5rem",
            lineHeight: "30px",
            marginBottom: "30px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            color: "#fff",
          }}
        >
          CHECK OUT THE MOST EFFECTIVE EXERCISES PERSONALIZED TO YOU
        </motion.p>
        {/* <Link to={"/exercises"}>
          <motion.button className="btn">Explore Exercises</motion.button>
        </Link> */}
      </motion.div>
    </motion.div>
  );
};

export default HeroBanner;
