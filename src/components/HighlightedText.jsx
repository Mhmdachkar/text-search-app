import React from 'react';

const HighlightedText = ({ text, query }) => {
  if (!query.trim()) {
    return <span>{text}</span>;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? 
          <mark key={i} className="bg-yellow-300 font-semibold">{part}</mark> : 
          <span key={i}>{part}</span>
      )}
    </span>
  );
};

export default HighlightedText;
