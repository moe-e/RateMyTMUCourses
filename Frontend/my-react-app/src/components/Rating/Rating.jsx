import React, { useState, useEffect } from 'react';

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

function Rating({ currentValue = 0, isReadOnly = false, fontSize = 30, onChange }) {
  const [rating, setRating] = useState(currentValue);
  const [difficulty, setDifficulty] = useState(currentValue);

   useEffect(() => {
    if (onChange) {
      onChange(rating); // Call onChange callback whenever rating changes
    }
  }, [rating, onChange]); // Ensure this effect runs whenever rating or onChange changes

  
  useEffect(() => {
    if (onChange) {
      onChange(difficulty); // Call onChange callback whenever rating changes
    }
  }, [difficulty, onChange]); // Ensure this effect runs whenever rating or onChange changes

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
