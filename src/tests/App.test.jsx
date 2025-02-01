import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  it('renders Navbar and routes correctly', () => {
   
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check if "Home" link in Navbar is rendered
    expect(screen.getByText(/home/i)).toBeInTheDocument();

    // Check if the default route renders the HomePage
    expect(screen.getByText(/Welcome to Our Store!/i)).toBeInTheDocument();
  });
});
