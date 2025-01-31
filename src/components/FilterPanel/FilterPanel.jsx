import React, { useState, useEffect, useRef } from 'react'; // Added useEffect
import styles from './FilterPanel.module.css';

const FilterPanel = ({ categories = [], onApplyFilters, isOpen,onClose, onResetFilters, initialCategory = '' }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const isInitialCategoryApplied = useRef(false);
  
 


  // Sync initial category with selectedCategories
  useEffect(() => {
    if (initialCategory && !isInitialCategoryApplied.current) {
      setSelectedCategories([initialCategory]); // Pre-select the category
      onApplyFilters({ categories: [initialCategory], priceRange: selectedPriceRange }); // Trigger filters
      isInitialCategoryApplied.current = true; // Mark as applied
    }
  }, [initialCategory, selectedPriceRange, onApplyFilters]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category) // Remove category if already selected
      : [...selectedCategories, category]; // Add category if not selected

    setSelectedCategories(updatedCategories);
    onApplyFilters({ categories: updatedCategories, priceRange: selectedPriceRange });
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    onApplyFilters({ categories: selectedCategories, priceRange: range });
  };

  return (
    
   

    <div className={`${styles.filterPanel} ${isOpen ? styles.open : ""}`}
     role="dialog"
     aria-labelledby="filterHeading"
     aria-hidden={!isOpen}
     >
      <h3 className={styles.filterHeading}>Filters</h3>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterLabel}>Category</h4>
        <ul className={styles.filterList}>
          {categories.map((category) => (
            <li key={category} className={styles.filterItem}>
              <label htmlFor={`category-${category}`}>
                <input
                  id={`category-${category}`}
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  aria-labelledby={`category-${category}`}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <h4 id="priceRangeHeading" className={styles.filterLabel}>Price Range</h4>
        <ul className={styles.filterList}>
          {[
            [0, Infinity], // "All prices"
            [0, 50], // "$0 - $50"
            [50, 100], // "$50 - $100"
            [100, 200], // "$100 - $200"
            [200, Infinity], // "$200+"
          ].map((range) => (
            <li key={range.toString()} className={styles.filterItem}>
              <label htmlFor={`price-${range[0]}-${range[1]}`}>
                <input
                  type="radio"
                  name="priceRange"
                  value={range}
                  checked={
                    selectedPriceRange[0] === range[0] &&
                    selectedPriceRange[1] === range[1]
                  }
                  onChange={() => handlePriceRangeChange(range)}
                  aria-labelledby={`price-${range[0]}-${range[1]}`}
                />
                {range[1] === Infinity
                  ? `$${range[0]}+`
                  : `$${range[0]} - $${range[1]}`}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Filters Button */}
      <button className={styles.resetButton} onClick={onResetFilters}
      aria-label="Reset all applied filters"
      >
        Reset Filters
      </button>
    </div>
  
  );
};

export default FilterPanel;
