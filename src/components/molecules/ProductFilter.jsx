import React from 'react';
import Button from '../atoms/Button';
import './ProductFilter.css';

export default function ProductFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="product-filter">
      <h3 className="filter-title">Categories</h3>
      <div className="filter-buttons">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onCategoryChange('all')}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
