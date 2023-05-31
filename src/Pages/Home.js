import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalCombonents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import ProductCard from "../Components/DetailComponent/ProductCard";
import { fetchAllData } from "../Services/UserServies";
import _, { debounce } from "lodash";
import ModalAddNew from "../Components/Modal/ModalAddNew";

const Home = () => {
  const [theme] = useThemeHook();
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState(productData)
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  
  const getResponse = async () => {
    let res = await fetchAllData();
    if(res){
      setProductData(res)
      setFilter(res)
    }
  };
  useEffect(() => {
    getResponse();
  }, []);
  
  const handleSearchData = debounce((e) => {
    let term = e.target.value;
    let text = term.trim();
    if (text) {
      let cloneProductData = _.cloneDeep(productData);
      cloneProductData = cloneProductData.filter((item) =>
        item.title.includes(text)
      );
      setProductData(cloneProductData);
    } else {
      getResponse();
    }
  }, 1000);

  const addNewProducts = () => {
    setIsShowModalAddNew(true);
  };
  const handleCloseModal = () => {
    setIsShowModalAddNew(false);
  };

  const handleAddProducts = (user) => {
    setProductData([user, ...productData]);
  };
  
  const filterProducts = (text) => {
    const update = productData.filter(item => item.category === text)
    setProductData(update)
    if(!productData){
      setProductData(filter)
    }
  }
  
  return (
    <>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={7}
            lg={6}
            xl={4}
            className="mb-3 mx-a to text-center"
          >
            <h1 className={theme ? "text-light my-5" : "text-black my-5"}>
              Search products
            </h1>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className={
                  theme
                    ? "bg-black text-light-primary"
                    : "bg-light text-light-primary"
                }
              >
                {<BiSearch size="1.7rem" />}
              </InputGroup.Text>
              <FormControl
                placeholder="Search"
                onChange={(e) => handleSearchData(e)}
                className={
                  theme ? "bg-black text-light" : "bg-light text-light-primary"
                }
              />
              {/* <input
                placeholder="Search"
                // value={searchInput}
                onChange={(e) => handleSearchData(e)}
                className={
                  theme ? "bg-black text-light" : "bg-light text-light-primary"
                }
              /> */}
            </InputGroup>
            <button className="btn btn-warning px-3 " onClick={addNewProducts}>
              add Product
            </button>
          </Col>
          <hr />
        </Row>
        <div className="bg-light p-2 col-12 m-1 d-flex align-items-center justify-content-center ">
        <input type="button" value="All" className="btn btn-light" onClick={() => setProductData(filter)} />
         <input type="button" value="men's clothing" className="btn btn-light" onClick={() => filterProducts("men's clothing")} />
          <input type="button" value="jewelery" className="btn btn-light" onClick={() => filterProducts("jewelery")} />
          <input type="button" value="electronics" className="btn btn-light" onClick={() => filterProducts("electronics")} />
          <input type="button" value="women's clothing" className="btn btn-light" onClick={() => filterProducts("women's clothing")} />
        </div>
        <Row>
          {productData.map((item, index) => {
            return (
              <Col xs={10} md={6} lg={4} xl={3} key={`item-${index}`}>
                <ProductCard index={index} item={item} />
              </Col>
            );
          })}
          <ModalAddNew
            show={isShowModalAddNew}
            onHandleCloseModal={handleCloseModal}
            onHandleAddProduct={handleAddProducts}
          />
        </Row>
      </Container>
    </>
  );
};

export default Home;
