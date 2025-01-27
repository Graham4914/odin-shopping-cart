import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext'; // Import CartContext
import styles from './Navbar.module.css';

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation(); // Get the current route
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
    {/* Navigation Links */}
    <ul className={styles.navList}>
      <li>
        <Link
          to="/"
          className={`${styles.navLink} ${
            location.pathname === '/' ? styles.active : ''
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/shop"
          className={`${styles.navLink} ${
            location.pathname === '/shop' ? styles.active : ''
          }`}
        >
          Shop
        </Link>
      </li>
    </ul>
  
    {/* Cart Icon */}
    <div className={styles.cartContainer}>
      <Link to="/cart" className={styles.cartLink}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className={styles.cartCount}>{totalItems}</span>
      </Link>
    </div>
  </nav>
  
  );
};

export default Navbar;
