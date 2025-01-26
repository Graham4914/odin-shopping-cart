import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ProductDetails.module.css';
import Footer from '../Footer/Footer';

const ProductDetails = () => {
  const { state } = useLocation(); // Access product details passed via Link state
  const { product } = state || {}; // Handle undefined state gracefully
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return <p className={styles.errorMessage}>Product not found. Please try again.</p>;
  }

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <>
    <div className={styles.productDetailsPage}>
      <div className={styles.productContent}>
        {/* Left Column: Product Image */}
        <div className={styles.productImageWrapper}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
        </div>

        {/* Right Column: Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <div className={styles.quantityControls}>
            <button
              className={styles.decrementButton}
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
               <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              className={styles.quantityInput}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min="1"
            />
            <button className={styles.incrementButton} onClick={incrementQuantity}>
                 <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            onClick={() => {
              addToCart(product, quantity);
              navigate('/cart'); // Redirect to cart after adding
            }}
            className={styles.addToCartButton}
          >
            Add to Cart
          </button>
          <div className={styles.navigationButtons}>
            <button onClick={() => navigate('/shop')} className={styles.backButton}>
              Back to Shop
            </button>
            <button onClick={() => navigate('/cart')} className={styles.viewCartButton}>
              View Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default ProductDetails;
