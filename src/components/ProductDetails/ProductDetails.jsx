import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ProductDetails.module.css';





const ProductDetails = () => {
  const { state } = useLocation(); // Access product details passed via Link state
  const { product } = state || {}; // Handle undefined state gracefully
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState('');

const handleAddToCart = () => {
    addToCart(product, quantity);
    setFeedbackMessage('Added to Cart!');
    setTimeout(() => setFeedbackMessage(''), 2000); // Clear message after 2 seconds
};

const handleAddToCartAndNavigate = () => {
  handleAddToCart(); // Adds to the cart and shows feedback
  setTimeout(() => navigate('/cart'), 2000); // Navigate after showing feedback for 2 seconds
};


  if (!product) {
    return <p className={styles.errorMessage}>Product not found. Please try again.</p>;
  }

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const getOptimizedImageUrl = (url) => {
    return `https://res.cloudinary.com/djoyyyoxu/image/fetch/w_320,q_auto,f_webp/${encodeURIComponent(url)}`;
  };

  return (
    <>
    <div className={styles.productDetailsPage}>
      <div className={styles.productContent}>
        {/* Left Column: Product Image */}
        <div className={styles.productImageWrapper}>
          <img  
           src={getOptimizedImageUrl(product.image)}
          alt={product.title}    
          className={styles.productImage}
          loading="eager"
          />
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
              aria-label="Decrease quantity"
            >
               <FontAwesomeIcon icon={faMinus} />
            </button>

            <label htmlFor="quantityInput" className="sr-only">Quantity:</label>
            <input
              id="quantityInput"
              type="number"
              className={styles.quantityInput}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min="1"
            />
            <button className={styles.incrementButton} onClick={incrementQuantity}
            aria-label="Increase quantity"
            >
                 <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
             className={styles.addToCartButton}
             aria-label={`Add ${quantity} of ${product.title} to cart`}
          >
            Add to Cart
          </button>

          {/* Feedback Message with Reserved Space */}
          <p className={styles.feedbackMessage} aria-live="polite" aria-atomic="true" role="status">
            {feedbackMessage || <span>&nbsp;</span>} 
          </p>

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

    </>
  );
};

export default ProductDetails;
