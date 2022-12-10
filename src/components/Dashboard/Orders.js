import React, { useContext, useEffect, useState } from "react";
import { getTodayOrders } from "../../api/OrderDB";
import AuthContext from "../../context/auth-context";
import OrderView from "../../reusable/OrderView";
// import Counter from "./Counter";
import StockMaintainance from "./StockMaintainance";

const Orders = (props) => {
  // const [orderData, setOrderData] = useState({
  //   online: 0,
  //   dinein: 0,
  //   ready: 0,
  //   cancelled: 0
  // });
  const [orders, setOrders] = useState({
    online: [],
    dineIn: []
  });
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let user = authCtx.user;
    if (user !== null) {
      let date = new Date();
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = date.getFullYear();
      date = day + "." + month + "." + year;
      getTodayOrders(
        date,
        props.type,
        user.location,
        (onlineOrders, dineInOrders) => {
          if (orders === "empty" || orders.length === 0) {
            setOrders({
              online: "No Orders",
              dineIn: "No Orders"
            });
          } else {
            setOrders({
              online: onlineOrders,
              dineIn: dineInOrders
            });
          }
        }
      );
    }
  }, [props.type, authCtx.user]);

  return (
    <>
      <div className="col-sm-9 order-maintain">
        {/* <Counter orderData={orderData} /> */}
        {props.type === "food" ? (
          <>
            <div className="row">
              <OrderView type="food" variant="online" orders={orders.online} />
              <OrderView type="food" variant="dineIn" orders={orders.dineIn} />
              {/* <OrderView type="food" /> */}
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <OrderView
                type="grocery"
                variant="online"
                orders={orders.online}
              />
              <OrderView
                type="grocery"
                variant="dineIn"
                orders={orders.dineIn}
              />
            </div>
          </>
        )}
      </div>
      <StockMaintainance />
    </>
  );
};

export default Orders;
