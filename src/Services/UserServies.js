import axios from "./Custumize-Axios";

const fetchAllData = () => {
  return axios.get("/products");
};

export { fetchAllData };
