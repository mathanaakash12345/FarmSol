import React from 'react';

const FlipCard = ({front, back}) => {
  return (
    
    <div className="w-64 h-64 group  font-pop p-3" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-full transition-transform duration-700 transform group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-dgry rounded-xl flex items-center justify-center text-rup text-xl">
            {front}
          </div>
        </div>
        
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-rup rounded-xl flex items-center p-3 justify-center text-dgry text-xl">
            {back}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;