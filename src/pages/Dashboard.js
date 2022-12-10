import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
// import Orders from "../components/Dashboard/Orders";
import StockMaintainance from "../components/Dashboard/StockMaintainance";
import OrderMaintain from "../components/Dashboard/OrderMaintain";
import ManualBilling from "../components/Manual/ManualBilling";
import {
  billPaidOrder,
  getTodayOrders,
  removeListener,
  updateOrderStatus,
} from "../api/OrderDB";
import AuthContext from "../context/auth-context";
// import snackbarLink from "../ui/Snackbar/SnackbarLink";
import OrdersContext from "../context/orders-context";
// import { onMessageListener, messaging } from "../services/firebase";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";
import { getItem, getMultiTitleItems, setItem } from "../api/ItemDB";
import localForage from "localforage";
import localforage from "localforage";
import { db } from "../services/firebase";
// import GUN from "gun";

const Dashboard = (props) => {
  // const gun = GUN();
  const authCtx = useContext(AuthContext);
  const ordersContext = useContext(OrdersContext);
  // const history = useHistory();
  const [items, setItems] = useState([]);
  const [type, setType] = useState("food");
  const [orders, setOrders] = useState({
    allOrders: [],
    newOrders: [],
    preparingOrders: [],
    onDeliveryOrders: [],
    deliveredOrders: [],
  });
  const [outOfStockItems, setOutOfStockItems] = useState({
    food: [],
    grocery: [],
  });
  // for manual orders
  const [manualBillNo, setManualBillNo] = useState({
    telephoneBillNoFood: 0,
    telephoneBillNoGrocery: 0,
    manualBillNoFood: 0,
    manualBillNoGrocery: 0,
  });
  const [ongoingOrders, setOngoingOrders] = useState({
    food: [],
    grocery: [],
  });
  const [currentOrder, setCurrentOrder] = useState({
    food: {
      actualPrice: 0,
      cancelReason: "",
      dBoyId: "",
      deliveryCharge: 0,
      discount: 0,
      id: "",
      latitude: "",
      longitude: "",
      noOfItems: 0,
      orderId: "",
      items: [],
      payment: {
        isPaid: false,
        paymentMethod: "",
      },
      status: "",
      timestamp: "",
      totalPrice: 0,
      tax: 0,
      type: "dinein",
      userDetails: {
        latitude: 0,
        longitude: 0,
        phone: "",
        userAddress: "",
        userId: "",
        userName: "",
      },
      userid: "",
    },
    grocery: {
      actualPrice: 0,
      cancelReason: "",
      dBoyId: "",
      deliveryCharge: 0,
      discount: 0,
      id: "",
      latitude: "",
      longitude: "",
      noOfItems: 0,
      orderId: "",
      items: [],
      payment: {
        isPaid: false,
        paymentMethod: "",
      },
      status: "",
      timestamp: "",
      totalPrice: 0,
      tax: 0,
      type: "dinein",
      userDetails: {
        latitude: 0,
        longitude: 0,
        phone: "",
        userAddress: "",
        userId: "",
        userName: "",
      },
      userid: "",
    },
  });

  navigator.serviceWorker.onmessage = (event) => {
    // console.log("front", event.data, event.data.messageType);
    // console.log("front-history", history.location);
    let notification = event.data.notification;
    let data = event.data.data;
    if (data.type === "food") {
      localForage
        .getItem("outOfStockFood")
        .then((value) => {
          if (value === null || value.length === 0) {
            getItem(
              data.category,
              data.type,
              data.orderId,
              authCtx.user.location,
              (item) => {
                if (item === null) {
                  console.log("In Stock");
                } else {
                  console.log("Out Of Stock");
                  // add data local db
                  setOutOfStockItems((prevState) => {
                    let list = [...prevState.food, item];
                    localForage.setItem("outOfStockFood", list);
                    return {
                      ...prevState,
                      food: list,
                    };
                  });
                }
              }
            );
          } else {
            let index = value.findIndex((v) => {
              return v.id === data.orderId;
            });
            if (index === -1) {
              // if item is not there already
              getItem(
                data.category,
                data.type,
                data.orderId,
                authCtx.user.location,
                (item) => {
                  if (item === null) {
                    console.log("In Stock");
                  } else {
                    console.log("Out Of Stock");
                    // add data local db
                    setOutOfStockItems((prevState) => {
                      let list = [...prevState.food, item];
                      localForage.setItem("outOfStockFood", list);
                      return {
                        ...prevState,
                        food: list,
                      };
                    });
                  }
                }
              );
            }
          }
        })
        .catch((e) => console.log(e));
    } else {
      localForage
        .getItem("outOfStockGrocery")
        .then((value) => {
          if (value === null) {
            getItem(
              data.category,
              data.type,
              data.orderId,
              authCtx.user.location,
              (item) => {
                if (item === null) {
                  console.log("In Stock");
                } else {
                  console.log("Out Of Stock");
                  // add data local db
                  setOutOfStockItems((prevState) => {
                    let list = [...prevState.grocery, item];
                    localForage.setItem("outOfStockGrocery", list);
                    return {
                      ...prevState,
                      grocery: list,
                    };
                  });
                }
              }
            );
          } else {
            let index = value.findIndex((v) => {
              return v.id === data.orderId;
            });
            if (index === -1) {
              // if item is not there already
              getItem(
                data.category,
                data.type,
                data.orderId,
                authCtx.user.location,
                (item) => {
                  if (item === null) {
                    console.log("In Stock");
                  } else {
                    console.log("Out Of Stock");
                    // add data local db
                    setOutOfStockItems((prevState) => {
                      let list = [...prevState.grocery, item];
                      localForage.setItem("outOfStockGrocery", list);
                      return {
                        ...prevState,
                        grocery: list,
                      };
                    });
                  }
                }
              );
            }
          }
        })
        .catch((e) => console.log(e));
    }
    if (event.data.messageType !== "notification-clicked") {
      store.addNotification({
        title: notification.title,
        message: notification.body,
        type: "default",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };
  // messaging.onMessage((payload) => console.log("payload", payload));
  // messaging.onBackgroundMessage((payload) => console.log("bac", payload));

  // onMessageListener()
  //   .then((payload) => {
  //     console.log("notificaion msg: ", payload.notification);
  //   })
  //   .catch((e) => console.log(e));

  // useEffect(() => {
  //   let foodList = [];
  //   let groceryList = [];
  //   localForage
  //     .getItem("outOfStockFood")
  //     .then((value) => {
  //       // console.log("outOfStockFood", value);
  //       if (value !== null) {
  //         foodList = value;
  //       }
  //       localForage
  //         .getItem("outOfStockGrocery")
  //         .then((value) => {
  //           // console.log("outOfStockGrocery", value);
  //           if (value !== null) {
  //             groceryList = value;
  //           }
  //           setOutOfStockItems({
  //             food: foodList,
  //             grocery: groceryList,
  //           });
  //         })
  //         .catch((e) => console.log(e));
  //     })
  //     .catch((e) => console.log(e));

  //   // console.log("foodList", foodList);
  //   // console.log("groceryList", groceryList);
  //   // get ongoingFoodOrders & ongoingGroceryOrders
  //   localforage
  //     .getItem("ongoingFoodOrders")
  //     .then((value) => {
  //       if (value !== null) {
  //         setOngoingOrders((prevState) => {
  //           return {
  //             ...prevState,
  //             food: value,
  //           };
  //         });
  //       }
  //       localforage
  //         .getItem("ongoingGroceryOrders")
  //         .then((value) => {
  //           if (value !== null) {
  //             setOngoingOrders((prevState) => {
  //               return {
  //                 ...prevState,
  //                 grocery: value,
  //               };
  //             });
  //           }
  //         })
  //         .catch((e) => console.log(e));
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  useEffect(() => {
    console.log("useEffect [Dashboard.js] Orders");
    let user = authCtx.user;
    var unsubscribe;
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

      // getTodayOrders(date, type, user.location, (orderss, manualBillNo) => {
      let ty = "";
      if (type === "food") {
        ty = "FoodOrders";
        // date = "02.11.2021";
      } else {
        ty = "GroceryOrders";
        // date = "03.11.2021";
      }
      let list = [];
      unsubscribe = db
        .collection(ty)
        .doc("todayOrders")
        .collection(user.location)
        .onSnapshot(
          (docs) => {
            docs.forEach((doc) => {
              list.push(doc.data());
            });
            if (list.length === 0) {
              setOrders("No Orders");
            } else {
              console.log("orderss", list);
              let data = {
                allOrders: [],
                newOrders: [],
                preparingOrders: [],
                onDeliveryOrders: [],
                deliveredOrders: [],
              };

              let statData = {
                online: 0,
                telephone: 0,
                ready: 0,
                cancelled: 0,
              };
              // allOrders
              list.sort((a, b) => {
                if (a.timestamp < b.timestamp) {
                  return 1;
                }
                if (a.timestamp > b.timestamp) {
                  return -1;
                }
                return 0;
              });
              data.allOrders = [...list];
              // other orders
              list.forEach((o) => {
                if (o.status === "booked") {
                  data.newOrders.push(o);
                  // if (orders.allOrders.length !== 0) {
                  //   console.log("orders snap", orders.allOrders);
                  //   let index = orders.allOrders.findIndex((ord) => {
                  //     return o.orderId === ord.orderId;
                  //   });
                  //   if (index === -1) {
                  //     // console.log("index", index, o);
                  //     snackbarLink(o, "New Order");
                  //   }
                  // }
                } else if (o.status === "preparing") {
                  data.preparingOrders.push(o);
                  // } else if (o.status === "ondelivery") {
                } else if (
                  o.status === "assigned" ||
                  o.status === "ondelivery"
                ) {
                  data.onDeliveryOrders.push(o);
                  statData.ready++;
                } else if (o.status === "delivered") {
                  data.deliveredOrders.push(o);
                }
                if (o.type === "online") {
                  statData.online++;
                } else if (o.type === "telephone") {
                  statData.telephone++;
                }
              });
              setOrders((prevState) => {
                return data;
              });
              ordersContext.setOrderData(statData);
            }
            // setOrders(list);
            list = [];
            // console.log("unsub", unsubscribe);
          },
          (e) => console.log(e)
        );
    }
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      } else {
        console.log("Not a function");
      }
      // unsubscribe();
      // removeListener();
      console.log("cleanup for listener");
    };
  }, [type, authCtx]);

  const removeHandler = (id) => {
    // console.log("remove", id);
    if (type === "food") {
      setOutOfStockItems((prevState) => {
        let list = [...prevState.food];
        let index = list.findIndex((v) => v.id === id);
        list.splice(index, 1);
        localForage
          .setItem("outOfStockFood", list)
          .then(() => console.log("food successfully updated!!!"))
          .catch((e) => console.log(e));
        return {
          ...prevState,
          food: list,
        };
      });
    } else {
      setOutOfStockItems((prevState) => {
        let list = [...prevState.grocery];
        let index = list.findIndex((v) => v.id === id);
        list.splice(index, 1);
        localForage
          .setItem("outOfStockGrocery", list)
          .then(() => console.log("grocery successfully updated!!!"))
          .catch((e) => console.log(e));
        return {
          ...prevState,
          grocery: list,
        };
      });
    }
  };

  // update outOfStock
  const checkHandler = (item) => {
    if (type === "food") {
      setItem(item.category, type, item, authCtx.user.location, (isAdded) => {
        if (isAdded) {
          setOutOfStockItems((prevState) => {
            let list = [...prevState.food];
            let index = list.findIndex((v) => v.id === item.id);
            list.splice(index, 1);
            localForage
              .setItem("outOfStockFood", list)
              .then(() => console.log("food successfully updated!!!"))
              .catch((e) => console.log(e));
            return {
              ...prevState,
              food: list,
            };
          });
        } else {
          alert("Some error!!!");
        }
      });
    } else {
      setItem(item.category, type, item, (isAdded) => {
        if (isAdded) {
          setOutOfStockItems((prevState) => {
            let list = [...prevState.grocery];
            let index = list.findIndex((v) => v.id === item.id);
            list.splice(index, 1);
            localForage
              .setItem("outOfStockGrocery", list)
              .then(() => console.log("grocery successfully updated!!!"))
              .catch((e) => console.log(e));
            return {
              ...prevState,
              grocery: list,
            };
          });
        } else {
          alert("Some error!!!");
        }
      });
    }
  };

  const createOrder = (manual) => {
    // setManualBillNo((prevState) => {
    //   if (type === "food") {
    //     if (manual === "dineIn") {
    //       return {
    //         ...prevState,
    //         // manualBillNoFood: prevState.manualBillNoFood + 1,
    //         manualBillNoFood: new Date().getTime(),
    //       };
    //     } else {
    //       return {
    //         ...prevState,
    //         // telephoneBillNoFood: prevState.telephoneBillNoFood + 1,
    //         telephoneBillNoFood: new Date().getTime(),
    //       };
    //     }
    //   } else {
    //     if (manual === "dineIn") {
    //       return {
    //         ...prevState,
    //         // manualBillNoGrocery: prevState.manualBillNoGrocery + 1,
    //         manualBillNoGrocery: new Date().getTime(),
    //       };
    //     } else {
    //       return {
    //         ...prevState,
    //         // telephoneBillNoGrocery: prevState.telephoneBillNoGrocery + 1,
    //         telephoneBillNoGrocery: new Date().getTime(),
    //       };
    //     }
    //   }
    // });

    let time = new Date().getTime();
    if (type === "food") {
      setOngoingOrders((prevState) => {
        let list = [...prevState.food];
        let newData = {
          // orderId: "FD" + (manualBillNo.manualBillNoFood + 1);
          actualPrice: 0,
          cancelReason: "",
          dBoyId: "",
          deliveryCharge: 0,
          discount: 0,
          id: "FD" + time,
          latitude: "",
          longitude: "",
          noOfItems: 0,
          orderId: "FD" + time,
          items: [],
          payment: {
            isPaid: true,
            paymentMethod: "cash",
          },
          status: "",
          timestamp: "",
          totalPrice: 0,
          tax: 0,
          type: "dinein",
          userDetails: {
            latitude: 0,
            longitude: 0,
            phone: "",
            userAddress: "",
            userId: "",
            userName: "",
          },
          userid: "",
        };

        if (manual === "telephone") {
          newData = {
            // orderId: "FT" + (manualBillNo.telephoneBillNoFood + 1),
            actualPrice: 0,
            cancelReason: "",
            dBoyId: "",
            deliveryCharge: 0,
            discount: 0,
            id: "FT" + time,
            latitude: "",
            longitude: "",
            noOfItems: 0,
            orderId: "FT" + time,
            items: [],
            payment: {
              isPaid: false,
              paymentMethod: "cash",
            },
            status: "",
            timestamp: "",
            totalPrice: 0,
            tax: 0,
            type: "telephone",
            userDetails: {
              latitude: 0,
              longitude: 0,
              phone: "",
              userAddress: "",
              userId: "",
              userName: "",
            },
            userid: "",
          };
        }
        localforage.setItem("ongoingFoodOrders", [...list, newData]);
        return {
          ...prevState,
          food: [...list, newData],
        };
      });
    } else {
      setOngoingOrders((prevState) => {
        let list = [...prevState.grocery];
        let newData = {
          // orderId: "GD" + (manualBillNo.manualBillNoGrocery + 1),
          actualPrice: 0,
          cancelReason: "",
          dBoyId: "",
          deliveryCharge: 0,
          discount: 0,
          id: "GD" + time,
          latitude: "",
          longitude: "",
          noOfItems: 0,
          orderId: "GD" + time,
          items: [],
          payment: {
            isPaid: true,
            paymentMethod: "cash",
          },
          status: "",
          timestamp: "",
          totalPrice: 0,
          tax: 0,
          type: "dinein",
          userDetails: {
            latitude: 0,
            longitude: 0,
            phone: "",
            userAddress: "",
            userId: "",
            userName: "",
          },
          userid: "",
        };
        if (manual === "telephone") {
          newData = {
            // orderId: "GT" + (manualBillNo.telephoneBillNoGrocery + 1),
            actualPrice: 0,
            cancelReason: "",
            dBoyId: "",
            deliveryCharge: 0,
            discount: 0,
            id: "GT" + time,
            latitude: "",
            longitude: "",
            noOfItems: 0,
            orderId: "GT" + time,
            items: [],
            payment: {
              isPaid: false,
              paymentMethod: "cash",
            },
            status: "",
            timestamp: "",
            totalPrice: 0,
            tax: 0,
            type: "telephone",
            userDetails: {
              latitude: 0,
              longitude: 0,
              phone: "",
              userAddress: "",
              userId: "",
              userName: "",
            },
            userid: "",
          };
        }
        localforage.setItem("ongoingGroceryOrders", [...list, newData]);
        return {
          ...prevState,
          grocery: [...list, newData],
        };
      });
    }
  };

  const removeOrder = (orderId, type) => {
    // console.log("order", orderId, type);
    setOngoingOrders((prevState) => {
      if (type === "food") {
        let listFood = [...prevState.food];
        let index = listFood.findIndex((val) => val.orderId === orderId);
        listFood.splice(index, 1);
        localforage.setItem("ongoingFoodOrders", [...listFood]);
        return {
          ...prevState,
          food: [...listFood],
        };
      } else {
        let listGrocery = [...prevState.grocery];
        let index = listGrocery.findIndex((val) => val.orderId === orderId);
        listGrocery.splice(index, 1);
        localforage.setItem("ongoingGroceryOrders", [...listGrocery]);
        return {
          ...prevState,
          grocery: [...listGrocery],
        };
      }
    });
    setCurrentOrder({
      food: {
        actualPrice: 0,
        cancelReason: "",
        dBoyId: "",
        deliveryCharge: 0,
        discount: 0,
        id: "",
        latitude: "",
        longitude: "",
        noOfItems: 0,
        orderId: "",
        items: [],
        payment: {
          isPaid: false,
          paymentMethod: "",
        },
        status: "",
        timestamp: "",
        totalPrice: 0,
        tax: 0,
        type: "dinein",
        userDetails: {
          latitude: 0,
          longitude: 0,
          phone: "",
          userAddress: "",
          userId: "",
          userName: "",
        },
        userid: "",
      },
      grocery: {
        actualPrice: 0,
        cancelReason: "",
        dBoyId: "",
        deliveryCharge: 0,
        discount: 0,
        id: "",
        latitude: "",
        longitude: "",
        noOfItems: 0,
        orderId: "",
        items: [],
        payment: {
          isPaid: false,
          paymentMethod: "",
        },
        status: "",
        timestamp: "",
        totalPrice: 0,
        tax: 0,
        type: "dinein",
        userDetails: {
          latitude: 0,
          longitude: 0,
          phone: "",
          userAddress: "",
          userId: "",
          userName: "",
        },
        userid: "",
      },
    });
  };

  const onChangeHandler = (e, item) => {
    let name = e.target.name;
    let value = e.target.value;
    let index = items.findIndex((i) => i.Name === value);
    if (index !== -1) {
      let item = items[index];
      if (name === "searchItems") {
        if (type === "food") {
          setCurrentOrder((prevState) => {
            let list = [...prevState.food.items];
            console.log("change-food", prevState);
            let food = prevState.food;
            // below two lines is to ensure that we only add unique items
            let i = food.items.findIndex((i) => i.id === item.id);
            // console.log("change", item, props.location);
            if (i === -1) {
              let newItem = {
                ...item,
                // itemId: item.id,
                // itemName: item.Name,
                itemPrice: item.branch[authCtx.user.location].current_price,
                itemSize: 1,
                itemQuantity: 1,
              };
              // if (
              //   item.branch[authCtx.user.location].actualPrice === -1 &&
              //   item.branch[authCtx.user.location].currentPrice
              // ) {
              //   newItem = {
              //     ...item,
              //     itemPrice: item.branch[authCtx.user.location].cquarterPrice,
              //     itemSize: 1,
              //     itemQuantity: "quarter",
              //   };
              // }
              food.totalPrice += newItem.itemPrice;
              food.noOfItems = food.noOfItems + 1;
              food.items = [...list, newItem];
              localforage
                .getItem("ongoingFoodOrders")
                .then((value) => {
                  if (value === null) {
                    let list = [];
                    list.push(food);
                    localforage.setItem("ongoingFoodOrders", list);
                  } else {
                    // let list = [...value];
                    let list = [];
                    list.push(food);
                    localforage.setItem("ongoingFoodOrders", list);
                  }
                })
                .catch((e) => console.log(e));
              return {
                ...prevState,
                food: food,
              };
            } else {
              alert("Already added that item!!!");
              food.items = [...list];
              return {
                ...prevState,
                food: food,
              };
            }
          });
        } else {
          // console.log("change-grocery");
          if (item.branch[authCtx.user.location] === undefined) {
            alert("Not available in your location!!!");
          }
          setCurrentOrder((prevState) => {
            let list = [...prevState.grocery.items];
            let grocery = prevState.grocery;
            let i = grocery.items.findIndex((i) => i.id === item.id);
            if (i === -1) {
              let newItem = {
                ...item,
                // itemId: item.id,
                // itemName: item.Name,
                itemPrice: item.branch[authCtx.user.location].current_price,
                itemSize: 1,
                itemQuantity: 1,
              };
              // if (item[authCtx.user.location].price.length <= 0) {
              //   newItem = {
              //     ...item,
              //     itemPrice: item[authCtx.user.location].price.cquarterPrice,
              //     itemSize: 1,
              //     itemQuantity: "quarter",
              //   };
              // }
              grocery.totalPrice += newItem.itemPrice;
              grocery.noOfItems = grocery.noOfItems + 1;
              grocery.items = [...list, newItem];
              return {
                ...prevState,
                grocery: grocery,
              };
            } else {
              alert("Already added that item!!!");
              grocery.items = [...list];
              return {
                ...prevState,
                grocery: grocery,
              };
            }
          });
        }
        document.getElementById("searchItems").value = "";
      }
    } else if (name === "phone" || name === "username" || name === "address") {
      if (type === "food") {
        setCurrentOrder((prevState) => {
          let food = prevState.food;
          if (name === "phone") {
            food.userDetails.phone = value;
          } else if (name === "username") {
            food.userDetails.userName = value;
          } else if (name === "address") {
            food.userDetails.userAddress = value;
          }
          return {
            ...prevState,
            food: food,
          };
        });
      } else {
        setCurrentOrder((prevState) => {
          let grocery = prevState.grocery;
          if (name === "phone") {
            grocery.userDetails.phone = value;
          } else if (name === "username") {
            grocery.userDetails.userName = value;
          } else if (name === "address") {
            grocery.userDetails.userAddress = value;
          }
          return {
            ...prevState,
            food: grocery,
          };
        });
      }
    } else if (name === "paymentMode") {
      if (type === "food") {
        setCurrentOrder((prevState) => {
          let food = prevState.food;
          food.payment.paymentMethod = value;
          return {
            ...prevState,
            food: food,
          };
        });
      } else {
        setCurrentOrder((prevState) => {
          let grocery = prevState.grocery;
          grocery.payment.paymentMethod = value;
          return {
            ...prevState,
            grocery: grocery,
          };
        });
      }
    } else if (name === "itemSize") {
      // console.log("change-itemSize--", currentOrder, item);
      if (type === "food") {
        setCurrentOrder((prevState) => {
          let list = [...prevState.food.items];
          let index = list.findIndex((l) => l.id === item.id);
          let updatedItem = {
            ...list[index],
            itemSize: value,
          };
          list[index] = updatedItem;
          let food = prevState.food;
          food.items = [...list];
          let sumPrice = 0;
          let size = 0;
          food.items.forEach((item) => {
            sumPrice += item.itemPrice * item.itemSize;
            size += parseInt(item.itemSize);
          });
          food.totalPrice = sumPrice;
          food.noOfItems = size;
          return {
            ...prevState,
            food: food,
          };
        });
      } else {
        setCurrentOrder((prevState) => {
          let list = [...prevState.grocery.items];
          let index = list.findIndex((l) => l.id === item.id);
          let updatedItem = {
            ...list[index],
            itemSize: value,
          };
          list[index] = updatedItem;
          let grocery = prevState.grocery;
          grocery.items = [...list];
          let sumPrice = 0;
          let size = 0;
          grocery.items.forEach((item) => {
            sumPrice += item.itemPrice * item.itemSize;
            size += parseInt(item.itemSize);
          });
          grocery.totalPrice = sumPrice;
          grocery.noOfItems = size;
          return {
            ...prevState,
            grocery: grocery,
          };
        });
      }
    } else if (name === "itemQuantity") {
      // console.log("change-itemQuantity", currentOrder, item);
      if (type === "food") {
        setCurrentOrder((prevState) => {
          let list = [...prevState.food.items];
          let index = list.findIndex((l) => l.id === item.id);
          let price = item[authCtx.user.location].price.cquarterPrice;
          if (value === "half") {
            price = item[authCtx.user.location].price.chalfPrice;
          } else if (value === "full") {
            price = item[authCtx.user.location].price.cfullPrice;
          }
          let updatedItem = {
            ...list[index],
            itemQuantity: value,
            itemPrice: price,
          };
          list[index] = updatedItem;
          let food = prevState.food;
          food.items = [...list];
          let sumPrice = 0;
          food.items.forEach((item) => {
            sumPrice += item.itemPrice * item.itemSize;
          });
          food.totalPrice = sumPrice;
          return {
            ...prevState,
            food: food,
          };
        });
      } else {
        console.log("No code yet for grocery, bcs it is different");
      }
    }
  };

  const removeItem = (id) => {
    // console.log("removeItem", id);
    if (type === "food") {
      setCurrentOrder((prevState) => {
        let list = [...prevState.food.items];
        let index = list.findIndex((l) => l.id === id);
        list.splice(index, 1);
        let food = prevState.food;
        food.noOfItems = food.noOfItems - 1;
        food.items = [...list];
        let sumPrice = 0;
        let size = 0;
        list.forEach((item) => {
          sumPrice += item.itemPrice * item.itemSize;
          size += parseInt(item.itemSize);
        });
        food.totalPrice = sumPrice;
        food.noOfItems = size;
        return {
          ...prevState,
          food: food,
        };
      });
    } else {
      // console.log("change-grocery");
      setCurrentOrder((prevState) => {
        let list = [...prevState.grocery.items];
        let index = list.findIndex((l) => l.id === id);
        list.splice(index, 1);
        let grocery = prevState.grocery;
        grocery.noOfItems = grocery.noOfItems + 1;
        grocery.items = [...list];
        let sumPrice = 0;
        let size = 0;
        grocery.items.forEach((item) => {
          sumPrice += item.itemPrice * item.itemSize;
          size += parseInt(item.itemSize);
        });
        grocery.totalPrice = sumPrice;
        grocery.noOfItems = size;
        return {
          ...prevState,
          grocery: grocery,
        };
      });
    }
  };

  const generateBill = () => {
    if (type === "food") {
      console.log("currentOrder", currentOrder.food);
      if (
        currentOrder.food.totalPrice === 0 ||
        currentOrder.food.noOfItems === 0
      ) {
        alert("Price or Item should not be 0(Zero)!!!");
      } else {
        billPaidOrder(
          currentOrder.food,
          type,
          authCtx.user.location,
          (isAdded) => {
            if (isAdded) {
              // window.alert("Successfully Added to local store!!!");
              // for thermal printer && data added to backend
              alert("Food Bill Generated for - " + currentOrder.food.orderId);
              removeOrder(currentOrder.food.orderId, type);
            } else {
              // error not adding
              window.alert("Not Added... Try Again!!!");
            }
          }
        );
      }
    } else {
      console.log("currentOrder-grocery", currentOrder.grocery);
      if (
        currentOrder.food.totalPrice === 0 ||
        currentOrder.food.noOfItems === 0
      ) {
        alert("Price or Item should not be 0(Zero)!!!");
      } else {
        billPaidOrder(
          currentOrder.grocery,
          type,
          authCtx.user.location,
          (isAdded) => {
            if (isAdded) {
              // window.alert("Successfully Added to local store!!!");
              // for thermal printer && data added to backend
              alert(
                "Grocery Bill Generated for - " + currentOrder.grocery.orderId
              );
              removeOrder(currentOrder.grocery.orderId, type);
            } else {
              // error not adding
              window.alert("Not Added... Try Again!!!");
            }
          }
        );
      }
    }
  };

  const sendNotificationToDeliveryUser = async (order, dGuy, status) => {
    console.log("order", order);
    const FIREBASE_API_KEY =
      "AAAA_JouL7I:APA91bHU1dqei_StIKqJVED6WsQRD4JKUhauk2VvPy3KUtGOQ715PTmmE8yTK5cFfJvcs0EXsrVAO2YBEdIPYYzktL4FdNXTkf3TV8V6_keOr842VNuDiGfw3Ulv-rkDXzYeNo-_8Wul";
    const address =
      "TO: " + order.userDetails?.userName ||
      order.order_address.userName +
        ", Address: " +
        order.userDetails?.userAddress ||
      order.order_address.userAddress;
    const message = {
      registration_ids: [],
      notification: {
        title: "New Order - " + order.orderId,
        body: address,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true,
      },
      data: {
        title: "New Order - " + order.orderId,
        body: address,
        id: order.id,
      },
    };
    message.registration_ids.push(dGuy.user_token);

    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    response = await response.json();
    console.log("response", response);
    store.addNotification({
      title: "Notification Sent!!!",
      message: "To Delivery User: " + dGuy.user_username,
      type: "default",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  // status change - preparing, assigned
  const updateOrder = (order, status, dGuy) => {
    updateOrderStatus(
      type,
      authCtx.user.location,
      order,
      status,
      (isUpdated) => {
        if (isUpdated) {
          setOrders((prevState) => {
            if (status === "preparing") {
              let updatedOrder = {
                ...order,
                status: "preparing",
              };
              // all orders array
              let allOrders = [...prevState.allOrders];
              let allIndex = allOrders.findIndex((o) => o.id === order.id);
              allOrders[allIndex] = updatedOrder;
              // new Orders array
              let newOrders = [...prevState.newOrders];
              let newIndex = newOrders.findIndex((o) => o.id === order.id);
              // delete from newOrders and push into preparingOrders
              newOrders.splice(newIndex, 1);
              let preparingOrders = [...prevState.preparingOrders];
              preparingOrders.push(updatedOrder);
              return {
                ...prevState,
                allOrders: allOrders,
                newOrders: newOrders,
                preparingOrders: preparingOrders,
              };
            } else if (status === "assigned") {
              // send notification to delivery boy
              sendNotificationToDeliveryUser(order, dGuy, "assigned");
              // change delivery boy status to "assigned"
              let updatedOrder = {
                ...order,
                status: "assigned",
              };
              // all orders array
              let allOrders = [...prevState.allOrders];
              let allIndex = allOrders.findIndex((o) => o.id === order.id);
              allOrders[allIndex] = updatedOrder;

              // new Orders array
              let preparingOrders = [...prevState.preparingOrders];
              let prepareIndex = preparingOrders.findIndex(
                (o) => o.id === order.id
              );
              // delete from newOrders and push into preparingOrders
              preparingOrders.splice(prepareIndex, 1);
              let onDeliveryOrders = [...prevState.onDeliveryOrders];
              onDeliveryOrders.push(updatedOrder);
              return {
                ...prevState,
                allOrders: allOrders,
                preparingOrders: preparingOrders,
                onDeliveryOrders: onDeliveryOrders,
              };
            }
          });
        } else {
          alert("Order Not Updated, Try Again!!!");
        }
      }
    );
  };

  const assignDeliveryUser = (order, user) => {
    let data = {
      ...order,
      dBoyId: user.user_id,
    };
    // console.log("assignDeliveryUser", data);
    updateOrder(data, "assigned", user);
  };

  return (
    <>
      <div className="row headnav">
        <div className="toggle">
          <NavLink to="/home/dashboard/allorder">All Orders</NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/dashboard/neworder">New Arrivals</NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/dashboard/preparing">Preparing</NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/dashboard/ondeliver">On Delivery</NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/dashboard/delivered">Delivered</NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/dashboard/manual">Manual</NavLink>
        </div>
        <div className="dropdown">
          <select
            onChange={(e) => {
              // console.log(e.target.value);
              setType(e.target.value);
            }}
          >
            <option value="food">Food</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>
        {/* {authCtx.user !== null && (
          <StockMaintainance
            items={
              type === "food" ? outOfStockItems.food : outOfStockItems.grocery
            }
            location={authCtx.user.location}
            type={type}
            removeHandler={removeHandler}
            checkHandler={checkHandler}
          />
        )} */}
      </div>
      <div>
        <Switch>
          <Route path="/home/dashboard/allorder">
            <OrderMaintain
              orders={orders.allOrders}
              updateOrderStatus={(order, status) => updateOrder(order, status)}
              assignDeliveryUser={assignDeliveryUser}
            />
          </Route>
          <Route path="/home/dashboard/neworder">
            <OrderMaintain
              orders={orders.newOrders}
              updateOrderStatus={(order, status) => {
                updateOrderStatus(order, status);
              }}
            />
          </Route>
          <Route path="/home/dashboard/preparing">
            <OrderMaintain
              orders={orders.preparingOrders}
              assignDeliveryUser={assignDeliveryUser}
            />
          </Route>
          <Route path="/home/dashboard/ondeliver">
            <OrderMaintain orders={orders.onDeliveryOrders} />
          </Route>
          <Route path="/home/dashboard/delivered">
            <OrderMaintain
              orders={orders.deliveredOrders}
              type={type}
              location={authCtx.user !== null && authCtx.user.location}
            />
          </Route>
          <Route path="/home/dashboard/manual">
            {authCtx.user !== null && (
              <ManualBilling
                removeOrder={removeOrder}
                onChange={onChangeHandler}
                items={items}
                type={type}
                setItems={(res) => setItems(res)}
                ongoingOrders={
                  type === "food" ? ongoingOrders.food : ongoingOrders.grocery
                }
                currentOrder={
                  type === "food" ? currentOrder.food : currentOrder.grocery
                }
                generateBill={generateBill}
                removeItem={removeItem}
                location={authCtx.user.location}
                setCurrentOrder={(order) => {
                  // console.log("order", ongoingOrders.food);
                  if (type === "food") {
                    setCurrentOrder((prevState) => {
                      return {
                        ...prevState,
                        food: order,
                      };
                    });
                  } else {
                    setCurrentOrder((prevState) => {
                      return {
                        ...prevState,
                        grocery: order,
                      };
                    });
                  }
                }}
                createOrder={createOrder}
              />
            )}
          </Route>
        </Switch>
        {/* <Switch>
          <Route path="/home/dashboard/foodorder">
            <Orders type="food" />
          </Route>
          <Route path="/home/dashboard/groceryorder">
            <Orders type="grocery" />
          </Route>
        </Switch> */}
        {/* <StockMaintainance /> */}
      </div>
      <div id="snackbar-container"></div>
    </>
  );
};

export default Dashboard;
