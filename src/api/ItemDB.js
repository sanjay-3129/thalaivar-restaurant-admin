import { db, firebase } from "../services/firebase";

const getItem = (title, type, itemId, location, addOutOfStock) => {
  // console.log("ItemDB", title);
  // let list = [];
  db.collection(type)
    .doc(type + "_Types")
    .collection(title) // BreakFast, PersonalCare
    .doc(itemId)
    .get()
    .then((doc) => {
      let item = doc.data();
      console.log("itemm", item, location);
      if (item.branch[location].unit <= item.branch[location].minimumUnit) {
        addOutOfStock(item);
      } else {
        addOutOfStock(null);
      }
    })
    .catch((e) => console.log("getItem()", e));
};

const setItem = (title, type, item, location, addOutOfStock) => {
  console.log("item", item, title, type, location);
  let data = {
    ...item,
  };
  // let data = {
  //   [location]: {
  //     ...item[location],
  //     unit: parseInt(item[location].unit),
  //   },
  // };
  data.branch[location] = {
    ...item.branch[location],
    unit: parseInt(item.branch[location].unit),
  };
  if (type === "Food") {
    if (item.Type === "Breakfast") {
      title = "BreakFast";
    } else if (item.Type === "Lunch") {
      title = "Lunch";
    } else if (item.Type === "Dinner") {
      title = "Dinner";
    }
  } else {
    if (item.Type === "Rice") {
      title = "Rice";
    } else if (item.Type === "Fruits_Vegetables") {
      title = "Fruits_Vegetables";
    } else if (item.Type === "Summer_Drinks_Beverage") {
      title = "Summer_Drinks_Beverage";
    } else if (item.Type === "soaps") {
      title = "soaps";
    } else if (item.Type === "Pharmacy") {
      title = "Pharmacy";
    } else if (item.Type === "Organics") {
      title = "Organics";
    }
  }
  db.collection(type)
    .doc(type + "_Types")
    .collection(title) // BreakFast, PersonalCare
    .doc(item.id)
    .update(data)
    .then(() => {
      console.log("success");
      addOutOfStock(true);
    })
    .catch((e) => {
      console.log("setItem()", e);
      addOutOfStock(false);
    });
};

// read all - food & grocery
const getItems = (title, type, setItems) => {
  console.log("ItemDB", title, type);
  let list = [];
  db.collection(type)
    .doc(type + "_Types")
    .collection(title) // BreakFast, PersonalCare
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        list.push(item);
      });
    })
    .then(() => {
      setItems(list);
    })
    .catch((e) => console.log("getItems()", e));
};

// get multi title items
const getMultiTitleItems = (titles, type, setItems) => {
  // let titles = [...title];
  let list = [];
  let listPromises = [];
  titles.forEach((tit) => {
    console.log("tit", tit, type);
    listPromises.push(
      db
        .collection(type)
        .doc(type + "_Types")
        .collection(tit) // BreakFast, PersonalCare
        .get()
    );
  });
  Promise.all(listPromises)
    .then((value) => {
      // console.log("res", value);
      value.forEach((val) => {
        val.forEach((res) => {
          list.push(res.data());
        });
      });
      return list;
    })
    .then((data) => {
      console.log("2nd then", data);
      setItems(data);
    })
    .catch((e) => console.log(e));
};

