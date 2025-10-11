export const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to connect to API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error connecting to API:', error);
    throw error;
  }
};
