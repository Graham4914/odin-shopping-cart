import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ShopPage from './components/ShopPage/ShopPage';
import Navbar from './components/Navbar/Navbar';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import { CartProvider } from './context/CartContext';
import ProductDetails from './components/ProductDetails/ProductDetails';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider> 
    <Navbar />
    <ScrollToTop />
     <div className={styles.appContainer}> 
        
        <main className={styles.mainContent}> 
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
       
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
