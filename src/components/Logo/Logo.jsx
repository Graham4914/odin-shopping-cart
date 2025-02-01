import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" className={styles.logo} aria-label="Go to Home Page">
      G-Store
    </Link>
  );
};

export default Logo;