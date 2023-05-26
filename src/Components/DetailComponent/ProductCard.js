import { Button, Card } from "react-bootstrap";
import { useThemeHook } from "../../GlobalCombonents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  let { item } = props;
  const [theme] = useThemeHook();
  const { addItem } = useCart();

  const addToCart = () => {
    addItem(item);
  };

  return (
    <>
      <Card
        style={{ width: "17rem", minHeight: "450px" }}
        className={`${
          theme ? "bg-light text-dark" : "bg-light text-black"
        } text-center p-10 overflow-hidden shadow mb-4`}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "15rem",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "inherit",
          }}
        >
          <div style={{ width: "9rem" }}>
            <Link to={`/products/${item.id}`}>
              <Card.Img variant="top" src={item.image} className=" img-fluid" />
            </Link>
          </div>
        </div>
        <Card.Body
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Card.Title>Thời trang </Card.Title>
          <Card.Title>
            <span>{item.title}</span>
          </Card.Title>
          <Card.Title>
            <span> Price: ₫{item.price}</span>{" "}
          </Card.Title>

          <Button
            onClick={() => addToCart()}
            className={`${
              theme ? "btn-secondary text-black" : "btn-secondary text-light"
            } d-flex align-item-center m-auto border-0`}
          >
            Thêm vào giỏ hàng
            <BsCartPlus size="1.8rem" />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
