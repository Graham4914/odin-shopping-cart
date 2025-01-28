import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './ShoppingCart.module.css';
import { useCart } from '../../context/CartContext';


const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();

  // Calculate total items and cost
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleCheckout = () => {
    alert('This is a mock store. Thank you for your purchase!');
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <div className={styles.shoppingCartContent}>
        <h1 className={styles.heading}>Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty.</p>
        ) : (
          <div className={styles.cartContent}>
            {/* Product List */}
            <div className={styles.cartList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.title} className={styles.productImage} />
                  <div className={styles.productDetails}>
                    <h2 className={styles.productTitle}>{item.title}</h2>
                    <p className={styles.productPrice}>${item.price.toFixed(2)}</p>
                    <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.decrementButton}
                        onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.id, Number(e.target.value))}
                        min="1"
                      />
                      <button
                        className={styles.incrementButton}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.summarySection}>
              <h2 className={styles.summaryHeading}>Order Summary</h2>
              <p className={styles.summaryText}>Total Items: {totalItems}</p>
              <p className={styles.summaryText}>Total Cost: ${totalCost.toFixed(2)}</p>
              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default ShoppingCart;
