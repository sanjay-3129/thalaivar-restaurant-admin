import React, { useContext, useEffect, useState } from "react";
// import { getTodayOrders } from "../api/OrderDB";
import OrderDetails from "./OrderDetails";
// import AuthContext from "../context/auth-context";

const OrderView = (props) => {
  let ui = null;
  if (props.orders === null || props.orders === undefined) {
    ui = <p>Loading!!!</p>;
  } else if (props.orders === "No Orders") {
    ui = <p>Today No Orders Yet!!!</p>;
  } else {
    ui = props.orders.map((order) => (
      <OrderDetails key={order.orderId} order={order} />
    ));
  }

  return (
    <div className="col-md-6 orderview">
      <h5
        style={{
          textTransform: "uppercase",
          textAlign: "right",
          lineHeight: "42px"
        }}
      >
        {props.type} orders - {props.variant}
      </h5>
      <div className="scroll">{ui}</div>
    </div>
  );
};

export default OrderView;
