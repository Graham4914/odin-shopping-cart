import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ShopPage from './components/ShopPage/ShopPage';
import Navbar from './components/Navbar/Navbar';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const initialCartItems  = [
  { id: 1, title: "Test Product 1", price: 9.99, quantity: 1, image: "https://via.placeholder.com/150" },
  { id: 2, title: "Test Product 2", price: 19.99, quantity: 2, image: "https://via.placeholder.com/150" },
];

const App = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartItems={cartItems}
              onRemoveItem={(id) => {
                setCartItems(cartItems.filter((item) => item.id !== id));
              }}
              onUpdateQuantity={(id, quantity) => {
                setCartItems(cartItems.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ));
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
