import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <input type="checkbox" className="mr-4" />
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">{item.originalPrice && <span className="line-through mr-2">Rp {item.originalPrice}</span>} Rp {item.discountedPrice}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="p-2 bg-gray-200 rounded-full mr-2">-</button>
        <span>{item.quantity}</span>
        <button className="p-2 bg-gray-200 rounded-full ml-2">+</button>
        <button className="p-2 bg-red-200 rounded-full ml-4">Delete</button>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const items = [
    {
      name: "Vantela Republic Low Black Gum",
      image: "image-url-1",
      originalPrice: "199.990",
      discountedPrice: "149.995",
      quantity: 1,
    },
    {
      name: "Vantela Oldschool Strip sock",
      image: "image-url-2",
      discountedPrice: "8.500",
      quantity: 1,
    },
    {
      name: "Vantela Man Slide sandals",
      image: "image-url-3",
      discountedPrice: "79.900",
      quantity: 1,
    },
    {
      name: "Vantela Ethnic Low Black Natural",
      image: "image-url-4",
      originalPrice: "182.390",
      discountedPrice: "129.900",
      quantity: 1,
    },
    {
      name: "Vantela New Public White low",
      image: "image-url-5",
      discountedPrice: "299.990",
      quantity: 1,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {items.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ShoppingCart;
