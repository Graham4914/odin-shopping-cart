import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 Your Store. All rights reserved.</p>
      <nav>
        <a href="/returns">Returns</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </footer>
  );
};

export default Footer;
