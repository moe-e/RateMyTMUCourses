import React, { useState } from 'react';

function Star({ filled, onSelect, isReadOnly, fontSize }) {
  const style = {
    cursor: isReadOnly ? 'default' : 'pointer',
    color: filled ? 'red' : 'gray',
    fontSize: fontSize
  };

  return (
    <span
      onClick={isReadOnly ? undefined : onSelect}
      style={style}
      onMouseEnter={e => !filled && !isReadOnly && (e.target.style.color = 'lightcoral')}
      onMouseLeave={e => !filled && !isReadOnly && (e.target.style.color = 'gray')}


    >
      {filled ? '★' : '☆'}
    </span>
  );
}

function Rating({ currentValue = 0, isReadOnly = false, fontSize = 30 }) {
  const [rating, setRating] = useState(currentValue);

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onSelect={() => setRating(index + 1)}
          isReadOnly={isReadOnly}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
}

export default Rating;
