import { useEffect, useState } from "react";
import axios from "./Custumize-Axios";

const fetchAllData = () => {
  return axios.get("/products");
  // https://fakestoreapi.com/auth/login
};

const FetchCreateData = (id, title, price, description, image, category) => {
  axios.post("/products", { id, title, price, description, image, category });
};

const AuthProvider = () => {};

const FetchDetailData = (url) => {
  const [detailData, setDetailData] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setDetailData(res);
    });
  }, [url]);
  return { detailData };
};

//

export { fetchAllData, FetchCreateData, FetchDetailData };
