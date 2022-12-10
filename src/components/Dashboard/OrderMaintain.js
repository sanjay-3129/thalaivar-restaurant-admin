import React, { useEffect, useState } from "react";
import { getDeliveredOrders } from "../../api/OrderDB";
import DeliveryModal from "../../ui/DeliveryModal/DeliveryModal";

const OrderMaintain = (props) => {
  const [assignModal, setAssignModal] = useState(false);
  const [orders, setOrders] = useState(undefined);

  const deliveryAssignHandler = (order) => {
    setAssignModal(order);
  };

  useEffect(() => {
    if (location.pathname.includes("delivered")) {
      getDeliveredOrders(props.type, props.location, (orders) => {
        console.log("delvieredOrders", orders);
        setOrders(orders);
      });
    } else {
      setOrders(props.orders);
    }
  }, [props.orders]);

  return (
    <>
      {assignModal && (
        <DeliveryModal
          orders={props.orders}
          order={assignModal}
          assignDeliveryUser={(order, user) => {
            props.assignDeliveryUser(order, user);
            setAssignModal(false);
          }}
          closeModal={() => setAssignModal(false)}
        />
      )}
      <div class="order-head row">
        <p className="oid">Order ID</p>
        <p className="uname">User Name</p>
        <p className="add">Address</p>
        <p className="date">In Time</p>
        <p className="cat">Category</p>
        <p className="amount">Amount</p>
        <p className="tq">Qty</p>
        <p className="tp">Total Price</p>
        <p className="status">Status</p>
      </div>
      {orders === undefined || orders === null
        ? "No Orders"
        : orders.map((order) => {
            let timestamp = new Date(parseInt(order.timestamp));
            let year = timestamp.getFullYear();
            let month = timestamp.getMonth() + 1;
            if (month < 10) {
              month = "0" + month;
            }
            let day = timestamp.getDate();
            if (day < 10) {
              day = "0" + day;
            }
            let hours = timestamp.getHours();
            let mins = timestamp.getMinutes();
            let timePeriod = "AM";
            if (hours > 12) {
              timePeriod = "PM";
              hours = hours - 12;
            }
            if (hours < 10) {
              hours = "0" + hours;
            }
            if (mins < 10) {
              mins = "0" + mins;
            }
            return (
              <details className="order-view" key={order.orderId}>
                <summary className="row">
                  <p className="oid">#{order.orderId}</p>
                  <p className="uname">
                    {order.userDetails?.userName ||
                      order.order_address?.userName}
                  </p>
                  <p className="add">
                    {order.userDetails?.userAddress ||
                      order.order_address?.userAddress}
                  </p>
                  <p className="date">
                    {`${day}-${month}-${year}`} {hours}:{mins} {timePeriod}
                  </p>
                  <p className="cat">{order.type}</p>
                  <p className="amount">
                    {/* {order.payment.isPaid ? "Paid" : "Not Paid"} */}
                    {/* <span className="paid"></span> */}
                    {order.payment.isPaid ? (
                      <span className="paid">Paid</span>
                    ) : (
                      <span className="pod">POD</span>
                    )}
                  </p>
                  <p className="tq">{order.noOfItems}</p>
                  <p className="tp">
                    <i class="fas fa-rupee"></i>
                    {order.totalPrice}
                  </p>
                  <p className="status">
                    {/* <span className="new"> */}
                    {order.status === "booked" ? (
                      <span className="new">NewOrder</span>
                    ) : order.status === "preparing" ? (
                      <span className="prepare">Preparing</span>
                    ) : order.status === "assigned" ? (
                      <span className="ready">Assigned</span>
                    ) : order.status === "accepted" ? (
                      <span className="ready">Accepted</span>
                    ) : order.status === "rideon" ? (
                      <span className="ready">On-Delivery</span>
                    ) : order.status === "delivered" ? (
                      <span className="delivered">Delivered</span>
                    ) : order.status === "rejected" ? (
                      <span className="cancelled">Rejected</span>
                    ) : (
                      <span className="cancelled">Cancelled</span>
                    )}
                    {/* </span> */}
                    {/* <span className="prepare">Preparing</span> */}
                    {/* <span className="ready">New Order</span>
            <span className="delivered">New Order</span> */}
                  </p>
                </summary>
                <div className="details row">
                  {order.order_items?.map((item) => {
                    return (
                      <p key={item.itemId} className="item">
                        {item.itemName} x {item.itemSize}
                      </p>
                    );
                  })}

                  {order.status === "booked" ? (
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() =>
                        props.updateOrderStatus(order, "preparing")
                      }
                    >
                      Preparing
                    </button>
                  ) : order.status === "preparing" ? (
                    <>
                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={() => deliveryAssignHandler(order)}
                      >
                        Ready To Deliver
                      </button>
                    </>
                  ) : order.status === "assigned" ||
                    order.status === "accepted" ||
                    order.status === "rejected" ? (
                    <>
                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={() => deliveryAssignHandler(order)}
                      >
                        Re-Assign Delivery Boy
                      </button>
                    </>
                  ) : order.status === "rideon" ? (
                    <>
                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={() => deliveryAssignHandler(order)}
                      >
                        Re-Assign Delivery Boy
                      </button>
                    </>
                  ) : order.status === "delivered" ? (
                    <span className="delivered">Delivered</span>
                  ) : (
                    <span className="cancelled">Cancelled</span>
                  )}

                  {/* <button type="button" onClick={() => acceptHandler()}>
                    Accept
                  </button>
                  <button type="button" onClick={() => cancelHandler()}>
                    Cancel
                  </button> */}
                  {/* <p className="cancel">Cancel</p> */}
                  {/* <p className="deliverydetails">Akhil,&nbsp;8072711781</p> */}
                </div>
              </details>
            );
          })}
    </>
  );
};

export default OrderMaintain;
