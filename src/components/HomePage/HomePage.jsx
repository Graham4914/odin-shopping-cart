import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.heading}>Welcome to Our Store!</h1>
      <p className={styles.description}>
        Explore our wide range of products and find something you love.
      </p>
    </div>
  );
};

export default HomePage;
