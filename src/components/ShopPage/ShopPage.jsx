import React from 'react';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';

const testProduct = {
  title: 'Sample Product',
  price: 19.99,
  image: 'https://via.placeholder.com/150',
  onAddToCart: () => alert('Product added to cart!'),
};

const ShopPage = () => {
  return (
    <div className={styles.shopPage}>
      <h1 className={styles.heading}>Shop</h1>
      <ProductCard {...testProduct} />
      <p className={styles.description}>
        Product listings will appear here. Stay tuned!
      </p>
    </div>
  );
};

export default ShopPage;
