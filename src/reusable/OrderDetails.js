import React from "react";

const OrderDetails = (props) => {
  // let ui = (
  //   <div className="inner-div row footer" style={{ justifyContent: "end" }}>
  //     <button type="submit" class="btn ready">
  //       Food Ready
  //     </button>
  //     <button type="submit" class="btn reject">
  //       Reject
  //     </button>
  //     <i class="fas fa-eye-slash"></i>
  //     {/* <i class="fas fa-eye"></i> */}
  //   </div>
  // );

  const readyHandler = () => {
    console.log("ready");
  };

  const rejectHandler = () => {
    console.log("reject");
  };

  return (
    <div className="order-detail">
      <div className="detail-row row">
        {/* <p className="uname">User Name</p> */}
        <p className="ono">#{props.order.orderId}</p>
        <p className="noi">{props.order.noOfItems}</p>
        <p className="tp">
          <i class="fas fa-rupee"></i>&nbsp;
          {props.order.totalPrice}
        </p>
        <p className="amount">
          {/* span if cash is already paid */}
          <span className="paid">Paid</span>
          {/* span for pod method */}
          {/* <span className="pod">POD</span> */}
        </p>
        <p className="status">
          {/* ui for new order */}
          <span className="new">New Order</span>
          {/* ui for ready to serve/deliver order */}
          {/* <span className="ready">On-Delivery</span> */}
          {/* ui for delivered order */}
          {/* <span className="delivered">Delivered</span> */}
        </p>
        <p className="update">
          <i class="fas fa-angle-double-up"></i>
        </p>
        <div className="bill">
          <img class="img-fluid" src="/images/invoices.png" alt="bill" />
        </div>
      </div>
      <div className="item-row row">
        <div className="single-item">
          {/* <img className="img-fluid" src="/images/idly.jpg" alt="itemimage" /> */}
          <p className="iname">
            Idly&nbsp;<b>x&nbsp;2</b>
          </p>
          {/* <p className="quantity">X&nbsp;2</p> */}
        </div>
        <div className="single-item row">
          {/* <img className="img-fluid" src="/images/dish1.png" alt="itemimage" /> */}
          <p className="iname">
            Briyani&nbsp;<b>x&nbsp;1</b>
          </p>
          {/* <p className="quantity">X&nbsp;1</p> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
