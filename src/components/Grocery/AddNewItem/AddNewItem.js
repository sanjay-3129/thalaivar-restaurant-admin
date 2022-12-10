import React, { useContext, useEffect, useState } from "react";
import AddNewForm from "./AddNewForm";
import $ from "jquery";
import { addItem } from "../../../api/ItemDB";
import AlertModal from "../../../reusable/Modals/AlertModal";
import AuthContext from "../../../context/auth-context";

const AddNewItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [item, setItem] = useState({
    id: "",
    productId: "", // we generate it
    name: "",
    img: {
      file: null,
      url: "",
    },
    // altName: "", // brand name
    desc: "",
    category: "", // breakfase, lunch, dinner
    // style: "",
    foodType: "", // nonveg, veg
    offer: 0, // actual price - offer price = current price
    bestSeller: false,
    currencyCode: 356, // 356 - INR
    dealOfTheDay: false,
    onSale: false,
    minimumUnit: 0,
    actualUnit: 0,
    quantityPerUnit: 1,
    isProductAvailable: false,
    priceItem: [
      {
        id: 0,
        quantity: 0,
        units: "",
        actualPrice: 0,
        currentPrice: 0,
      },
    ],
    actualPrice: 0,
    currentPrice: 0, // doubt
    // categories: ["dhosa"]
    // foodAvailable: [
    //   {
    //     branch: "vellore",
    //     minimumUnit: 0,
    //     quantityPerUnit: 0,
    //     isProductAvailable: false
    //   }
    // ],
  });
  const [price, setPrice] = useState(null);
  const [alert, setAlert] = useState(null);
  // const [priceChoice, setPriceChoice] = useState();
  // useEffect(() => {
  //   if (price === "normalPrice") {
  //     // console.log("normalpyy");

  //     setItem((prevState) => {
  //       return {
  //         ...prevState,
  //         priceItem: {
  //           actualPrice: 0,
  //           currentPrice: 0
  //         }
  //       };
  //     });
  //   } else {
  //     // console.log("dvgfdihbkvdjk");

  //     setItem((prevState) => {
  //       return {
  //         ...prevState,
  //         priceItem: [
  //           {
  //             id: 0,
  //             quantity: 0,
  //             units: "",
  //             actualPrice: 0,
  //             currentPrice: 0
  //           }
  //         ]
  //       };
  //     });
  //   }
  // }, [price]);

  const onChangeHandler = (event) => {
    console.log("event.name", event.target.name, event.target.value);

    // setChecked((prevState) => !prevState);

    let value = event.target.value;
    let ename = event.target.name;

    if (ename === "img") {
      value = event.target.files[0];
      // console.log("url", URL.createObjectURL(value));
      setItem((prevState) => {
        return {
          ...prevState,
          img: {
            file: value,
            url: URL.createObjectURL(value),
          },
        };
      });
    } else if (
      ename === "dealOfTheDay" ||
      ename === "onSale" ||
      ename === "isProductAvailable" ||
      ename === "bestSeller"
    ) {
      setItem((prevState) => {
        value = !prevState[event.target.name];
        // console.log(event.target.name, value);
        return {
          ...prevState,
          [event.target.name]: value,
        };
      });
    } else if (ename === "price") {
      setPrice(value);
      if (value === "normalPrice") {
        setItem((prevState) => {
          return {
            ...prevState,
            priceItem: {
              actualPrice: 0,
              currentPrice: 0,
            },
          };
        });
      } else {
        setItem((prevState) => {
          return {
            ...prevState,
            priceItem: [
              {
                id: 0,
                quantity: 0,
                units: "",
                actualPrice: 0,
                currentPrice: 0,
              },
            ],
          };
        });
      }
    } else if (ename === "actualPrice") {
      setItem((prevState) => {
        return {
          ...prevState,
          priceItem: {
            ...prevState.priceItem,
            actualPrice: value,
          },
        };
      });
    } else if (ename === "currentPrice") {
      setItem((prevState) => {
        return {
          ...prevState,
          // priceItem: {
          //   ...prevState.priceItem,
          //   currentPrice: value,
          // },
          [event.target.name]: value,
        };
      });
    } else {
      setItem((prevState) => {
        return {
          ...prevState,
          [event.target.name]: value,
        };
      });
    }
  };

  const clearHandler = () => {
    document.getElementById("img").value = "";
    $(":checkbox").prop("checked", false);
    $('input[name="category"]').prop("checked", false);
    $('input[name="foodType"]').prop("checked", false);
    $('input[name="style"]').prop("checked", false);
    $('input[name="price"]').prop("checked", false);
    setPrice(null);
    setItem({
      id: "",
      productId: "", // we generate it
      name: "",
      img: {
        file: null,
        url: "",
      },
      // altName: "", // brand name
      desc: "",
      category: "", // breakfase, lunch, dinner
      // style: "",
      foodType: "", // nonveg, veg
      offer: 0, // actual price - offer price = current price
      bestSeller: false,
      currencyCode: 356, // 356 - INR
      dealOfTheDay: false,
      onSale: false,
      minimumUnit: 0,
      actualUnit: 0,
      quantityPerUnit: 1,
      isProductAvailable: false,
      priceItem: [
        {
          id: 0,
          quantity: 0,
          units: "",
          actualPrice: 0,
          currentPrice: 0,
        },
      ],
      actualPrice: 0,
      currentPrice: 0, // doubt
      // categories: ["dhosa"]
      // foodAvailable: [
      //   {
      //     branch: "vellore",
      //     minimumUnit: 0,
      //     quantityPerUnit: 0,
      //     isProductAvailable: false
      //   }
      // ],
    });
  };

  const draftHandler = (e) => {
    console.log("drafthandler");
    e.preventDefault();
    console.log("item", item, price);
    if (item.category === "") {
      setAlert({
        title: "Missing Mandatory Fields",
        body: "Select Category!!!",
        status: true,
      });
    }
    // else if (item.foodType === "") {
    //   setAlert({
    //     title: "Missing Mandatory Fields",
    //     body: "Select FoodType!!!",
    //     status: true,
    //   });
    // }
    // else if (item.style === "") {
    //   setAlert({
    //     title: "Missing Mandatory Fields",
    //     body: "Select Style!!!",
    //     status: true,
    //   });
    // }
    else if (price === null) {
      setAlert({
        title: "Missing Mandatory Fields",
        body: "select normal price!!!",
        // body: "select normal price or quantity to proceed!!!",
        status: true,
      });
    } else {
      let isAddItem = true;

      let pricee = item;  
      if (pricee.length === undefined || pricee.length === null) {
        // priceItem is map
        // if (pricee.actualPrice === 0 || pricee.currentPrice === 0) {
        if (pricee.currentPrice === 0) {
          setAlert({
            title: "Missing Mandatory Fields",
            body: "Value should be greater than 0!!!",
            status: true,
          });
          isAddItem = false;
        }
      } else {
        // priceItem is array
        for (let i = 0; i < pricee.length; i++) {
          if (pricee[i].units === "") {
            setAlert({
              title: "Missing Mandatory Fields",
              body: "select units for all quantity like kilogram, liters etc!!!",
              status: true,
            });
            isAddItem = false;
            break;
          } else if (
            // pricee[i].quantity <= 0 ||
            // pricee[i].actualPrice <= 0 ||
            pricee[i].currentPrice <= 0
          ) {
            setAlert({
              title: "Missing Mandatory Fields",
              body: "Price should not be 0!!!",
              // body: "Quantity or Price should not be 0!!!",
              status: true,
            });
            isAddItem = false;
            break;
          }
        }
      }
      console.log("isaddItem", isAddItem, props.type, authCtx);
      if (isAddItem) {
        addItem(item, price, props.type, authCtx, (isAdded) => {
          if (isAdded) {
            // db added
            window.alert("Successfully Added!!!");
            clearHandler();
          } else {
            // error not adding
            window.alert("Not Added... Try Again!!!");
          }
        });
      }
      // console.log("new Data", item);
    }
  };

  return (
    <div class="add-new">
      {alert !== null && alert.status === true && (
        <AlertModal
          title={alert.title}
          body={alert.body}
          showModal={alert.status}
          handleClose={() => setAlert(null)}
        />
      )}
      <h2>Add one or more items</h2>
      <div class="add-form">
        <AddNewForm
          item={item}
          onChangeHandler={onChangeHandler}
          priceItemChangeHandler={(list) =>
            setItem((prevState) => {
              // console.log("list", list);
              return {
                ...prevState,
                priceItem: list,
              };
            })
          }
          draftHandler={draftHandler}
          clearHandler={clearHandler}
          price={price}
        />
        ;
      </div>
    </div>
  );
};

export default AddNewItem;
