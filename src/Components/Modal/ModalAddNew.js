import { Button, Modal } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./ModalAddNew.module.scss";
import { memo, useState } from "react";
import { FetchCreateData } from "../../Services/UserServies";
// import {Products}

const cx = classNames.bind(style);

const ModalAddNew = (props) => {
  const { show, onHandleCloseModal, onHandleAddProduct } = props;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
  };
  console.log("re-render");
  const handleSave = async () => {
    let id = Math.floor(Math.random() * 1000);
    FetchCreateData(id, title, price, description, image, category);
    onHandleAddProduct({
      id: id,
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    });
    onHandleCloseModal();
    resetForm();
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={onHandleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={cx("modal")}>
            {/* title */}
            <div className="mb-2 row">
              <label className={cx("col-sm-3", "text")}>Title: </label>
              <input
                type="text"
                className={cx("col-sm-7", "form-controll")}
                placeholder="Title..."
                name={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* price */}
            <div className="mb-2">
              <label className={cx("col-sm-3", "text")}>Price: </label>
              <input
                type="number"
                className={cx("col-sm-7", "form-controll")}
                placeholder="Price...$$$"
                name={price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* description */}
            <div className="mb-2">
              <label className={cx("col-sm-3", "text")}>description: </label>
              <input
                type="text"
                className={cx("col-sm-7", "form-controll")}
                placeholder="Title..."
                name={description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* category */}
            <div className="mb-2">
              <label className={cx("col-sm-3", "text")}>category: </label>
              <input
                type="text"
                className={cx("col-sm-7", "form-controll")}
                placeholder="Title..."
                name={category}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {/* image */}
            <div className="mb-2">
              <label className={cx("col-sm-3", "text")}>image: </label>
              <input
                type="file"
                // className={cx("form-controll")}
                name={image}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(ModalAddNew);
