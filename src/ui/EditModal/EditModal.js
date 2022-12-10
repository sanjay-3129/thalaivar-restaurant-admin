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
  const [quantity, setQuantity] = useState({
    quarter: false,
    half: false,
    full: false,
  });
  // const [imgView, setImgView] = useState(false);

  useEffect(() => {
    let item = props.item;
    if (item !== null) {
      console.log("item", item);
      setItem(item);
      setPrice("normalPrice");
      // if (
      //   item.branch[props.location]["current_price"] === -1
      //   // &&
      //   // item.branch[props.location]["actualPrice"] === -1
      // ) {
      //   let data = {
      //     quarter: false,
      //     half: false,
      //     full: false
      //   };
      //   // if (
      //   //   item.branch[props.location]["quarterPrice"] > 0 &&
      //   //   item.branch[props.location]["cquarterPrice"] > 0
      //   // ) {
      //   //   data.quarter = true;
      //   // }
      //   // if (
      //   //   item.branch[props.location]["halfPrice"] > 0 &&
      //   //   item.branch[props.location]["chalfPrice"] > 0
      //   // ) {
      //   //   data.half = true;
      //   // }
      //   // if (
      //   //   item.branch[props.location]["fullPrice"] > 0 &&
      //   //   item.branch[props.location]["cfullPrice"] > 0
      //   // ) {
      //   //   data.full = true;
      //   // }
      //   // setPrice("quantityPrice");
      //   setQuantity(data);
      // } else {
      //   setPrice("normalPrice");
      // }
    }
  }, [props.item, props.location]);

  const onChangeHandler = (event) => {
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
      ename === "Bestseller" ||
      ename === "isproductavailable"
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
      setItem((prevState) => {
        return {
          ...prevState,
          [props.location]: {
            ...prevState[props.location],
            price: {
              ...prevState[props.location]["price"],
              actualPrice: value,
            },
          },
        };
      });
    } else if (ename === "current_price") {
      setItem((prevState) => {
        let data = {
          ...prevState,
        };
        data.branch[props.location] = {
          ...prevState.branch[props.location],
          [event.target.name]: value,
        };
        return data;
      });
    } else if (ename === "quantity") {
      console.log("quantity", value);
      if (value === "quarter") {
        setQuantity((prevState) => {
          return {
            ...prevState,
            quarter: !prevState.quarter,
          };
        });
      } else if (value === "half") {
        setQuantity((prevState) => {
          return {
            ...prevState,
            half: !prevState.half,
          };
        });
      } else if (value === "full") {
        setQuantity((prevState) => {
          return {
            ...prevState,
            full: !prevState.full,
          };
        });
      }
    } else if (ename === "quarterPrice" || ename === "cquarterPrice") {
      let data = {
        ...item[props.location]["price"],
        quarterPrice: value,
      };
      if (ename === "cquarterPrice") {
        data = {
          ...item[props.location]["price"],
          cquarterPrice: value,
        };
      }
      setItem((prevState) => {
        return {
          ...prevState,
          [props.location]: {
            ...prevState[props.location],
            price: data,
          },
        };
      });
    } else if (ename === "halfPrice" || ename === "chalfPrice") {
      let data = {
        ...item[props.location]["price"],
        halfPrice: value,
      };
      if (ename === "chalfPrice") {
        data = {
          ...item[props.location]["price"],
          chalfPrice: value,
        };
      }
      setItem((prevState) => {
        return {
          ...prevState,
          [props.location]: {
            ...prevState[props.location],
            price: data,
          },
        };
      });
    } else if (ename === "fullPrice" || ename === "cfullPrice") {
      let data = {
        ...item[props.location]["price"],
        fullPrice: value,
      };
      if (ename === "cfullPrice") {
        data = {
          ...item[props.location]["price"],
          cfullPrice: value,
        };
      }
      setItem((prevState) => {
        return {
          ...prevState,
          [props.location]: {
            ...prevState[props.location],
            price: data,
          },
        };
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
          [event.target.name]: value,
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
    // console.log("UpdatedItem", item);
    // when mandatory fields are applied then proceed
    if (price === "quantityPrice") {
      if (
        quantity.quarter === false &&
        quantity.half === false &&
        quantity.full === false
      ) {
        alert("Pick Quantity or Choose Normal Price!!!");
      } else {
        // let count = 0;
        // let trueCount = 0;
        let isUpdate = true;
        if (quantity.quarter === true) {
          // trueCount++;
          if (
            item[props.location]["price"]["quarterPrice"] <= 0 &&
            item[props.location]["price"]["cquarterPrice"] <= 0
          ) {
            alert("Update Prices, If Quarter Quantity is Picked!!!");
            // props.updateItem(item, price, quantity);
            isUpdate = false;
            // count--;
          } else {
            // count++;
          }
        }
        if (quantity.half === true) {
          // trueCount++;
          if (
            item[props.location]["price"]["halfPrice"] <= 0 &&
            item[props.location]["price"]["chalfPrice"] <= 0
          ) {
            alert("Update Prices, If Half Quantity is Picked!!!");
            // props.updateItem(item, price, quantity);
            isUpdate = false;
            // count--;
          } else {
            // count++;
          }
        }
        if (quantity.full === true) {
          // trueCount++;
          if (
            item[props.location]["price"]["fullPrice"] <= 0 &&
            item[props.location]["price"]["cfullPrice"] <= 0
          ) {
            alert("Update Prices, If Full Quantity is Picked!!!");
            // props.updateItem(item, price, quantity);
            isUpdate = false;
            // count--;
          } else {
            // count++;
          }
        }
        if (isUpdate) {
          props.updateItem(item, price, quantity);
          // console.log("isUpdate-if", isUpdate);
        }
        // else {
        //   console.log("isUpdate-else", isUpdate);
        // }
      }
    } else {
      if (
        // item[props.location]["price"]["actualPrice"] > 0 &&
        item.branch[props.location]["current_price"] > 0
      ) {
        props.updateItem(item, price, quantity, "Food");
      } else {
        alert("Update Actual/Current Prices!!!");
      }
    }
  };

  let ui = null;
  if (price !== null) {
    // if (price === "quantityPrice") {
    //   ui = (
    //     <div className="col-12">
    //       <p>
    //         Pick the Quantity
    //         {/* Pick the Quantity<small>&nbsp;(Optional)</small> */}
    //       </p>
    //       <div className={styles.singlerow}>
    //         <input
    //           type="checkbox"
    //           id="quarter"
    //           name="quantity"
    //           value="quarter"
    //           onChange={onChangeHandler}
    //           checked={quantity.quarter}
    //         />
    //         <label htmlFor="quarter" className="label">
    //           Quarter
    //         </label>
    //         <label htmlFor="quaterPrice" className={styles.price}>
    //           Actual Price
    //         </label>
    //         <input
    //           type="number"
    //           className={styles.singlenum}
    //           id="quarterPrice"
    //           name="quarterPrice"
    //           min="0"
    //           value={item[props.location]["price"]["quarterPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //         <label htmlFor="cquaterPrice" className={styles.price}>
    //           Current Price
    //         </label>
    //         <input
    //           type="number"
    //           id="cquarterPrice"
    //           name="cquarterPrice"
    //           min="0"
    //           className={styles.singlenum}
    //           value={item[props.location]["price"]["cquarterPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //       </div>
    //       <div className={styles.singlerow}>
    //         <input
    //           type="checkbox"
    //           id="half"
    //           name="quantity"
    //           value="half"
    //           checked={quantity.half}
    //           onChange={onChangeHandler}
    //         />
    //         <label htmlFor="half" className="label">
    //           Half
    //         </label>
    //         <label htmlFor="halfPrice" className={styles.price}>
    //           Actual Price
    //         </label>
    //         <input
    //           type="number"
    //           id="halfPrice"
    //           className={styles.singlenum}
    //           name="halfPrice"
    //           min="0"
    //           value={item[props.location]["price"]["halfPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //         <label htmlFor="chalfPrice" className={styles.price}>
    //           Current Price
    //         </label>
    //         <input
    //           type="number"
    //           id="chalfPrice"
    //           name="chalfPrice"
    //           min="0"
    //           className={styles.singlenum}
    //           value={item[props.location]["price"]["chalfPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //       </div>

    //       <div className={styles.singlerow}>
    //         <input
    //           type="checkbox"
    //           id="full"
    //           name="quantity"
    //           value="full"
    //           checked={quantity.full}
    //           onChange={onChangeHandler}
    //         />
    //         <label htmlFor="full" className="label">
    //           Full
    //         </label>
    //         <label htmlFor="fullPrice" className={styles.price}>
    //           Actual Price
    //         </label>
    //         <input
    //           type="number"
    //           id="fullPrice"
    //           name="fullPrice"
    //           min="0"
    //           className={styles.singlenum}
    //           value={item[props.location]["price"]["fullPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //         <label htmlFor="cfullPrice" className={styles.price}>
    //           Current Price
    //         </label>
    //         <input
    //           type="number"
    //           id="cfullPrice"
    //           name="cfullPrice"
    //           min="0"
    //           className={styles.singlenum}
    //           value={item[props.location]["price"]["cfullPrice"]}
    //           onChange={onChangeHandler}
    //         />
    //       </div>
    //     </div>
    //   );
    // } else if (price === "normalPrice") {
    // }
    if (price === "normalPrice") {
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
            value={
              item[props.location]["price"]["actualPrice"] > -1 &&
              item[props.location]["price"]["actualPrice"]
            }
            onChange={onChangeHandler}
          /> */}
          <label htmlFor="currentPrice" className={styles.price}>
            Current Price&ensp;
          </label>
          <i className="fas fa-rupee"></i>
          <input
            min="0"
            type="number"
            id="currentPrice"
            className={styles.singlenum}
            name="current_price"
            value={
              item.branch[props.location]["current_price"] > -1 &&
              item.branch[props.location]["current_price"]
            }
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
                    backgroundImage: `url('${item.img}')`,
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
                  {/* <option
                    value="veg"
                    // selected={item.Type === "veg" ? true : false}
                  >
                    Veg
                  </option>
                  <option
                    value="nonveg"
                    // selected={item.Type === "non-veg" ? true : false}
                  >
                    Non-Veg
                  </option> */}
                  <option value="BreakFast">BreakFast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
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
                      value={item.branch[props.location]["unit"]}
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
                      value={item[props.location]["quantityPerUnit"]}
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
                      value={item[props.location]["minimumUnit"]}
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
                      checked={item.branch[props.location]["dealoftheday"]}
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
                      checked={item.isproductavailable}
                      // checked={item[props.location]["isproductavailable"]}
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
                      checked={item.branch[props.location]["Bestseller"]}
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

const EditModal = (props) => {
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

export default EditModal;
