import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useThemeHook } from "../GlobalCombonents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
const Cart = () => {
  const [theme] = useThemeHook();
  const {
    isEmpty,
    // totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  return (
    <>
      <Container className="py-4 mt-5">
        <h1
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-6 text-center`}
        >
          {/*  */}
          {isEmpty ? "Your cart is Empty" : "The Cart"}
        </h1>
        <Row className="justify-content-center">
          <Table
            responsive="sm"
            striped
            bordered
            hover
            variant={theme ? "dark" : "light"}
            className="mb-5"
          >
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={`item-cart-${index}`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/products/${item.id}`}>
                        <div
                          style={{
                            backgroundColor: "white",
                            height: "8rem",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "inherit",
                          }}
                        >
                          <div style={{ padding: ".5rem" }}>
                            <img
                              src={item.image}
                              style={{ width: "4rem" }}
                              alt={item.title}
                            />
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <h6
                        style={{
                          whiteSpace: "nowrap",
                          width: "14rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </h6>
                    </td>
                    <td>₫{item.price}</td>
                    <td>SL: {item.quantity}</td>
                    <td>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="ms-2 btn btn-light"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="ms-2 btn btn-light"
                      >
                        +
                      </button>
                      <button
                        variant="danger"
                        className="btn btn-danger ms-2"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* tính tổng tiền */}
          {!isEmpty && (
            <Row
              style={{ position: "fixed", bottom: 0 }}
              className={`${
                theme ? "bg-light-black text-light" : "bg-light text-black"
              } justify-content-center w-100`}
            >
              <Col className="py-2">
                <h4>Total Price: {cartTotal}</h4>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => emptyCart()} //emptycart clear hết sản phẩm trong giỏ hàng
                >
                  <BsCartX size="1.7rem" />
                  Clear Cart
                </Button>
              </Col>
            </Row>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Cart;
