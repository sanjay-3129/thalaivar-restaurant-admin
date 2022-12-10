import React, { useContext } from "react";
import OrdersContext from "../context/orders-context";

const Counter = (props) => {
  const orderContext = useContext(OrdersContext);
  // console.log("orderData", orderContext);
  return (
    <div className="row header-count">
      <div className="inner-div">
        <div className="card">
          <h5>Online Orders:</h5>
          <p className="count">{orderContext.orderData.online}</p>
        </div>
      </div>
      <div className="inner-div">
        <div className="card">
          <h5>Telephone:</h5>
          <p className="count">{orderContext.orderData.telephone}</p>
        </div>
      </div>
      <div className="inner-div">
        <div className="card">
          <h5>On-Delivery:</h5>
          <p className="count">{orderContext.orderData.ready}</p>
        </div>
      </div>
      <div className="inner-div">
        <div className="card">
          <h5>Cancelled:</h5>
          <p className="count">{orderContext.orderData.cancelled}</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
