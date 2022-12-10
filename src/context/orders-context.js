import React, { useEffect, useState } from "react";

const OrdersContext = React.createContext({
  orderData: {
    online: 0,
    dinein: 0,
    ready: 0,
    cancelled: 0
  },
  setOrderData: (orderData) => {}
});

export const OrdersContextProvider = (props) => {
  const [orderData, setOrderData] = useState({
    online: 0,
    dinein: 0,
    ready: 0,
    cancelled: 0
  });

  // useEffect(() => {
  // }, []);

  const setMyOrdersData = (orderData) => {
    console.log("Setting orderData", orderData);
    setOrderData(orderData);
  };

  return (
    <OrdersContext.Provider
      value={{
        orderData: orderData,
        setOrderData: setMyOrdersData
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
