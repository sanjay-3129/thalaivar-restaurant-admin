import localforage from "localforage";
import { CardColumns } from "react-bootstrap";
import { db, firebase } from "../services/firebase";

const noOfDaysInNormalYear = {
  "01": 31,
  "02": 28,
  "03": 31,
  "04": 30,
  "05": 31,
  "06": 30,
  "07": 31,
  "08": 31,
  "09": 30,
  10: 31,
  11: 30,
  12: 31,
};
const noOfDaysInLeapYear = {
  "01": 31,
  "02": 29,
  "03": 31,
  "04": 30,
  "05": 31,
  "06": 30,
  "07": 31,
  "08": 31,
  "09": 30,
  10: 31,
  11: 30,
  12: 31,
};

// program to check leap year
const checkLeapYear = (year) => {
  //three conditions to find out the leap year
  if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
    return true;
  } else {
    return false;
  }
};

const genrateBillOrder = (order) => {
  console.log("orderdb genbil", order);

  //local storage code
};

const billPaidOrder = (order, type, location, isAdded) => {
  console.log("billPaidOrder", order, location, type);
  console.log("->", order.items);
  let orderType;
  if (type === "food") {
    orderType = "FoodOrders";
  } else {
    orderType = "GroceryOrders";
  }

  let daitem = order.items;
  let its = [];
  for (let item of daitem) {
    let updateitem = {
      itemName: item.Name,
      itemId: item.id,
      itemPrice: +item.itemPrice,
      itemSize: +item.itemSize,
      noOfQuantity: +item.itemQuantity,
    };
    its.push(updateitem);
  }

  let data;

  if (type === "food") {
    data = {
      ...order,
      order_items: its,
      actualPrice: order.totalPrice,
      status: "delivered",
    };
  } else {
    data = {
      ...order,
      order_items: its,
      actualPrice: order.totalPrice,
      status: "delivered",
    };
  }
  data.timestamp = "" + new Date().getTime();
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  // delete items bcs we have order_items
  // console.log("data-updated", data, `${day}.${month}.${date.getFullYear()}`);
  delete data.items;

  // let orderRef = [];
  // let df = orderRef.push(data);

  db.collection(orderType)
    .doc("branch")
    .collection(location)
    .doc(`${day}.${month}.${date.getFullYear()}`)
    .update({
      orders: firebase.firestore.FieldValue.arrayUnion(data),
    })
    .then(() => {
      isAdded(true);
      console.log("Dine in Item updated");
    })
    .catch((e) => {
      // console.log(e, "errorrrrs");
      db.collection(orderType)
        .doc("branch")
        .collection(location)
        .doc(`${day}.${month}.${date.getFullYear()}`)
        .set({
          orders: [data],
        })
        .then(() => {
          isAdded(true);
          console.log("Dine in Item created");
        })
        .catch((e) => {
          // console.log(e);
          isAdded(false);
        });
    });
};

const createDocumentIds = (days, month, year) => {
  let docIds = [];
  for (let i = 1; i <= days; i++) {
    let doc = "";
    if (i < 10) {
      doc = "0" + i + "." + month + "." + year;
    } else {
      doc = i + "." + month + "." + year;
    }
    docIds.push(doc);
  }
  return docIds;
};

