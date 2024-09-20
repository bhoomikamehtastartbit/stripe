import React from 'react';

const SubscriptionCard = ({ price, product, onSelect, isDisabled }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 flex-1 basis-1/3 max-w-xs">
      <div className="p-6">
        <h2 className="text-2xl font-semibold leading-6 text-white">
          {product.name}
        </h2>
        <p className="mt-4 text-zinc-300">
          {product.description || 'Description not available'}
        </p>
        <p className="mt-8">
          <span className="text-5xl font-extrabold text-white">${price.unit_amount / 100}</span>
          <span className="text-base font-medium text-zinc-100">
            {price.recurring ? `/${price.recurring.interval}` : ''}
          </span>
        </p>
        <button
          className={`block w-full py-2 mt-8 text-sm font-semibold text-center rounded-md ${
            isDisabled
              ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
              : 'hover:bg-zinc-900 hover:text-white bg-zinc-800 text-white'
          }`}
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && onSelect(price.id)}
        >
          {isDisabled ? 'Already Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
