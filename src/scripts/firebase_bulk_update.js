import { getItems } from "../api/ItemDB";
import { db } from "../services/firebase";

const updateProductId = () => {
  console.log("updateProductId");

  const type = "Grocery";
  const title = "soaps";

  getItems(title, type, (items) => {
    console.log("items: ", items);
    items.forEach((item, i) => {
      // console.log(i);
      db.collection(type)
        .doc(type + "_Types")
        .collection(title)
        .doc(item.id)
        .update({
          product_id: `${i + 1}`,
        })
        .then(() => {
          console.log("Sucess for product id: ", item.id);
        })
        .catch((e) => {
          console.log("updateItem()", e);
        });
    });
  });
};

export { updateProductId };
