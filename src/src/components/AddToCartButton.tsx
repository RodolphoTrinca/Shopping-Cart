import React from 'react';

interface AddToCartButtonProps {
  added: boolean;
  onClick: () => void;
}

export default function AddToCartButton({ added, onClick }: AddToCartButtonProps) {
  return (
    <div className="mt-auto w-full pt-2">
      <button
        className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center font-medium transition-colors ${added ? 'bg-green-600' : ''}`}
        onClick={onClick}
        disabled={added}
      >
        {added ? (
          <span className="flex items-center">✔ Added</span>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}
