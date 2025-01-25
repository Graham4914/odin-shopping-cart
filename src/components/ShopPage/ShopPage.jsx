import React, { useState, useEffect } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import { fetchProducts } from '../../utils/api';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 100] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      console.log("Fetched Products:", result); // Log the result for debugging
      
      if (result.error) {
        setError(result.error);
      } else {
        setProducts(result);
        setFilteredProducts(result);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = [...products];

    
    // Filter by category
    if (filters.category && filters.category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by price range
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== Infinity) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );
    }

    setFilteredProducts(updatedProducts);
  };


  applyFilters();
}, [filters, products]);


  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ category: '', priceRange: [0, 100] });
  };







  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>Failed to load products: {error}</p>;
  }



  return (
    <div className={styles.shopPage}>
      <h1 className={styles.heading}>Shop</h1>
      <FilterPanel
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;