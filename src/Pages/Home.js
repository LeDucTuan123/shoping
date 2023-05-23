import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalCombonents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { fetchAllData } from "../Services/UserServies";
import _, { debounce } from "lodash";

const Home = () => {
  const [theme] = useThemeHook();
  //   const [searchInput, setSearchInput] = useState("");
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

  const handleSearchData = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneProductData = _.cloneDeep(productData);
      cloneProductData = cloneProductData.filter((item) =>
        item.title.includes(term)
      );
      setProductData(cloneProductData);
    } else {
      getResponse();
    }
  }, 1000);

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
          </Col>
          <hr />
        </Row>
        <Row>
          {productData.map((item, index) => {
            return (
              <Col xs={10} md={6} lg={4} xl={3} key={`item-${index}`}>
                <ProductCard index={index} item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
