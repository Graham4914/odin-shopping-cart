import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext'; // Import CartContext
import Logo from '../Logo/Logo';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation(); // Get the current route
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar} aria-label="Main site navigation" >
      <div className={`${styles.logoWrapper} ${location.pathname.startsWith('/shop') ? styles.hideOnMobile : ''}`}>
       <Logo /> 
       </div>

    {/* Navigation Links */}
  
    <ul className={styles.navList}>
      <li>
        <Link
          to="/"
          className={`${styles.navLink} ${
            location.pathname === '/' ? styles.active : ''
          }`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
            aria-label="Go to Home Page"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/shop"
          className={`${styles.navLink} ${location.pathname.startsWith('/shop') || location.pathname.startsWith('/product') ? styles.active : ''}`}
            aria-current={location.pathname.startsWith('/shop') || location.pathname.startsWith('/product') ? 'page' : undefined}
            aria-label="Navigate to the Shop Page (Includes Product Details)"
        >
          Shop
        </Link>
      </li>
    </ul>
    

    <div className={styles.cartWrapper}> 
    {/* Cart Icon */}
    <div className={styles.cartContainer}>
      <Link to="/cart" className={styles.cartLink}
      aria-label={`Shopping Cart, ${totalItems} items`}
      >
        <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
        <span className={styles.cartCount} aria-hidden="true">{totalItems}</span>
      </Link>
    </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
