import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import { fetchProducts } from '../../utils/api';
import { useSearchParams, useLocation } from 'react-router-dom';



const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], priceRange: [0, Infinity] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryFromState = location.state?.initialCategory || "";
  const categoryFromQuery = searchParams.get("category") || "";
  const category = categoryFromState || categoryFromQuery; // Prefer state over query
  const categories = ['Men\'s Clothing', 'Women\'s Clothing', 'Jewelery', 'Electronics'];
  const [isOpen, setIsOpen] = useState(false);


  

 const [initialMount, setInitialMount] = useState(true);

useEffect(() => {
  if (initialMount && category) {
    // On first load, if there's a category from the URL, use it.
    setFilters((prev) => ({
      ...prev,
      categories: [...new Set([...prev.categories, category])],
    }));
  }
  setInitialMount(false);
}, [initialMount, category]);

  // Fetch products from the API
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

  
  // Apply filters to the product list
  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = [...products];

      // Filter by categories
      if (filters.categories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.categories.some((cat) => cat.toLowerCase() === product.category.toLowerCase())
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
    
      <div className={styles.shopPage}>

      <button className={styles.filterToggleButton}
       onClick={() => setIsOpen(!isOpen)}
       ><FontAwesomeIcon icon={faFilter} />
        {isOpen ? "Close" : "Show"}
    </button>

        {/* Sidebar (Filter Panel) */}
        <div className={`${styles.filterPanelWrapper} ${isOpen ? styles.open : ""}`}>
          <FilterPanel
            isOpen={isOpen}
            categories={categories}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            initialCategory={category} // Pass the initial category from query parameters
          />
        </div>

        {/* Main Content */}
        <div className={styles.shopContent}>
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

  );
};

export default ShopPage;