const addTelOrders = (order, type, location, isAdded) => {
  console.log("..............>>", order, location);
  console.log("->", order.items, type);
  let orderType;
  if (type === "food") {
    orderType = "FoodOrders";
  } else {
    orderType = "GroceryOrders";
  }

  let daitem = order.items;
  let its = [];
  for (let item of daitem) {
    let updateitem = {
      itemName: item.Name,
      itemId: item.id,
      itemPrice: item.itemPrice,
      itemSize: item.itemSize,
      // noOfQuantity: item.itemQuantity
    };
    its.push(updateitem);
  }
  // console.log("itss", its);
  let data;
  if (type === "food") {
    data = {
      ...order,
      order_items: its,
      actualPrice: order.totalPrice,
      status: "booked",
    };
  } else {
    data = {
      ...order,
      order_items: its,
      actualPrice: order.totalPrice,
      status: "booked",
    };
  }
  data.timestamp = "" + new Date().getTime();
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  // delete items bcs we have order_items
  delete data.items;
  console.log("ordersss", data);

  db.collection(orderType)
    .doc("todayOrders")
    .collection(location)
    .doc(data.id)
    .set(data)
    .then((docRef) => {
      isAdded(true);
    })
    .catch((e) => {
      console.log(e);
      isAdded(false);
    });
};

const getDeliveredOrders = (type, location, setOrders) => {
  let ty = "";
  if (type === "food") {
    ty = "FoodOrders";
  } else {
    ty = "GroceryOrders";
  }
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
  db.collection(ty)
    .doc("branch")
    .collection(location)
    .doc(date)
    .get()
    .then((doc) => {
      let orders = doc.data().orders;
      setOrders(orders);
    })
    .catch((e) => {
      console.log(e);
      setOrders(null);
    });
};

// // read all - food & grocery
const getOrders = (date, type, location, setOrders) => {
  // let list = [];
  let ty = "";
  // let date = "";
  if (type === "food") {
    ty = "FoodOrders";
    // date = "02.11.2021";
  } else {
    ty = "GroceryOrders";
    // date = "03.11.2021";
  }
  let datee = new Date();
  let day = datee.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = datee.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = datee.getFullYear();
  date = day + "." + month + "." + year;
  // console.log("date", date);
  // let listStat = new Array(10).fill(0);
  let onlineStat = new Array(10).fill(0);
  let dineInStat = new Array(10).fill(0);
  db.collection(ty)
    .doc("branch")
    .collection(location)
    .doc(date)
    .get()
    .then((doc) => {
      let orders = doc.data().orders;
      // console.log("o", orders);
      // let monthStat = doc.data().month;
      let onlineRevenue = 0;
      let dineInRevenue = 0;
      // console.log(orders);
      orders.forEach((o) => {
        let hour = new Date(parseInt(o.timestamp)).getHours();
        if (o.type === "online") {
          onlineRevenue += o.totalPrice;
        } else {
          dineInRevenue += o.totalPrice;
        }
        // console.log(hour);
        if (hour >= 6 && hour < 8) {
          if (o.type === "online") {
            onlineStat[0]++;
          } else {
            dineInStat[0]++;
          }
        } else if (hour >= 8 && hour < 10) {
          if (o.type === "online") {
            onlineStat[1]++;
          } else {
            dineInStat[1]++;
          }
        } else if (hour >= 10 && hour < 12) {
          if (o.type === "online") {
            onlineStat[2]++;
          } else {
            dineInStat[2]++;
          }
        } else if (hour >= 12 && hour < 14) {
          if (o.type === "online") {
            onlineStat[3]++;
          } else {
            dineInStat[3]++;
          }
        } else if (hour >= 14 && hour < 16) {
          if (o.type === "online") {
            onlineStat[4]++;
          } else {
            dineInStat[4]++;
          }
        } else if (hour >= 16 && hour < 18) {
          if (o.type === "online") {
            onlineStat[5]++;
          } else {
            dineInStat[5]++;
          }
        } else if (hour >= 18 && hour < 20) {
          if (o.type === "online") {
            onlineStat[6]++;
          } else {
            dineInStat[6]++;
          }
        } else if (hour >= 20 && hour < 22) {
          if (o.type === "online") {
            onlineStat[7]++;
          } else {
            dineInStat[7]++;
          }
        } else if (hour >= 22 && hour < 24) {
          if (o.type === "online") {
            onlineStat[8]++;
          } else {
            dineInStat[8]++;
          }
        } else if (hour >= 0 && hour < 6) {
          if (o.type === "online") {
            onlineStat[9]++;
          } else {
            dineInStat[9]++;
          }
        }
      });
      // monthStat.sort((a, b) =>
      //   a.monthNo > b.monthNo ? 1 : b.monthNo > a.monthNo ? -1 : 0
      // );
      // for (let i = 0; i < monthStat.length; i++) {
      //   listStat[i] += monthStat[i].noOfOrders;
      // }
      // console.log("list-data", listStat);
      if (orders.length === 0) {
        setOrders("empty");
      } else {
        let listStat = {
          onlineStat: onlineStat,
          onlineRevenue: onlineRevenue,
          dineInStat: dineInStat,
          dineInRevenue: dineInRevenue,
        };
        setOrders(orders, listStat);
      }
    })
    .catch((e) => {
      let listStat = {
        onlineStat: 0,
        onlineRevenue: 0,
        dineInStat: 0,
        dineInRevenue: 0,
      };
      console.log("getFo", e);
      setOrders("empty", listStat);
    });
};

