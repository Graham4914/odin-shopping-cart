
// export const fetchProducts = async () => {
  
//     try {
        
//       const response = await fetch('https://fakestoreapi.com/products');
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Failed to fetch products:', error.message);
//       return { error: error.message };
//     }
    
//   };
  
const CACHE_KEY = "cachedProducts";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

export const fetchProducts = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);

  if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_EXPIRATION) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    
    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now());
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
    return { error: error.message };
  }
};
