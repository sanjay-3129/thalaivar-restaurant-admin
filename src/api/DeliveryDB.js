import { db } from "../services/firebase";

// read all - food & grocery
// not in use, bcs it needs unsubscribe, which should be directly done in respecive component
// const getDeliveryUsers = (location, setList) => {
//   let list = [];
//   db.collection("DeliveryUsers")
//     .doc("Branches")
//     .collection(location)
//     .where("verification", "==", "verified")
//     .onSnapshot((docs) => {
//       docs.forEach((doc) => {
//         list.push(doc.data());
//       });
//       setList(list);
//       list = [];
//     });
// };

const acceptDeliveryUser = (location, id, setList) => {
  // console.log("Accepted");
  let value = window.confirm("Do you want Accept");
  if (value) {
    db.collection("DeliveryUsers")
      .doc("Branches")
      .collection(location)
      .doc(id)
      .update({
        verification: "verified"
      })
      .then(() => {
        setList(true);
      })
      .catch((e) => {
        console.log(e);

        setList(false);
      });
  } else {
    console.log("Not Accepted");
    setList(false);
  }
};

const rejectDeliveryUser = (location, id, setList) => {
  console.log("Accepted");
  let value = window.confirm("Do you want Reject");
  if (value) {
    db.collection("DeliveryUsers")
      .doc("Branches")
      .collection(location)
      .doc(id)
      .update({
        verification: "rejected"
      })
      .then(() => {
        setList(true);
      })
      .catch((e) => {
        console.log(e);

        setList(false);
      });
  } else {
    console.log("Not Accepted");
    setList(false);
  }
};

const removeDeliveryUser = (location, id, setList) => {
  console.log("Deleted");
  let value = window.confirm("Do you want Delete");
  if (value) {
    console.log("Deleted");

    // db.collection("DeliveryUsers")
    // .doc("Branches")
    // .collection(location)
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     setList(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);

    //     setList(false);
    //   });
  } else {
    console.log("Not Accepted");
    setList(false);
  }
};

export {
  // getDeliveryUsers,
  acceptDeliveryUser,
  rejectDeliveryUser,
  removeDeliveryUser
};
