import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} state={{ product }} className={styles.productLink}>
      <div className={styles.productImageContainer}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      </div>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      </Link>
      <div className={styles.quantityControls}>
        <button
          className={styles.decrementButton}
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="number"
          className={styles.quantityInput}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          aria-label="Product quantity"
        />
        <button className={styles.incrementButton} onClick={incrementQuantity} aria-label="Increase quantity">
        <FontAwesomeIcon icon={faPlus} />
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
