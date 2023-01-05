import React, { useContext, useEffect, useState } from "react";
import OrdersContext from "../context/orders-context";
import Form from "react-bootstrap/Form";
import { getRestaurantStatus, setRestaurantStatus } from "../api/OrderDB";
import AuthContext from "../context/auth-context";

const Counter = (props) => {
  const orderContext = useContext(OrdersContext);
  const authCtx = useContext(AuthContext);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

  useEffect(() => {
    getRestaurantStatus(authCtx.user.location, (val) => {
      console.log("asdas", val);
      if (val.status === "success") {
        setIsRestaurantOpen(val.data);
      }
    });
  }, [authCtx.user.location]);

  const setRestaurantOpen = () => {
    const ques = isRestaurantOpen
      ? "Do you want to close the restaurant?"
      : "Do you want to open the restaurant?";

    if (confirm(ques) === true) {
      setRestaurantStatus(authCtx.user.location, !isRestaurantOpen, (val) => {
        if (val) {
          setIsRestaurantOpen((prevState) => !prevState);
        } else {
          alert("Some error, try after sometime!!!");
        }
      });
    }
  };

  return (
    <>
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
      <div style={{ paddingLeft: "300px" }}>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Restaurant Status"
            checked={isRestaurantOpen}
            onChange={setRestaurantOpen}
          />
        </Form>
      </div>
    </>
  );
};

export default Counter;
