import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({ categories = [], onApplyFilters, onResetFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);

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
    <div className={styles.filterPanel}>
      <h3 className={styles.filterHeading}>Filters</h3>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterLabel}>Category</h4>
        <ul className={styles.filterList}>
          {categories.map((category) => (
            <li key={category} className={styles.filterItem}>
              <label>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterLabel}>Price Range</h4>
        <ul className={styles.filterList}>
          {[
            [0, Infinity], // "All prices"
            [0, 50], // "$0 - $50"
            [50, 100], // "$50 - $100"
            [100, 200], // "$100 - $200"
            [200, Infinity], // "$200+"
          ].map((range) => (
            <li key={range.toString()} className={styles.filterItem}>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value={range}
                  checked={
                    selectedPriceRange[0] === range[0] &&
                    selectedPriceRange[1] === range[1]
                  }
                  onChange={() => handlePriceRangeChange(range)}
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
      <button className={styles.resetButton} onClick={onResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
