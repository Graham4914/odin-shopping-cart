import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext'; // Provide CartContext
import Navbar from '../components/Navbar/Navbar';


describe('Navbar Component', () => {
    it('renders correctly with initial state', () => {
        render(
          <BrowserRouter>
            <CartProvider>
              <Navbar />
            </CartProvider>
          </BrowserRouter>
        );
      
        // Check if the Navbar is rendered
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      
        // Check if the cart count is displayed as "0"
        const cartCount = screen.getByText('0', { selector: 'span' });
        expect(cartCount).toBeInTheDocument();
      });
      

    });