import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><a href="/" className={styles.navLink}>Home</a></li>
        <li><a href="/shop" className={styles.navLink}>Shop</a></li>
        <li><a href="/cart" className={styles.navLink}>
          Cart <span className={styles.cartCount}>{totalItems}</span>
        </a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
