/* eslint-disable jsx-a11y/alt-text */
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDetailData } from "../../Services/UserServies";
import { Col, Container, Row } from "react-bootstrap";
import { VscStarFull } from "react-icons/vsc";
import classNames from "classnames/bind";
import style from "./DetailComponent.module.scss";
import { BiCart } from "react-icons/bi";
import { useCart } from "react-use-cart";

const cx = classNames.bind(style);

const DetailComponent = (props) => {
  let { id } = useParams();
  // const { detailData: data } = FetchDetailData(`/products/${id}`);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  let Response = FetchDetailData(id); //fetch data api

  const response = async () => {
    let res = await Response;
    setTimeout(() => {
      if (res) {
        setData(res);
        setLoading(true);
      }
    }, 2000);
  };
  useEffect(() => {
    response();
  }, []);

  let discount = data.price - (data.price * 30) / 100;
  //them vao gio hang`
  const { addItem } = useCart();
  const addToCart = () => {
    addItem(data);
  };
  return (
    <>
      <Container>
        <div className={cx(" py-5 mt-4")}>
          <div className={cx("bg-light-2", "p-2")}>
            {loading ? (
              <Row >
                <Col sm="5">
                  <div className={cx("img")}>
                    <img src={data.image} />
                  </div>
                </Col>
                <Col sm="7">
                  <div>
                    <div className={cx("title")}>{data.title}</div>
                    <div className="flex flex-column">
                      <div className={cx("flex flex-column", "block-price")}>
                        <div>
                          <span className={cx("discount")}>${discount}</span>
                          <span className={cx("price")}>${data.price}</span>
                          
                        </div>
                        <div className="mt-2">
                          <label>Đánh giá: </label>
                          <span className="m-2">
                            {data.rating.rate}
                            <VscStarFull
                              size="1.2rem"
                              style={{
                                marginTop: "-5px",
                                color: "red",
                              }}
                            />{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("block-text")}>
                      <div className={cx("flex flex-column")}>
                        <div className={cx("row ", "text")}>
                          <div className="col-sm-2">
                            <label>
                              <b>Miêu tả sản phẩm :</b>{" "}
                            </label>
                          </div>
                          <div className="col-sm-10">{data.description}</div>
                          <div className="mt-4">
                            <label className="col-sm-2">
                              <b>loại :</b>
                            </label>
                            <span>{data.category}</span>
                          </div>
                          <div className="mt-4">
                            <label className="col-sm-2">Đã bán : </label>
                            <span>{data.rating.count} cái</span>
                          </div>
                          <div className="mt-4 ">
                            <button
                              className={cx("btn-add-cart")}
                              onClick={() => addToCart()}
                            >
                              <BiCart size="1.6rem" className="mx-2" />
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <span className="py-5 mt-4 justify-content-center">
                <h1>Loading...</h1>
              </span>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(DetailComponent);
