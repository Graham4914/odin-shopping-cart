import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({ onApplyFilters, onResetFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]); // Example range: $0 to $100

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setPriceRange([0, Infinity]); // Show all products
    } else {
      const [min, max] = value.split('-').map(Number);
      setPriceRange([min, max]);
    }
  };

  const applyFilters = () => {
    onApplyFilters({ category: selectedCategory, priceRange });
  };

  return (
    <div className={styles.filterPanel}>
      <h2 className={styles.heading}>Filters</h2>

      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="category" className={styles.label}>Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.select}
        >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="priceRange" className={styles.label}>Price Range</label>
        <select
          id="priceRange"
          value={priceRange.join('-')}
          onChange={handlePriceRangeChange}
          className={styles.select}
        >
            <option value="all">All</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
        </select>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button onClick={applyFilters} className={styles.applyButton}>Apply Filters</button>
        <button onClick={onResetFilters} className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

export default FilterPanel;