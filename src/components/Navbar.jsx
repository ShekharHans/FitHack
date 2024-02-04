import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/images/etherealeclat.png";

import Exercises from "./Exercises";

const Navbar = () => (
  <motion.div
    style={{
      display: "flex",
      justifyContent: "space-around",
      width: "100vw",
      position: "fixed",
      top: "10px",
      zIndex: "99999",
    }}
  >
    <Link to="/">
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        src={Logo}
        alt="logo"
        style={{ width: "13rem", height: "1.5rem", margin: "0" }}
      />
    </Link>
    <motion.nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "40px",
        padding: "10px",
        backgroundColor: "#212020cc", // Adding a background color for better visibility
        border: "1px solid #FF2625",
        borderRadius: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          fontFamily: "Alegreya, sans-serif",
          fontSize: "24px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>
        <Link
          to="/exercises"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
          element={<Exercises />}
        >
          Exercises
        </Link>
        <Link
          to="/about"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          About
        </Link>
        <Link
          to="/contact"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          Contact Us
        </Link>
      </div>
    </motion.nav>
  </motion.div>
);

export default Navbar;