// get orders for whole month
const getMonthOrders = (type, location, filter, setOrders) => {
  // current month
  // previous month - differnt year
  let date = filter.value.split("-");
  let year = date[0];
  let month = date[1];
  let days;
  let noOfDays;

  let ty = "";
  if (type === "food") {
    ty = "FoodOrders";
    // date = "02.11.2021";
  } else {
    ty = "GroceryOrders";
    // date = "03.11.2021";
  }
  let list = [];
  let listPromises = [];
  // leap year or not
  let isLeap = checkLeapYear(parseInt(year));
  if (isLeap) {
    days = noOfDaysInNormalYear;
  } else {
    days = noOfDaysInLeapYear;
  }
  if (new Date().getMonth() + 1 == month) {
    // current month
    noOfDays = new Date().getDate();
  } else {
    // other month
    noOfDays = days[month];
  }
  let docIds = createDocumentIds(noOfDays, month, year);
  // console.log("docIds", docIds);
  docIds.forEach((id) => {
    listPromises.push(
      db.collection(ty).doc("branch").collection(location).doc(id).get()
    );
  });
  let listOrders = [];
  // creating empty arrays
  // let listStat = new Array(noOfDays).fill(0);
  let onlineStat = new Array(noOfDays).fill(0);
  let dineInStat = new Array(noOfDays).fill(0);
  let onlineRevenue = 0;
  let dineInRevenue = 0;
  Promise.all(listPromises)
    .then((values) => {
      values.forEach((val) => {
        // console.log("data", val.data());
        let data = val.data();
        list.push(data);
      });
    })
    .then(() => {
      if (list.length === 0) {
        setOrders("empty");
      } else {
        // console.log("else", list);
        for (let i = 0; i < list.length; i++) {
          // console.log("list", list);
          if (list[i] !== undefined) {
            let orders = list[i].orders;
            listOrders = [...listOrders, ...orders];
            // if(list[i])
            orders.forEach((o) => {
              if (o.type === "online") {
                onlineStat[i]++;
                onlineRevenue += o.totalPrice;
              } else {
                dineInStat[i]++;
                dineInRevenue += o.totalPrice;
              }
            });
          }
        }
        // console.log(list);
        let listStat = {
          onlineStat: onlineStat,
          onlineRevenue: onlineRevenue,
          dineInStat: dineInStat,
          dineInRevenue: dineInRevenue,
        };
        setOrders(listOrders, listStat);
      }
    })
    .catch((e) => {
      let listStat = {
        onlineStat: 0,
        onlineRevenue: 0,
        dineInStat: 0,
        dineInRevenue: 0,
      };
      setOrders("empty", listStat);
      console.log(e);
    });
};

