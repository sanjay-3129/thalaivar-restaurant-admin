import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./DeliveryModal.module.css";
import Card from "../Card/Card";
import Backdrop from "../Backdrop";
// import $ from "jquery";
import { getDeliveryUsers } from "../../api/DeliveryDB";
import AuthContext from "../../context/auth-context";
import { db } from "../../services/firebase";

const ModalOverlay = (props) => {
  const [deliveryUsers, setDeliveryUsers] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let location = authCtx.user.location;
    // console.log("location", location);
    // getDeliveryUsers(location, (users) => {
    // location = location[0].toUpperCase() + location.substring(1);
    let list = [];
    var unsubscribe = db
      .collection("DeliveryUsers")
      .doc("Branches")
      .collection(location)
      .where("verification", "==", "verified")
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          let dUser = {
            ...doc.data(),
            currentOrders: [],
          };
          props.orders.forEach((order) => {
            if (dUser.user_id === order.dBoyId) {
              dUser.currentOrders.push({
                orderId: order.orderId,
                address: order.userDetails.userAddress,
              });
            }
          });
          list.push(dUser);
        });
        console.log("deli", list);
        console.log("orders", props.orders);
        setDeliveryUsers((prevState) => {
          return [...list];
        });
        list = [];
      });
    return () => {
      unsubscribe();
    };
    // });
  }, [authCtx.user.location]);

  let ui = null;
  if (deliveryUsers === null) {
    ui = <p>Loading!!!</p>;
  } else if (deliveryUsers.length === 0) {
    ui = <p>No delivery users available!!!</p>;
  } else {
    ui = deliveryUsers.map((user) => {
      let statusUi = null;
      if (user.userStatus === "Online") {
        statusUi = (
          <>
            <p className={styles.status}>
              {/* <span className={styles.busy}>On Delivery</span> */}
              <span className={styles.free}>Available</span>
            </p>
            <p
              className={styles.assign}
              onClick={() => props.assignDeliveryUser(props.order, user)}
            >
              {/* <span className={styles.span}>Assign&nbsp;&#10003;</span> */}
              <span className={styles.span}>Assign&nbsp;&#10003;</span>
            </p>
          </>
        );
      } else if (user.userStatus === "Offline") {
        statusUi = (
          <>
            <p className={styles.status}>
              <span className={styles.busy}>Offline</span>
            </p>
            <p className={styles.assign}>
              <span className={styles.span}>Offline&nbsp;&#10003;</span>
            </p>
          </>
        );
      } else if (user.userStatus === "RideOn") {
        statusUi = (
          <>
            <p className={styles.status}>
              <span className={styles.free}>Ride On</span>
            </p>
            <p className={styles.assign}>
              {/* <span className={styles.span}>Ride-On&nbsp;&#10003;</span> */}
            </p>
          </>
        );
      } else if (user.userStatus === "Assigned") {
        statusUi = (
          <>
            <p className={styles.status}>
              <span className={styles.free}>Assigned</span>
            </p>
            {props.order.dBoyId === user.user_id ? (
              <p className={styles.assign}>
                <span
                  className={styles.span1}
                  title={`This order is already assigned to ${user.user_username}`}
                  style={{ textDecoration: "underline" }}
                >
                  Can't Assign
                </span>
              </p>
            ) : (
              <p
                className={styles.assign}
                onClick={() => {
                  props.assignDeliveryUser(props.order, user);
                }}
              >
                <span className={styles.span}>Re-Assign&nbsp;&#10003;</span>
              </p>
            )}
          </>
        );
      }
      return (
        <div
          className={styles.row}
          style={{ marginBottom: "5px" }}
          key={user.user_id}
        >
          <p className={styles.name}>{user.user_username}</p>
          <p className={styles.no}>{user.user_phone_number}</p>
          {statusUi}
          <p className={styles.no} title>
            {user.currentOrders.length > 0
              ? user.currentOrders.map((ord, i) => (
                  <>
                    <p
                      title={ord.address}
                      style={{ textDecoration: "underline" }}
                    >
                      {ord.orderId}
                    </p>
                    {/* {i < user.currentOrders.length - 1 ? ";" : ""} */}
                  </>
                ))
              : "Empty"}
          </p>
        </div>
      );
    });
  }
  return (
    <div class={styles.modal}>
      <Card>
        <div className={styles.assignmodal}>
          <div className={styles.row} style={{ marginBottom: "10px" }}>
            <p className={styles.hname}>Delivery Person</p>
            <p className={styles.hno}>Mobile Number</p>
            <p className={styles.hstatus}>Status</p>
            <p className={styles.hassign}>Assign</p>
            <p className={styles.hcurrentOrder}>Current Orders</p>
          </div>
          {ui}
        </div>
      </Card>
    </div>
  );
};

const DeliveryModal = (props) => {
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
          assignDeliveryUser={props.assignDeliveryUser}
          // updateItem={props.updateItem}
          order={props.order}
          orders={props.orders}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default DeliveryModal;
