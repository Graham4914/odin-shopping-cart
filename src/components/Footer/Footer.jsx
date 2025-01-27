import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link to="/returns" className={styles.footerLink}>
          Returns
        </Link>
        <Link to="/privacy-policy" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className={styles.footerLink}>
          Terms of Service
        </Link>
      </div>
      <div className={styles.footerSocial}>
        <a href="https://facebook.com" className={styles.footerIcon} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://instagram.com" className={styles.footerIcon} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://twitter.com" className={styles.footerIcon} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 Your Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