// get orders for whole year
const getYearOrders = (type, location, filter, setOrders) => {
  let ty = "";
  let date = "";
  if (type === "food") {
    ty = "FoodOrders";
    // date = "02.11.2021";
  } else {
    ty = "GroceryOrders";
    // date = "03.11.2021";
  }

  let list = [];
  let listOrders = [];
  let listStat = [];
  let listPromises = [];
  let year = filter.value;
  let docIds = createDocumentIds(31, "12", year);
  // console.log("docIds", docIds);
  docIds.forEach((id) => {
    listPromises.push(
      db.collection(ty).doc("branch").collection(location).doc(id).get()
    );
  });

  Promise.all(listPromises)
    .then((values) => {
      values.forEach((val) => {
        // console.log("data", val.data());
        let data = val.data();
        if (data !== undefined) {
          list.push(data);
          // let order = val.data().orders;
          // let statData = val.data().month;
          // listOrders.push(order);
          // listStat.push(statData);
        }
      });
    })
    .then(() => {
      // console.log("list", list);
      if (list.length === 0) {
        setOrders("empty");
      } else {
        list.forEach((l) => {
          listOrders = [...listOrders, ...l.orders];
        });
        let monthStat = list[list.length - 1].month;
        monthStat.sort((a, b) =>
          a.monthNo > b.monthNo ? 1 : b.monthNo > a.monthNo ? -1 : 0
        );
        for (let i = 0; i < monthStat.length; i++) {
          listStat[i] += monthStat[i].noOfOrders;
        }
        // console.log("list-data", listStat);
        setOrders(listOrders, listStat);
      }
    })
    .catch((e) => console.log(e));
};
var unsubscribe;

const removeListener = () => {
  try {
    if (unsubscribe instanceof Function) {
      unsubscribe();
    } else {
      console.log("Not a function");
    }
  } catch (e) {
    console.log(e);
  }
};

const getTodayOrders = (date, type, location, setOrders) => {
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
    .collection(location)
    .onSnapshot(
      (docs) => {
        docs.forEach((doc) => {
          list.push(doc.data());
        });
        setOrders(list);
        list = [];
        console.log("unsub", unsubscribe);
      },
      (e) => console.log(e)
    );
  // db.collection(ty)
  //   .doc("todayOrders")
  //   .collection(location)
  //   .get()
  //   .then((docs) => {
  //     docs.forEach((doc) => {
  //       // console.log("doc", doc.data());
  //       list.push(doc.data());
  //     });
  //     setOrders(list);
  //   })
  //   .catch((e) => console.log(e));
  // db.collection(ty)
  //   .doc("todayOrders")
  //   .collection(location)
  //   .onSnapshot((docs) => {
  //     docs.forEach((doc) => {
  //       list.push(doc.data());
  //     });
  //     setOrders(list);
  //     list = [];
  //   });
};

const updateOrderStatus = (type, location, order, status, isUpdated) => {
  let ty = "";
  if (type === "food") {
    ty = "FoodOrders";
    // date = "02.11.2021";
  } else {
    ty = "GroceryOrders";
    // date = "03.11.2021";
  }

  // let orderStatus = status;
  let data = "";
  if (status === "preparing") {
    data = {
      status: "preparing",
    };
    db.collection(ty)
      .doc("todayOrders")
      .collection(location)
      .doc(order.id)
      .update(data)
      .then(() => {
        isUpdated(true);
      })
      .catch((e) => {
        console.log(e);
        isUpdated(false);
      });
  } else if (status === "assigned") {
    data = {
      status: "assigned",
      dBoyId: order.dBoyId,
    };
    db.collection(ty)
      .doc("todayOrders")
      .collection(location)
      .doc(order.id)
      .update(data)
      .then(() => {
        db.collection("DeliveryUsers")
          .doc("Branches")
          .collection(location)
          .doc(order.dBoyId)
          .update({
            userStatus: "Assigned",
          })
          .then(() => {
            isUpdated(true);
          })
          .catch((e) => {
            console.log(e);
            // isUpdated(false);
          });
      })
      .catch((e) => {
        console.log(e);
        isUpdated(false);
      });
  }
  console.log("updateOrderStatus", location, order.id);
};

