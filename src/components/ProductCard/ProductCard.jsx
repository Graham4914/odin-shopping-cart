import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      <div className={styles.quantityControls}>
        <button
          className={styles.decrementButton}
          onClick={decrementQuantity}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          className={styles.quantityInput}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
        />
        <button className={styles.incrementButton} onClick={incrementQuantity}>
          +
        </button>
      </div>
      <button
        className={styles.addToCartButton}
        onClick={() => addToCart(product, quantity)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
