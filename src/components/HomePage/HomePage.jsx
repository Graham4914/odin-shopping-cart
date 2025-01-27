import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <>
    <div className={styles.homePage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Discover the Best Deals</h1>
          <p className={styles.heroSubheading}>Shop our wide range of products tailored just for you.</p>
          <Link to="/shop" className={styles.ctaButton}>Start Shopping</Link>
        </div>
      </section>

{/* Category Tiles */}
<section className={styles.categorySection}>
  <h2 className={styles.categoryHeading}>Shop by Category</h2>
  <div className={styles.categoryGrid}>
  <Link
  to={{
    pathname: "/shop",
    search: "?category=Men%27s%20Clothing",
  }}
  state={{ initialCategory: "Men's Clothing" }}
  className={styles.categoryTile}
>
  <div className={styles.categoryContent}>Men's Clothing</div>
</Link>

    <Link
  to={{
    pathname: "/shop",
    search: "?category=Women%27s%20Clothing",
  }}
  state={{ initialCategory: "Women's Clothing" }}
  className={styles.categoryTile}
>
  <div className={styles.categoryContent}>Women's Clothing</div>
</Link>
<Link
  to={{
    pathname: "/shop",
    search: "?category=Jewelery",
  }}
  state={{ initialCategory: "Jewelery" }}
  className={styles.categoryTile}
>
  <div className={styles.categoryContent}>Jewelery</div>
</Link>
<Link
  to={{
    pathname: "/shop",
    search: "?category=Electronics",
  }}
  state={{ initialCategory: "Electronics" }}
  className={styles.categoryTile}
>
  <div className={styles.categoryContent}>Electronics</div>
</Link>
  </div>
</section>


     
     
    </div>
   
    </>
  );
};

export default HomePage;
