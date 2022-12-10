import React, { useEffect, useState } from "react";
// import { Toast, ToastContainer } from "react-bootstrap";
// import { getFood } from "../../api/FoodDB";
import { getItems, deleteItem, updateItem } from "../../api/ItemDB";
import EditModal from "../../ui/EditModal/EditModal";
import GroceryEditModal from "../../ui/EditModal/GroceryEditModal";
import snackbar from "../../ui/Snackbar/Snackbar";
import Card from "../Card/Card";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";

const Items = (props) => {
  const [item, setItem] = useState(null);
  const [items, setItems] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModel] = useState(false);

  useEffect(() => {
    getItems(props.title, props.type, (res) => {
      console.log("res", res);
      let list = [];
      let item;
      res.forEach((it) => {
        if (it.branch[props.authCtx.user.location] === undefined) {
          if (props.type === "Food") {
            item = {
              ...it,
            };
            item.branch[props.authCtx.user.location] = {
              Bestseller: false,
              BranchName: props.authCtx.user.location,
              current_price: 0,
              dealoftheday: false,
              unit: 0,
            };
          } else {
            item = {
              ...it,
            };
            item.branch[props.authCtx.user.location] = {
              Bestseller: false,
              BranchName: props.authCtx.user.location,
              current_price: 0,
              dealoftheday: false,
              unit: 0,
            };
          }
          list.push(item);
        } else {
          list.push(it);
        }
      });
      // console.log("list", list);
      setItems(list);
    });
  }, [props.title, props.type]);

  const updateItemHandler = (updatedItem, price, quantity, type) => {
    // if data not updated
    // console.log("upitem", updatedItem, price, quantity, type);
    // console.log("updatedItem", item);
    let isUpdate = true;
    if (item === updatedItem) {
      if (type === "Food") {
        alert("You didn't update anything!!!");
        isUpdate = false;
      } else {
        if (price === "normalPrice") {
          // console.log(item[props.authCtx.user.location].price);
          if (
            item.branch[props.authCtx.user.location].current_price ===
            updatedItem.branch[props.authCtx.user.location].current_price
          ) {
            alert("You didn't update anything!!!");
            isUpdate = false;
          }
        } else {
          if (item.branch[props.authCtx.user.location].price === quantity) {
            alert("You didn't update anything!!!");
            isUpdate = false;
          }
        }
      }
    }
    if (isUpdate) {
      // updated
      updateItem(
        updatedItem,
        price,
        quantity,
        props.title,
        props.type,
        props.authCtx.user.location,
        (isUpdated) => {
          if (isUpdated === false) {
            snackbar(item, "Sorry Not Updated");
          } else {
            console.log("isUpdated", isUpdated);
            let list = [...items];
            let index = list.findIndex((i) => {
              return i.id === updatedItem.id;
            });
            list[index] = isUpdated;
            setItems(list);
            snackbar(item, "Successfully Updated");
            setUpdateModel(false);
          }
        }
      );
    }
  };

  const deleteItems = (item) => {
    // console.log("items", item);
    deleteItem(item, props.title, props.type, (isDeleted) => {
      if (isDeleted) {
        let itemsList = [...items];
        let list = itemsList.filter((it) => {
          return it.id !== item.id;
        });
        setItems(list);
        snackbar(item, "Successfully Deleted");
      } else {
        snackbar(item, "Failed To Delete, Try Again!!!");
      }
    });
    setDeleteModal(false);
  };

  let ui = null;
  if (items === null) {
    ui = <p>Loading!!!</p>;
  } else {
    if (items.length <= 0) {
      ui = <p>No Items!!!</p>;
    } else {
      ui = items.map((item, i) => (
        <Card
          key={i}
          item={item}
          deleteItem={(it) => {
            setDeleteModal(true);
            setItem(it);
          }}
          type={props.type}
          location={props.authCtx.user.location}
          updateItem={(it) => {
            setItem(it);
            setUpdateModel(props.type);
          }}
        />
      ));
    }
  }

  return (
    <>
      {updateModal === "Food" ? (
        <EditModal
          item={item}
          showModal={updateModal}
          closeModal={() => setUpdateModel(false)}
          updateItem={updateItemHandler}
          location={props.authCtx.user.location}
        />
      ) : (
        updateModal === "Grocery" && (
          <GroceryEditModal
            item={item}
            showModal={updateModal}
            closeModal={() => setUpdateModel(false)}
            updateItem={updateItemHandler}
            location={props.authCtx.user.location}
          />
        )
      )}
      {/* {updateModal && (
        <GroceryEditModal
          item={item}
          showModal={updateModal}
          closeModal={() => setUpdateModel(false)}
          updateItem={updateItemHandler}
        />
      )} */}
      {deleteModal && (
        <DeleteConfirmModal
          item={item}
          showModal={deleteModal}
          handleClose={() => setDeleteModal(false)}
          confirmDelete={deleteItems}
          location={props.authCtx.user.location}
        />
      )}
      <h1>{props.title}</h1>
      <div class="row item-card">{ui}</div>
      <div id="snackbar-container"></div>
    </>
  );
};

export default Items;
