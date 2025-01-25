
export const fetchProducts = async () => {
  
    try {
        
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch products:', error.message);
      return { error: error.message };
    }
    
  };
  