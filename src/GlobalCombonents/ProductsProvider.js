import { useState, createContext, useEffect } from "react";
import { fetchAllData } from "../Services/UserServies";

const ProductsContect = createContext();

function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const getResponse = async () => {
    let res = await fetchAllData();
    if (res) {
      setProductData(res);
    }
  };
  useEffect(() => {
    getResponse();
  }, []);

  const handleAddProducts = (user) => {
    setProductData([user, ...productData]);
  };
  const setProduct = (data) => setProductData(data);

  const value = {
    productData,
    setProduct,
    getResponse,
    handleAddProducts,
  };
  return (
    <ProductsContect.Provider value={value}>
      {children}
    </ProductsContect.Provider>
  );
}

export { ProductsContect, ProductProvider };
