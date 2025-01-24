import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ title, price, image, onAddToCart }) => {
  return (
    <div className={styles.productCard}>
      <img src={image} alt={title} className={styles.productImage} />
      <h2 className={styles.productTitle}>{title}</h2>
      <p className={styles.productPrice}>${price.toFixed(2)}</p>
      <div className={styles.actions}>
        <input
          type="number"
          className={styles.quantityInput}
          min="1"
          defaultValue="1"
        />
        <button
          className={styles.addToCartButton}
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