// add item - food & grocery
const addItem = (item, price, type, authCtx, isAdded) => {
  console.log("item", item, type, price);
  let title = "";
  let priceData = "";
  if (type === "Food") {
    if (item.category === "BreakFast") {
      title = "BreakFast";
    } else if (item.category === "Lunch") {
      title = "Lunch";
    } else if (item.category === "Dinner") {
      title = "Dinner";
    }
  } else {
    if (item.category === "Fruits_Vegetables") {
      title = "Fruits_Vegetables";
    } else if (item.category === "Rice") {
      title = "Rice";
    } else if (item.category === "Summer_Drinks_Beverages") {
      title = "Summer_Drinks_Beverages";
    } else if (item.category === "soaps") {
      title = "soaps";
    } else if (item.category === "Pharmacy") {
      title = "Pharmacy";
    } else if (item.category === "Organics") {
      title = "Organics";
    }
  }

  let bucketName = type === "Food" ? "Foods" : "Grocery";
  let storageRef = firebase.storage().ref();
  let subCategoryTimestamp = +new Date().getTime() + "-" + item.img.file.name;
  let imgRef = storageRef.child(`${bucketName}/${subCategoryTimestamp}`);
  // console.log("submit", subCategoryTimestamp, priceData);
  imgRef.put(item.img.file).then(() => {
    imgRef
      .getDownloadURL()
      .then((img) => {
        let nameSearch = createNameSearchArray(item.name);
        let data = "";
        data = {
          Bestseller: true,
          Name: item.name,
          Type: item.category,
          actual_price: 0,
          branch: {},
          categories: [],
          currency: "",
          current_price: +item.currentPrice,
          dealoftheday: item.dealOfTheDay,
          description: item.desc,
          image: img,
          isproductavailable: item.isProductAvailable,
          product_id: item.productId,
          quantityPerUnit: 1,
          shop_name: "Thalaivar",
          unit: "1",
          name_search: [...nameSearch],
        };
        data.branch[authCtx.user.location] = {
          Bestseller: item.bestSeller,
          BranchName: authCtx.user.location,
          current_price: +item.currentPrice,
          dealoftheday: item.dealOfTheDay,
          unit: parseInt(item.actualUnit),
        };

        db.collection(type)
          .doc(type + "_Types")
          .collection(title)
          .add(data)
          .then((docRef) => {
            console.log("docRef", docRef);
            db.collection(type)
              .doc(type + "_Types")
              .collection(title)
              .doc(docRef.id)
              .update({
                id: docRef.id,
              })
              .then(() => {
                isAdded(true);
                console.log("Item added");
              })
              .catch((e) => {
                isAdded(false);
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
            isAdded(false);
          });
      })
      .catch((e) => {
        console.log(e);
        isAdded(false);
      });
  });
};

// update item - food & grocery
const updateItem = (
  item,
  price,
  quantity,
  title,
  type,
  location,
  isUpdated
) => {
  // console.log("--", item, price, quantity, title, type, location);
  // create name search
  let nameSearch = createNameSearchArray(item.Name);
  // without image
  if (item.img === undefined) {
    console.log("item.img-undefined", item);
    let data = {
      ...item,
      Name: item.Name,
      description: item.description,
      // category: item.category,
      Type: item.Type,
      // [location]: {
      //   isproductavailable: item[location].isproductavailable,
      //   Bestseller: item[location].Bestseller,
      //   dealoftheday: item[location].dealoftheday,
      //   unit: parseInt(item[location].unit),
      //   minimumUnit: parseInt(item[location].minimumUnit),
      //   quantityPerUnit: parseInt(item[location].quantityPerUnit),
      //   price: priceData,
      // },
      name_search: [...nameSearch],
    };
    data.branch[location] = {
      Bestseller: item.branch[location].Bestseller,
      BranchName: location,
      current_price: +item.branch[location].current_price,
      dealoftheday: item.branch[location].dealoftheday,
      unit: +item.branch[location].unit,
    };
    // if (type === "Food") {
    //   data = {
    //     ...data,
    //     style: item.style,
    //   };
    // }
    // // console.log("data", data);
    db.collection(type)
      .doc(type + "_Types")
      .collection(title)
      .doc(item.id)
      .update(data)
      .then(() => {
        let updatedData = {
          ...data,
          id: item.id,
          image: item.image,
          currency: item.currency,
        };
        isUpdated(updatedData);
      })
      .catch((e) => {
        isUpdated(false);
        console.log("updateItem()", e);
      });
  } else {
    console.log("item.img", item.img.name, item.img, item.img.file);
    // image
    let bucketName = type === "Food" ? "Foods" : "Grocery";
    let storageRef = firebase.storage().ref();
    let subCategoryTimestamp = +new Date().getTime() + "-" + item.img.name;
    let imgRef = storageRef.child(`${bucketName}/${subCategoryTimestamp}`);
    // console.log("submit", subCategoryTimestamp, priceData);
    imgRef
      .put(item.img)
      .then(() => {
        console.log("img ref put...");
        imgRef
          .getDownloadURL()
          .then((img) => {
            let data = {
              ...item,
              Name: item.Name,
              image: img,
              description: item.description,
              Type: item.Type,
              name_search: [...nameSearch],
            };
            data.branch[location] = {
              Bestseller: item.branch[location].Bestseller,
              BranchName: location,
              current_price: +item.branch[location].current_price,
              dealoftheday: item.branch[location].dealoftheday,
              unit: +item.branch[location].unit,
            };
            delete data.img;
            // console.log("img", img, data);

            db.collection(type)
              .doc(type + "_Types")
              .collection(title)
              .doc(item.id)
              .update({
                ...data,
              })
              .then(() => {
                isUpdated(data);
                // delete previous image from storage
                let storaRef = firebase.storage();
                storaRef
                  .refFromURL(item.image)
                  .delete()
                  .then(() =>
                    console.log("image deleted successfullty, MyBin.js[284]")
                  )
                  .catch((e) => console.log(e, "already deleted"));
              })
              .catch((e) => {
                isUpdated(false);
                console.log("updateItem()", e);
              });
          })
          .catch((e) => {
            console.log("img update", e);
            isUpdated(false);
          });
      })
      .catch((e) => {
        isUpdated(false);
        console.log("put image", e);
      });
  }
};

const createNameSearchArray = (name) => {
  let pName = name.toLowerCase();
  let list = [];
  let sum = "";
  for (let i = 0; i < pName.length; i++) {
    sum += pName[i];
    list.push(sum);
  }
  return list;
};

// delete item - food & grocery
const deleteItem = (item, title, type, isDeleted) => {
  db.collection(type)
    .doc(type + "_Types")
    .collection(title)
    .doc(item.id)
    .delete()
    .then(() => {
      console.log("successfully deleted");
      firebase
        .storage()
        .refFromURL(item.image)
        .delete()
        .then(() => {
          console.log("image deleted successfullty from firebase storage");
          isDeleted(true);
        })
        .catch((e) => {
          console.log(e);
          isDeleted(false);
        });
    })
    .catch((e) => {
      console.log("deleteItem()", e);
      isDeleted(false);
    });
};

export {
  setItem,
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
  getMultiTitleItems,
};
