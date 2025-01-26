import React, { useState, useEffect } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import { fetchProducts } from '../../utils/api';
import Footer from '../Footer/Footer';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], priceRange: [0, Infinity] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['Men\'s Clothing', 'Women\'s Clothing', 'Jewelery', 'Electronics'];

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      if (result.error) {
        setError(result.error);
      } else {
        setProducts(result);
        setFilteredProducts(result); // Show all products initially
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = [...products];

      // Filter by categories
      if (filters.categories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.categories.some((category) =>
            category.toLowerCase() === product.category.toLowerCase()
          )
        );
      }

      // Filter by price range
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [filters, products]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ categories: [], priceRange: [0, Infinity] });
  };

  const selectedCategoryText =
    filters.categories.length > 0
      ? filters.categories.join(', ')
      : 'All Products';

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>Failed to load products: {error}</p>;
  }

  return (
    <>
    <div className={styles.shopPage}>
      {/* Sidebar (Filter Panel) */}
      <div className={styles.filterPanelWrapper}>
        <FilterPanel
          categories={categories}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </div>
  
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.shopPageHeader}>
          <h1>{selectedCategoryText}</h1>
        </div>
  
        {/* Product List */}
        <div className={styles.productList}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ShopPage;
