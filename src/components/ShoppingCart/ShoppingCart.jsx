import React from 'react';
import styles from './ShoppingCart.module.css';

const ShoppingCart = ({ cartItems =[], onRemoveItem, onUpdateQuantity }) => {
  return (
    <div className={styles.shoppingCart}>
      <h1 className={styles.heading}>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.productImage} />
              <div className={styles.productDetails}>
                <h2 className={styles.productTitle}>{item.title}</h2>
                <p className={styles.productPrice}>${item.price.toFixed(2)}</p>
                <div className={styles.actions}>
                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                    min="1"
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
