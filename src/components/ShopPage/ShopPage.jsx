import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import { fetchProducts } from '../../utils/api';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
  const category = categoryFromState || categoryFromQuery; 
  const categories = ['Men\'s Clothing', 'Women\'s Clothing', 'Jewelery', 'Electronics'];
  const [isOpen, setIsOpen] = useState(false);


  

 const [initialMount, setInitialMount] = useState(true);

useEffect(() => {
  if (initialMount && category) {
   
    setFilters((prev) => ({
      ...prev,
      categories: [...new Set([...prev.categories, category])],
    }));
  }
  setInitialMount(false);
}, [initialMount, category]);


  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const result = await fetchProducts();
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

      if (filters.categories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.categories.some((cat) => cat.toLowerCase() === product.category.toLowerCase())
        );
      }

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
    
    <div className={`${styles.shopPage} ${isOpen ? styles.filterOpen : ""}`}>
    {isOpen && <div className={styles.filterOverlay} onClick={() => setIsOpen(false)}></div>}


      <button className={styles.filterToggleButton}
       onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls="filterPanel"

       ><FontAwesomeIcon icon={faFilter} />
        {isOpen ? "Close" : "Show"}
    </button>


   
       
        <div className={`${styles.filterPanelWrapper} ${isOpen ? styles.open : ""}`}>
          <FilterPanel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)} 
            categories={categories}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            initialCategory={category} 
          />
        </div>

       
        <div className={styles.shopContent}>
          
          <div className={styles.shopPageHeader} aria-live="polite">
          <h1 id="shopHeading" aria-label={`Showing products for: ${selectedCategoryText}`}>
              {selectedCategoryText}
          </h1>
          </div>

         
          <div className={styles.productList}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <ToastContainer
        position="bottom-right"
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick
        pauseOnHover
        draggable
      />
      </div>

  );
};

export default ShopPage;
