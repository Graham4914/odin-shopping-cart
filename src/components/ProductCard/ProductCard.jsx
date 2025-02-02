import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"; 


const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.title} added to cart!`);
  };
  

  const getOptimizedImageUrl = (url, width = 320) => {
    return `https://res.cloudinary.com/djoyyyoxu/image/fetch/w_${width},q_auto,f_webp/${encodeURIComponent(url)}`;
  };
  
  return (
    <div className={styles.productCard} role="group" aria-labelledby={`product-title-${product.id}`}>

      <Link to={`/product/${product.id}`} state={{ product }} className={styles.productLink}>
      <div className={styles.productImageContainer}>
      <img
        src={getOptimizedImageUrl(product.image, 320)}
        width="280" 
        height="210" 
        alt={product.title}
        className={styles.productImage}
        loading={index < 4 ? "eager" : "lazy"}
      />
      </div>
      <h2 id={`product-title-${product.id}`} className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice} aria-label={`Price: $${product.price.toFixed(2)}`}>
        ${product.price.toFixed(2)}
      </p>
      </Link>
      <div className={styles.quantityControls}>
        <button
          className={styles.decrementButton}
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          aria-label={`Decrease quantity of ${product.title}`}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="number"
          className={styles.quantityInput}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          aria-label={`Quantity of ${product.title}`}
        />
        <button className={styles.incrementButton} onClick={incrementQuantity} aria-label={`Increase quantity of ${product.title}`}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <button
        className={styles.addToCartButton}
        onClick={() => addToCart(product, quantity)}
        aria-label={`Add ${quantity} of ${product.title} to cart`}
      >
        Add to Cart
      </button>
     
    </div>
    
  );
};

export default ProductCard;