const getRestaurantStatus = (location, sendData) => {
  db.collection("meta")
    .doc("metaDetails")
    .get()
    .then((doc) => {
      console.log(doc.data());
      sendData({
        status: "success",
        data: doc.data().isHoliday[`${location}`],
      });
    })
    .catch((e) => {
      console.log(e);
      sendData({
        status: "failure",
        error: e,
      });
    });
};

const setRestaurantStatus = (location, isRestaurantOpen, sendData) => {
  var isHoliday = {};
  isHoliday[`isHoliday.${location}`] = isRestaurantOpen;

  console.log(isHoliday, location, isRestaurantOpen);

  db.collection("meta")
    .doc("metaDetails")
    .update(isHoliday)
    .then(() => {
      sendData(true);
    })
    .catch((e) => {
      console.log(e);
      sendData(false);
    });
};

// Get Orders Based On Parameters
// const getOrdersBP = (type, location, setOrders) => {};

export {
  getOrders,
  getTodayOrders,
  getMonthOrders,
  getYearOrders,
  updateOrderStatus,
  addTelOrders,
  genrateBillOrder,
  billPaidOrder,
  removeListener,
  getDeliveredOrders,
  getRestaurantStatus,
  setRestaurantStatus,
};

// const updateOrderStatus = (date, type, location, order, status) => {
//   console.log("updateOrderStatusDB", order, status);
//   // if u have listener then no need to get orders again
//   // now we will get the order and update immedietly
//   // let list = [];
//   let ty = "";
//   // let date = "";
//   if (type === "food") {
//     ty = "FoodOrders";
//     date = "02.11.2021";
//   } else {
//     ty = "GroceryOrders";
//     date = "03.11.2021";
//   }
//   getTodayOrders(date, type, location, (orders, manualBillNo) => {
//     if (orders === "empty") {
//       console.log("No Items!!!");
//     } else {
//       console.log("ordersINDB", orders, manualBillNo);
//       let index = orders.findIndex((o) => o.id === order.id);
//       let updatedOrder = {
//         ...order,
//         status: status
//       };
//       orders[index] = updatedOrder;
//       db.collection(ty)
//         .doc("branch")
//         .collection(location)
//         .doc(date)
//         .update({
//           orders: orders
//         })
//         .then(() => {
//           console.log("successfully updated!!!");
//         })
//         .catch((e) => console.log(e));
//     }
//   });
// };

// const getTodayOrders = (date, type, location, setOrders) => {
//   // let list = [];
//   let ty = "";
//   // let date = "";
//   if (type === "food") {
//     ty = "FoodOrders";
//     date = "02.11.2021";
//   } else {
//     ty = "GroceryOrders";
//     date = "03.11.2021";
//   }
//   // let date = new Date();
//   // let day = date.getDate();
//   // if (day < 10) {
//   //   day = "0" + day;
//   // }
//   // let month = date.getMonth() + 1;
//   // if (month < 10) {
//   //   month = "0" + month;
//   // }
//   // let year = date.getFullYear();
//   // date = day + "." + month + "." + year;
//   // console.log("date", date);
//   db.collection(ty)
//     .doc("branch")
//     .collection(location)
//     .doc(date)
//     // .get()
//     // .then((doc) => {
//     .onSnapshot((doc) => {
//       let orders = doc.data().orders;
//       let manualBillingNo = doc.data().manualBillNo;
//       // console.log("o", orders);
//       // let monthStat = doc.data().month;
//       if (orders.length === 0) {
//         setOrders("empty");
//       } else {
//         setOrders(orders, manualBillingNo);
//       }
//     });
//   // .catch((e) => {
//   //   console.log("getFo", e);
//   //   setOrders("empty");
//   // });
// };
