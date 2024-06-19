import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseAmount, decreaseAmount, removeProduct } from '../features/productSlice';
import { BsCart3 } from 'react-icons/bs';

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center w-full sm:w-auto">
        <input type="checkbox" className="mr-4 hidden sm:block" />
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
        <div className="text-center sm:text-left">
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">
            {item.originalPrice && (
              <span className="line-through mr-2">Rp {item.originalPrice}</span>
            )}
            Rp {item.discountedPrice}
          </p>
        </div>
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <button
          className="p-2 bg-gray-200 rounded-full mr-2"
          onClick={() => onDecrease(item.id)}
        >
          -
        </button>
        <span className="px-4">{item.amount}</span>
        <button
          className="p-2 bg-gray-200 rounded-full ml-2"
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-full ml-4"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);

  const handleIncrease = (id) => {
    dispatch(increaseAmount(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseAmount(id));
  };

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Recipies</h1>
      {items.length > 0 ? (
        items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className=" text-center font-bold mb-5 text-3xl lg:text-6xl">Your list is empty 🤷‍♂️</p>
      )}
    </div>
  );
};

export default ShoppingCart;
