import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div>
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;