import { useEffect, useState } from "react";
import "./Tables.css";

const Tables = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  let ui = null;
  if (orders.length === 0 || orders === "empty") {
    ui = (
      <tr>
        <td style={{ textAlign: "center" }}>No Orders</td>
      </tr>
    );
  } else {
    ui = orders.map((order) => {
      return (
        <tr key={order.orderId}>
          <td>{order.orderId}</td>
          <td>
            <p style={{ textTransform: "capitalize" }}>
              {order.userDetails.userName}
            </p>
            <p>{order.userDetails.phone}</p>
          </td>
          <td>{order.userDetails.userAddress}</td>
          <td>
            {order.order_items.map((item) => {
              return (
                <p key={item.itemId}>
                  {item.itemName} - {item.itemSize} - ₹{item.itemPrice}
                </p>
              );
            })}
          </td>
          <td>₹{order.totalPrice}</td>
          <td style={{ textTransform: "capitalize" }}>{order.status}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <table className="table table-bordered table-hover center">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User</th>
            <th>Address</th>
            <th>Items Purchased</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{ui}</tbody>
      </table>
    </>
  );
};

export default Tables;
