import React, { useContext, useEffect, useState } from "react";
import {
  acceptDeliveryUser,
  getDeliveryUsers,
  rejectDeliveryUser,
  removeDeliveryUser,
} from "../api/DeliveryDB";
import DeliveryCard from "../reusable/DeliveryCard";
import { Switch, Route, NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { db } from "../services/firebase";

const Delivery = () => {
  const [deliveryUsers, setDeliveryUsers] = useState({
    newD: [],
    verified: [],
    rejected: [],
  });
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.user !== null) {
      let deliveryList = [];
      let location = authCtx.user.location;
      // location = location[0].toUpperCase() + location.substring(1);
      console.log("location: ", location);
      var unsubscribe = db
        .collection("DeliveryUsers")
        .doc("Branches")
        .collection(location)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            let data = doc.data();
            if (data.user_image_url === "") {
              data.user_image_url =
                "https://www.w3schools.com/howto/img_avatar.png";
            }
            deliveryList.push(data);
          });
          // getDeliveryUsers(true, location, (deliveryList) => {
          console.log("deliveryList", deliveryList);
          let newD = [];
          let verified = [];
          let rejected = [];
          deliveryList.forEach((dguy) => {
            if (dguy.verification === "registered") {
              newD.push(dguy);
            } else if (dguy.verification === "rejected") {
              rejected.push(dguy);
            } else if (dguy.verification === "verified") {
              verified.push(dguy);
            }
          });
          setDeliveryUsers({
            newD: newD,
            verified: verified,
            rejected: rejected,
          });
          deliveryList = [];
          // });
        });

      return () => {
        unsubscribe();
      };
    }
  }, [authCtx.user]);

  const acceptHandler = (user) => {
    acceptDeliveryUser(authCtx.user.location, user.user_id, (isAccepted) => {
      if (isAccepted) {
        console.log("accept");
        // newD -> verified
        // let updatedUser = {
        //   ...user,
        //   userStatus: "verified"
        // };
        // setDeliveryUsers((prevState) => {
        //   if (user.userStatus === "registered") {
        //     let newD = [...prevState.newD];
        //     let verified = [...prevState.verified];
        //     let index = newD.findIndex((u) => u.user_id === user.user_id);
        //     newD.splice(index, 1);
        //     verified.push(updatedUser);
        //     return {
        //       ...prevState,
        //       newD: newD,
        //       verified: verified
        //     };
        //   } else {
        //     let rejected = [...prevState.rejected];
        //     let verified = [...prevState.verified];
        //     let index = rejected.findIndex((u) => u.user_id === user.user_id);
        //     rejected.splice(index, 1);
        //     verified.push(updatedUser);
        //     return {
        //       ...prevState,
        //       rejected: rejected,
        //       verified: verified
        //     };
        //   }
        // });
        // newD.splice(index, noOfElementsToBeDeleted)
      } else {
        console.log("error-not accepted");
      }
    });
  };

  const rejectHandler = (user) => {
    rejectDeliveryUser(authCtx.user.location, user.user_id, (isRejected) => {
      if (isRejected) {
        console.log("rejected");
        let updatedUser = {
          ...user,
          userStatus: "",
        };
        setDeliveryUsers((prevState) => {
          let newD = [...prevState.newD];
          let rejected = [...prevState.rejected];
          let index = newD.findIndex((u) => u.user_id === user.user_id);
          newD.splice(index, 1);
          rejected.push(updatedUser);
          return {
            ...prevState,
            newD: newD,
            rejected: rejected,
          };
        });
      } else {
        console.log("error-not rejected");
      }
    });
  };

  const removeHandler = (user) => {
    removeDeliveryUser(authCtx.user.location, user.user_id, (isRejected) => {
      if (isRejected) {
        console.log("removed");

        setDeliveryUsers((prevState) => {
          let rejected = [...prevState.rejected];
          let index = rejected.findIndex((u) => u.user_id === user.user_id);
          rejected.splice(index, 1);
          return {
            ...prevState,
            rejected: rejected,
          };
        });
      } else {
        console.log("error-not removed");
      }
    });
  };

  let ui = null;
  if (deliveryUsers === null) {
    ui = <p>Loading!!!</p>;
  } else if (deliveryUsers.verified.length === 0) {
    ui = <p>No Delivery Persons!!!</p>;
  } else {
    ui = deliveryUsers.verified.map((user, i) => (
      <div className="row details" key={user.user_id}>
        <p className="id">{i + 1}</p>
        <p className="name">{user.user_username}</p>
        <p className="number">{user.user_phone_number}</p>
        <p className="add">{user.user_locality}</p>
        <button
          type="submit"
          className="action"
          onClick={() => rejectHandler(user)}
        >
          Remove
        </button>
      </div>
    ));
  }

  return (
    <>
      <div className="row headnav">
        <div className="toggle">
          <NavLink to="/home/delivery/new" className="newreq row">
            New Request
          </NavLink>
        </div>
        <div className="toggle">
          <NavLink to="/home/delivery/reject" className="newreq row">
            Rejected
          </NavLink>
        </div>
      </div>

      <div className="delivery-person">
        {/* <div className="newreq row">
        <h2 className="col-12">New Request</h2>
        <DeliveryCard />
      </div> */}
        <Switch>
          <Route path="/home/delivery/new">
            <div className="row newreq">
              <DeliveryCard
                users={deliveryUsers.newD}
                acceptHandler={acceptHandler}
                rejectHandler={rejectHandler}
              />
            </div>
          </Route>
          <Route path="/home/delivery/reject">
            <div className="newreq row">
              <DeliveryCard
                users={deliveryUsers.rejected}
                acceptHandler={acceptHandler}
                removeHandler={removeHandler}
                // rejectHandler={rejectHandler}
              />
            </div>
          </Route>
        </Switch>
        <div className="person-list">
          <h2>Delivery Persons List</h2>
          <div className="row head">
            {/* <p className="id">Delivery ID</p> */}
            <p className="id">No.</p>
            <p className="name">Person Name</p>
            <p className="number">Mobile Number</p>
            <p className="add">Address</p>
            <p className="action">Action</p>
          </div>
          {ui}
        </div>
      </div>
    </>
  );
};

export default Delivery;
