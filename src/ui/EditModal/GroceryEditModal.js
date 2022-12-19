import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./EditModal.module.css";
import "./EditModal.css";
import Card from "../Card/Card";
import Backdrop from "../Backdrop";
import $ from "jquery";

const ModalOverlay = (props) => {
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState([]);
  // const [imgView, setImgView] = useState(false);

  useEffect(() => {
    let item = props.item;
    if (item !== null) {
      console.log("item", item);
      setItem(item);
      setPrice("normalPrice");
      // if (item.branch[props.location]["current_price"] === undefined) {
      //   setPrice("quantityPrice");
      //   setQuantity(item[props.location]["price"]);
      // } else {
      //   setPrice("normalPrice");
      // }
    }
  }, [props.item, props.location]);

  const onChangeHandler = (event, id) => {
    // console.log("event.name", event.target.name, event.target.value, item);
    // setChecked((prevState) => !prevState);
    let value = event.target.value;
    let ename = event.target.name;
    // console.log("ename", ename, value);

    if (ename === "img") {
      value = event.target.files[0];
      // console.log("url", URL.createObjectURL(value));
      setItem((prevState) => {
        return {
          ...prevState,
          [ename]: value,
        };
      });
    } else if (
      ename === "dealoftheday" ||
      ename === "onsale" ||
      ename === "isproductavailable" ||
      ename === "Bestseller"
    ) {
      if (ename === "isproductavailable") {
        setItem((prevState) => {
          value = !prevState[event.target.name];
          return {
            ...prevState,
            [ename]: value,
          };
        });
      } else {
        setItem((prevState) => {
          value = !prevState.branch[props.location][event.target.name];
          // console.log(event.target.name, value);
          let data = {
            ...prevState,
          };
          data.branch[props.location] = {
            ...prevState.branch[props.location],
            [event.target.name]: value,
          };
          return data;
        });
      }
    } else if (ename === "price") {
      setPrice(value);
    } else if (ename === "actualPrice") {
      if (price === "normalPrice") {
        // console.log("actualPrice-normal", value);
        setItem((prevState) => {
          return {
            ...prevState,
            [props.location]: {
              ...prevState[props.location],
              price: {
                ...prevState[props.location]["price"],
                actualPrice: parseFloat(value),
              },
            },
          };
        });
      } else {
        setQuantity((prevState) => {
          // console.log("actualPrice-quan", prevState);
          let list = [...prevState];
          let index = list.findIndex((item) => {
            return item.id === id;
          });
          let data = {
            ...list[index],
            [ename]: parseFloat(value),
          };
          list[index] = data;
          return [...list];
        });
      }
    } else if (ename === "current_price") {
      if (price === "normalPrice") {
        // console.log("currPrice-normal", value);
        setItem((prevState) => {
          let data = {
            ...prevState,
          };
          data.branch[props.location] = {
            ...prevState.branch[props.location],
            [ename]: value,
          };
          return data;
        });
      } else {
        // console.log("currPrice-quant", value);
        setQuantity((prevState) => {
          let list = [...prevState];
          let index = list.findIndex((item) => {
            return item.id === id;
          });
          let data = {
            ...list[index],
            [ename]: parseFloat(value),
          };
          list[index] = data;
          return [...list];
        });
      }
    } else if (ename === "quantity") {
      // console.log("quantity", value);
      setQuantity((prevState) => {
        let list = [...prevState];
        let index = list.findIndex((item) => {
          return item.id === id;
        });
        let data = "";
        data = {
          ...list[index],
          [ename]: parseFloat(value),
        };
        list[index] = data;
        return [...list];
      });
    } else if (ename === "units") {
      // console.log("units", value);
      setQuantity((prevState) => {
        let list = [...prevState];
        let index = list.findIndex((item) => {
          return item.id === id;
        });
        let data = {
          ...list[index],
          [ename]: value,
        };
        list[index] = data;
        return [...list];
      });
    } else if (
      ename === "unit" ||
      ename === "quantityPerUnit" ||
      ename === "minimumUnit"
    ) {
      setItem((prevState) => {
        let data = {
          ...prevState,
        };
        data.branch[props.location] = {
          ...prevState.branch[props.location],
          [ename]: value,
        };
        return data;
        // return {
        //   ...prevState,
        //   [props.location]: {
        //     ...prevState[props.location],
        //     [ename]: value,
        //   },
        // };
      });
    } else {
      setItem((prevState) => {
        return {
          ...prevState,
          [event.target.name]: value,
        };
      });
    }
  };

  const getFile1 = () => {
    $("#uploadButton1").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton1").css(
          "background-image",
          'url("' + reader.result + '")'
        );
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
      }
    });
  };

  const submitHandler = () => {
    // console.log("UpdatedItem", item, quantity, price);
    let isAddItem = true;
    if (price === "normalPrice") {
      if (
        // item[props.location].price.actualPrice <= 0 ||
        item.branch[props.location].current_price <= 0 ||
        // item[props.location].price.actualPrice === undefined ||
        item.branch[props.location].current_price === undefined
      ) {
        alert("Price should be greater than 0 to proceed further!!!");
        isAddItem = false;
      }
    } else {
      for (let i = 0; i < quantity.length; i++) {
        if (quantity[i].units === "") {
          alert("Select units for all quantity like kilogram, liters etc!!!");
          isAddItem = false;
          break;
        } else if (
          quantity[i].quantity <= 0 ||
          quantity[i].actualPrice <= 0 ||
          quantity[i].currentPrice <= 0
        ) {
          alert("Quantity or Price should not be 0!!!");
          isAddItem = false;
          break;
        }
      }
    }
    if (isAddItem) {
      props.updateItem(item, price, quantity, "Grocery");
    }
  };

  const addMoreQuantity = () => {
    setQuantity((prevState) => {
      let price = prevState;
      let newId = price.length; // if already two elements[0, 1] then next element id will be [0, 1, 2]
      let data = {
        id: newId,
        quantity: 0,
        units: "",
        actualPrice: 0,
        currentPrice: 0,
      };
      // price = [...price, data];
      return [...price, data];
    });
  };

  const reduceQuantity = () => {
    setQuantity((prevState) => {
      let price = prevState;
      // let prevState = props.item.priceItem;
      if (price.length > 1) {
        price.pop();
      }
      return [...price];
    });
  };

  let ui = null;
  if (price !== null) {
    if (price === "quantityPrice") {
      ui = (
        <div className="col-12">
          <p>
            Pick the Quantity
            {/* Pick the Quantity<small>&nbsp;(Optional)</small> */}
          </p>
          {quantity.map((price) => {
            return (
              <div className={styles.singlerow} key={price.id}>
                <div className="pic">
                  <input
                    className="pics"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    max="1000"
                    value={price.quantity}
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                  />

                  <select
                    className="amo"
                    name="units"
                    id="units"
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                    value={price.units}
                  >
                    <option value="">--Select--</option>
                    <option value="grams">grams</option>
                    <option value="kilograms">kilograms</option>
                    <option value="millilitres">millilitres</option>
                    <option value="litres">litres</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quarterPrice" className={styles.price}>
                    Actual Price&ensp;
                  </label>
                  <i className="fas fa-rupee"></i>
                  <input
                    type="number"
                    className={styles.singlenum}
                    id="actualPrice"
                    name="actualPrice"
                    min="0"
                    value={price.actualPrice}
                    onChange={(e) => onChangeHandler(e, price.id)}
                  />
                  <label htmlFor="cquaterPrice" className={styles.price}>
                    Current Price&ensp;
                  </label>
                  <i className="fas fa-rupee"></i>
                  <input
                    type="number"
                    id="currentPrice"
                    name="currentPrice"
                    min="0"
                    className={styles.singlenum}
                    value={price.currentPrice}
                    onChange={(e) => onChangeHandler(e, price.id)}
                  />
                </div>
              </div>
            );
          })}
          <button className="plus" type="button" onClick={addMoreQuantity}>
            <i class="fas fa-plus-circle"></i>
          </button>
          <button className="neg" type="button" onClick={reduceQuantity}>
            <i class="fas fa-minus-circle"></i>
          </button>
        </div>
      );
    } else if (price === "normalPrice") {
      ui = (
        <div className="col-12 price">
          {/* <label htmlFor="actualPrice" className={styles.price}>
            Actual Price&ensp;
          </label>
          <i className="fas fa-rupee"></i>
          <input
            min="0"
            type="number"
            id="actualPrice"
            name="actualPrice"
            style={{ marginRight: "15px" }}
            className={styles.singlenum}
            value={item[props.location].price.actualPrice}
            onChange={onChangeHandler}
          /> */}
          <label htmlFor="current_price" className={styles.price}>
            Current Price&ensp;
          </label>
          <i className="fas fa-rupee"></i>
          <input
            min="0"
            type="number"
            id="current_price"
            className={styles.singlenum}
            name="current_price"
            value={item.branch[props.location].current_price}
            onChange={onChangeHandler}
          />
        </div>
      );
    }
  }

  return (
    <div class={styles.modal}>
      {item !== null && (
        <Card>
          <div class={styles.row}>
            <div class={styles.left}>
              <div class="upload-img">
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={() => {
                    getFile1();
                    // setImgView(true);
                  }}
                  htmlFor="img"
                  id="uploadButton1"
                  style={{
                    backgroundImage: `url('${props.img}')`,
                  }}
                >
                  <span>+</span>
                </label>
              </div>
              <div
                class="row"
                style={{ justifyContent: "end", paddingTop: "15px" }}
              >
                <button
                  type="button"
                  class={styles.btn}
                  style={{ marginRight: "10px" }}
                  onClick={submitHandler}
                >
                  Save
                </button>
                <button
                  type="button"
                  class={styles.btn}
                  onClick={props.onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div class={styles.right}>
              <div class="row">
                <div
                  class={styles.col}
                  style={{ width: "30%", paddingRight: "10px" }}
                >
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    class={styles.input}
                    alt="productname"
                    value={item.Name}
                    onChange={onChangeHandler}
                  />
                </div>
                <div class={styles.col} style={{ width: "70%" }}>
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    class={styles.input}
                    alt="productdescrb"
                    value={item.description}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div
                class="row"
                style={{ justifyContent: "space-between", padding: "15px 0" }}
              >
                {/* <select
                  class={styles.select}
                  name="style"
                  id="style"
                  onChange={onChangeHandler}
                  value={item.style}
                >
                  <option
                    value="southindian"
                    // selected={item.style === "southindian" ? true : false}
                  >
                    SouthIndian
                  </option>
                  <option
                    value="chinese"
                    // selected={item.style === "chinese" ? true : false}
                  >
                    Chinese
                  </option>
                </select> */}
                {/* <select class={styles.select} name="category" id="category">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select> */}
                <select
                  class={styles.select}
                  name="Type"
                  id="Type"
                  onChange={onChangeHandler}
                  value={item.Type}
                >
                  <option value="Fruits_Vegetables">Fruits_Vegetables</option>
                  <option value="Rice">Rice</option>
                  <option value="Summer_Drinks_Beverages">
                    Summer_Drinks_Beverages
                  </option>
                  <option value="soaps">Soaps</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Organics">Organics</option>
                </select>
              </div>
              <div class="row" style={{ justifyContent: "space-between" }}>
                <div class={styles.col} style={{ width: "48%" }}>
                  <div
                    class="row"
                    style={{
                      justifyContent: "space-between",
                      padding: "5px 0",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="actualUnit">Actual Unit:</label>
                    <input
                      type="number"
                      class={styles.number}
                      id="unit"
                      name="unit"
                      min="0"
                      onChange={onChangeHandler}
                      value={item.branch[props.location].unit}
                    />
                    {/* <label htmlFor="quantityPerUnit" style={{ margin: "0" }}>
                      Quantity Per Unit
                    </label>
                    <input
                      type="number"
                      class={styles.number}
                      id="quantityPerUnit"
                      name="quantityPerUnit"
                      min="1"
                      value={item[props.location].quantityPerUnit}
                      onChange={onChangeHandler}
                    /> */}
                  </div>
                  {/* <div
                    class="row"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="unit" style={{ margin: "0" }}>
                      Minimal Unit
                    </label>
                    <input
                      type="number"
                      class={styles.number}
                      id="minimumUnit"
                      name="minimumUnit"
                      min="0"
                      value={item[props.location].minimumUnit}
                      onChange={onChangeHandler}
                    />
                  </div> */}
                </div>
                <div class={styles.col} style={{ width: "48%" }}>
                  <div className={styles.single}>
                    <input
                      type="checkbox"
                      id="dealoftheday"
                      name="dealoftheday"
                      className={styles.check}
                      checked={item.branch[props.location].dealoftheday}
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="dealoftheday" className={styles.label}>
                      Deal of the day
                    </label>
                  </div>
                  {/* <div className={styles.single}>
                    <input
                      type="checkbox"
                      id="onSale"
                      name="onSale"
                      className={styles.check}
                      // checked={item.dealoftheday}
                    />
                    <label htmlFor="onSale" className={styles.label}>
                      On Sale
                    </label>
                  </div> */}
                  <div className={styles.single}>
                    <input
                      type="checkbox"
                      id="isproductavailable"
                      name="isproductavailable"
                      className={styles.check}
                      // checked={item[props.location].isproductavailable}
                      checked={item.isproductavailable}
                      onChange={onChangeHandler}
                    />
                    <label
                      htmlFor="isproductavailable"
                      className={styles.label}
                    >
                      Product Available
                    </label>
                  </div>
                  <div className={styles.single}>
                    <input
                      type="checkbox"
                      id="Bestseller"
                      name="Bestseller"
                      className={styles.check}
                      checked={item.branch[props.location].Bestseller}
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="Bestseller" className={styles.label}>
                      Best Seller
                    </label>
                    {/* <label htmlFor="top">Top Product</label> */}
                  </div>
                </div>
              </div>
              <div className="row pricecol">
                <div className="col-4">
                  <input
                    type="radio"
                    id="normalPrice"
                    name="price"
                    value="normalPrice"
                    checked={price !== null && price === "normalPrice"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="normalPrice">&nbsp;Normal Price</label>
                </div>
                {/* <div className="col-6">
                  <input
                    type="radio"
                    id="quantityPrice"
                    name="price"
                    value="quantityPrice"
                    checked={price !== null && price === "quantityPrice"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="quantityPrice">
                    &nbsp;Quantity Based Price
                  </label>
                </div> */}
                {ui}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const GroceryEditModal = (props) => {
  // console.log("edit", props.item);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.closeModal}
          // title={props.title}
          updateItem={props.updateItem}
          item={props.item}
          location={props.location}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default GroceryEditModal;
