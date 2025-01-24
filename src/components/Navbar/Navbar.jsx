import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><a href="/" className={styles.navLink}>Home</a></li>
        <li><a href="/shop" className={styles.navLink}>Shop</a></li>
        <li><a href="/cart" className={styles.navLink}>
          Cart <span className={styles.cartCount}>(0)</span>
        </a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
