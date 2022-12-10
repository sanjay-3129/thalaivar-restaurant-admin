import localforage from "localforage";
import React, { useEffect, useState, useContext } from "react";
import { getMultiTitleItems } from "../../api/ItemDB";
import {
  addTelOrders,
  genrateBillOrder,
  billPaidOrder,
} from "../../api/OrderDB";
import AuthContext from "../../context/auth-context";

const ManualBilling = (props) => {
  const authCtx = useContext(AuthContext);
  const [manual, setManual] = useState(null);
  const [generate, setGenerate] = useState(null);
  useEffect(() => {
    let titles = ["BreakFast", "Lunch", "Dinner"];
    // let titles = ["Lunch", "Dinner"];
    console.log("type", props.type);
    let type = "Food";
    if (props.type !== "food") {
      type = "Grocery";
      titles = [
        "Fruits_Vegetables",
        "Rice",
        "Summer_Drinks_Beverages",
        "soaps",
      ];
    }
    getMultiTitleItems(titles, type, (res) => {
      let list = [];
      res.forEach((item) => {
        item.branch[props.location] !== undefined && list.push(item);
      });
      props.setItems(list);
    });
  }, [props.type]);

  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "manual") {
      setManual(value);
      console.log(value);
    } else if (name === "gennbill") {
      setGenerate(value);
    }
  };

  const addteleorder = () => {
    addTelOrders(props.currentOrder, props.type, props.location, (isAdded) => {
      if (isAdded) {
        // db added
        window.alert("Successfully Added!!!");
        removeOrder(props.currentOrder.orderId, props.type);
      } else {
        // error not adding
        window.alert("Not Added... Try Again!!!");
      }
    });
  };

  const generateBill = () => {
    // console.log("hjlllll");
    // setGenerate("gennbill");
    // genrateBillOrder(props.currentOrder);
    props.generateBill();
    // if (props.type === "food") {
    // let foodOrderList = [];
    // localforage
    //   .getItem("food-order")
    //   .then((value) => {
    //     console.log("fOrde", value);
    //     if (value === null) {
    //       // new order
    //     }
    //   })
    //   .catch((e) => console.log(e));
    // }
    // localforage.setItem("food-order", props.currentOrder);
  };

  const removeOrder = (orderId, type) => {
    props.removeOrder(orderId, type);
  };

  const paidOrders = () => {
    // console.log("hjlllll");
    billPaidOrder(props.currentOrder, props.type, props.location, (isAdded) => {
      if (isAdded) {
        window.alert("Successfully Added to local store!!!");
      } else {
        // error not adding
        window.alert("Not Added... Try Again!!!");
      }
    });
  };

  return (
    <div className="manual row">
      <div>
        <input
          type="radio"
          id="dineIn"
          name="manual"
          value="dineIn"
          onChange={onChangeHandler}
        />
        <label htmlFor="dineIn">&nbsp;Dine-In</label>
      </div>
      <div style={{ marginRight: "auto", padding: "0 5px" }}>
        <input
          type="radio"
          id="telephone"
          name="manual"
          value="telephone"
          onChange={onChangeHandler}
        />
        <label htmlFor="telephone">&nbsp;Telephone order</label>
      </div>
      <div className="col-12"></div>

      <div className="billno">
        <button
          type="button"
          className="add"
          onClick={() => props.createOrder(manual)}
          disabled={!manual}
        >
          New Order <b>+</b>
        </button>
        <h4>Ongoing Bills</h4>
        <div className="scroll">
          {props.ongoingOrders.map((order) => {
            return (
              <div
                key={order.orderId}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => props.setCurrentOrder(order)}
              >
                <p className="bno">{order.orderId}</p>
                <p className="number">{order.userDetails.phone}</p>
                <p className="tq">{order.noOfItems}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="billdetails">
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {/* {console.log(props.currentOrder)} */}
          <p className="bno">{props.currentOrder.orderId}</p>
          <p className="text">Bill Details</p>
          {props.ongoingOrders.length > 0 && props.currentOrder.orderId !== "" && (
            <>
              <input
                list="searchItem"
                name="searchItems"
                id="searchItems"
                autoComplete="off"
                placeholder="Type to search..."
                onChange={props.onChange}
                style={{ outline: "0", cursor: "pointer" }}
              />
              <datalist id="searchItem">
                {props.items.map((item) => {
                  return <option key={item.id} value={item.Name} />;
                })}
              </datalist>
            </>
          )}
        </div>
        <div className="row head">
          <p className="iname">Item Name</p>
          <p className="ino">Item Size</p>
          <p className="quantity">Quantity</p>
          <p className="rate">Rate</p>
          <p className="price">Price</p>
        </div>
        <div className="scroll">
          {props.currentOrder.items.map((item, i) => {
            let priceUi = (
              <>
                <p className="ino">{item.itemQuantity}</p>
                <input
                  name="itemSize"
                  type="number"
                  className="quantity"
                  placeholder="0"
                  min="0"
                  value={item.itemSize}
                  onChange={(e) => props.onChange(e, item)}
                />
                <p className="rate">{item.itemPrice}</p>
              </>
            );
            if (
              // item.branch[props.location].actualPrice === -1 &&
              item.branch[props.location].current_price === -1 &&
              item.branch[props.location].length === undefined
            ) {
              priceUi = (
                <>
                  <p className="ino">
                    <select
                      className="itemId"
                      name="itemQuantity"
                      value={item.itemQuantity}
                      onChange={(e) => props.onChange(e, item)}
                    >
                      <option value="quarter">Quarter</option>
                      <option value="half">Half</option>
                      <option value="full">Full</option>
                    </select>
                  </p>
                  <input
                    name="itemSize"
                    type="number"
                    className="quantity"
                    placeholder="0"
                    min="0"
                    value={item.itemSize}
                    onChange={(e) => props.onChange(e, item)}
                  />
                  <p className="rate">{item.itemPrice}</p>
                </>
              );
            } else if (item.branch[props.location].length >= 0) {
              priceUi = (
                <>
                  <p className="ino">
                    <select
                      className="itemId"
                      name="itemQuantity"
                      value={item.itemQuantity}
                      onChange={(e) => props.onChange(e, item)}
                    >
                      <option value="grams">Grams</option>
                      <option value="kilograms">KiloGrams</option>
                      <option value="litres">Litres</option>
                      <option value="kilolitres">KiloLitres</option>
                    </select>
                  </p>
                  <input
                    name="itemSize"
                    type="number"
                    className="quantity"
                    placeholder="0"
                    min="0"
                    value={item.itemSize}
                    onChange={(e) => props.onChange(e, item)}
                  />
                  <p className="rate">{item.itemPrice}</p>
                </>
              );
            }
            return (
              <div className="row item" key={item.id}>
                <p name="itemName" className="iname">
                  {item.Name}
                </p>
                {priceUi}
                {/* {console.log("itemsss", item)} */}
                <p className="price">{item.itemSize * item.itemPrice}</p>
                <i
                  class="fa fa-minus-circle remove-item"
                  aria-hidden="true"
                  onClick={() => props.removeItem(item.id)}
                ></i>
              </div>
            );
          })}
          {/* <div className="row item">
            <p className="ino">243</p>
            <input
              type="text"
              className="iname"
              placeholder="Chicken Briyani"
            />
            <input type="number" className="quantity" placeholder="0" />
            <p className="rate">120</p>
            <p className="price">240</p>
          </div> */}
        </div>
        {/* <button type="button" className="add">
          +
        </button> */}
        <div className="footer row">
          <p className="iname">Total</p>
          <p className="quantity">{props.currentOrder.noOfItems}</p>
          <p className="rate">=</p>
          <p className="price">{props.currentOrder.totalPrice}</p>
        </div>
      </div>
      {props.currentOrder.type === "dinein" ? (
        <>
          <div className="billgenerate">
            <h4>Bill Status</h4>
            <p className="bno">
              Order-Id:&ensp;<b>{props.currentOrder.orderId}</b>
            </p>
            <p className="number">
              Name:&ensp;
              <input
                type="text"
                name="username"
                value={props.currentOrder.userDetails.userName}
                onChange={props.onChange}
              />
            </p>
            <p className="number">
              Phone:&ensp;
              <input
                type="tel"
                name="phone"
                size="15"
                value={props.currentOrder.userDetails.phone}
                onChange={props.onChange}
              />
            </p>
            <p className="address">
              Address:&ensp;
              <textarea
                name="address"
                size="15"
                value={props.currentOrder.userDetails.userAddress}
                onChange={props.onChange}
              />
            </p>
            <p className="tq">
              Total Quantity:&ensp;<b>{props.currentOrder.noOfItems}</b>
            </p>
            <p className="tp">
              Total Price:&ensp;<i className="fas fa-rupee"></i>
              <b>{props.currentOrder.totalPrice}</b>
            </p>
            <p className="tq">
              Mode Of
              <br />
              Payment:&ensp;
              <select
                name="paymentMode"
                value={props.currentOrder.payment.paymentMethod}
                onChange={props.onChange}
              >
                <option value="cash">Cash</option>
                <option value="debit/credit">Debit/Credit</option>
                <option value="phonepe">Phone-Pe</option>
                <option value="gpay">GPay</option>
              </select>
            </p>

            {generate === "gennbill" ? (
              <>
                <button type="button" value="paid" onClick={paidOrders}>
                  Paid
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  name="gennbill"
                  value="gennbill"
                  onClick={generateBill}
                >
                  Generate Bill
                </button>
                <br />
                <button
                  type="button"
                  name="gennbill"
                  value="gennbill"
                  onClick={() =>
                    removeOrder(props.currentOrder.orderId, props.type)
                  }
                >
                  Remove Order
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="billgenerate">
            <h4>Adding telephone orders</h4>
            <p className="bno">
              Order-Id:&ensp;<b>{props.currentOrder.orderId}</b>
            </p>
            <p className="number">
              Name:&ensp;
              <input
                type="text"
                name="username"
                size="15"
                value={props.currentOrder.userDetails.userName}
                onChange={props.onChange}
              />
            </p>
            <p className="number">
              Phone:&ensp;
              <input
                type="tel"
                name="phone"
                size="15"
                value={props.currentOrder.userDetails.phone}
                onChange={props.onChange}
              />
            </p>
            <p className="address">
              Address:&ensp;
              <textarea
                name="address"
                size="15"
                value={props.currentOrder.userDetails.userAddress}
                onChange={props.onChange}
              />
            </p>
            <p className="tq">
              Total Quantity:&ensp;<b>{props.currentOrder.noOfItems}</b>
            </p>
            <p className="tp">
              Total Price:&ensp;<i className="fas fa-rupee"></i>
              <b>{props.currentOrder.totalPrice}</b>
            </p>
            <p className="tq">
              Mode Of
              <br />
              Payment:&ensp;
              <select
                name="paymentMode"
                value={props.currentOrder.payment.paymentMethod}
                onChange={props.onChange}
              >
                <option value="cash">Cash</option>
                <option value="debit/credit">Debit/Credit</option>
                <option value="phonepe">Phone-Pe</option>
                <option value="gpay">GPay</option>
              </select>
            </p>
            <button type="button" onClick={addteleorder}>
              Move to preparing
            </button>
            <br />
            <button
              type="button"
              name="gennbill"
              value="gennbill"
              onClick={() =>
                removeOrder(props.currentOrder.orderId, props.type)
              }
            >
              Remove Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManualBilling;
