
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faRing, faMobileAlt, faVestPatches } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
    <div className={styles.homePage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Discover the Best Deals</h1>
          <p className={styles.heroSubheading}>Shop our wide range of products tailored just for you.</p>
          <Link to="/shop" className={styles.ctaButton}  aria-label="Start shopping now">Start Shopping</Link>
        </div>
      </section>

{/* Category Tiles */}
<section className={styles.categorySection}>
  <h2 className={styles.categoryHeading}>Shop by Category</h2>
  <div className={styles.categoryGrid}>
  <Link to="/shop?category=Men%27s%20Clothing" className={styles.categoryTile} aria-label="Shop Men's Clothing">
    <FontAwesomeIcon icon={faShirt} className={styles.categoryIcon} />
    <div className={styles.categoryContent}>Men's Clothing</div>
  </Link>

  <Link to="/shop?category=Women%27s%20Clothing" className={styles.categoryTile} aria-label="Shop Women's Clothing">
    <FontAwesomeIcon icon={faVestPatches} className={styles.categoryIcon} />
    <div className={styles.categoryContent}>Women's Clothing</div>
  </Link>

  <Link to="/shop?category=Jewelery" className={styles.categoryTile} aria-label="Shop Jewelery">
    <FontAwesomeIcon icon={faRing} className={styles.categoryIcon} />
    <div className={styles.categoryContent}>Jewelery</div>
  </Link>

  <Link to="/shop?category=Electronics" className={styles.categoryTile} aria-label="Shop Electronics">
    <FontAwesomeIcon icon={faMobileAlt} className={styles.categoryIcon} />
    <div className={styles.categoryContent}>Electronics</div>
  </Link>
</div>

</section>


     
     
    </div>
   
    </>
  );
};

export default HomePage;
