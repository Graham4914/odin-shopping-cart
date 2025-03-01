
const CACHE_KEY = "cachedProducts";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

export const fetchProducts = async (retryCount =3) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);

  if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_EXPIRATION) {
    return JSON.parse(cachedData);
  }

  const fetchFromAPI = async (attemptsLeft) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();

      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now());

      return data;
    } catch (error) {
      console.error(`Fetch failed: ${error.message}`);
      if (attemptsLeft > 1) {
        console.warn("Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return fetchFromAPI(attemptsLeft - 1);
      } else {
        console.error("All retry attempts failed.");
        return { error: "Failed to load products. Please try again later." };
      }
    }
  };

  return fetchFromAPI(retryCount);
};