import React from 'react';
import styles from './ShoppingCart.module.css';
import { useCart } from '../../context/CartContext';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  console.log('Cart state in ShoppingCart:', cart); // Debug log

  return (
    <div className={styles.shoppingCart}>
      <h1 className={styles.heading}>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => {
            console.log('Rendering cart item:', item); // Debug log
            return (
              <li key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <h2 className={styles.productTitle}>{item.title}</h2>
                  <p className={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </p>
                  <div className={styles.actions}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.decrementButton}
                        onClick={() =>
                          updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQuantity(item.id, Number(e.target.value))
                        }
                        min="1"
                      />
                      <button
                        className={styles.incrementButton}
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
