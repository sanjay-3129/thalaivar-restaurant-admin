import React, { useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import IdleTimeoutModal from "../ui/IdleTimeoutModal";
import IdleTimerContainer from "../helpers/IdleTimerContainer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router";
import ReactNotifications from "react-notifications-component";
// import AuthContext from "../context/auth-context";

function Home(props) {
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isTimedout, setIsTimedout] = useState(false);
  const history = useHistory();

  useEffect(() => {
    history.push("/home/dashboard/allorder");
  }, []);

  const handleClose = () => {
    setShowTimeoutModal(false);
    setIsTimedout(false);
  };

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out successfully...");
        // alert("signed out");
        localStorage.removeItem("userId");
        props.history.replace("/");
      })
      .catch((error) => {
        // An error happened.
        alert("Some Error To Logout!!!");
        console.log(error);
      });
  };

  const timeoutModalHandler = () => {
    setShowTimeoutModal(true);
  };
  return (
    <div className="App">
      <ReactNotifications />
      <IdleTimeoutModal
        showModal={showTimeoutModal}
        handleClose={handleClose}
        handleLogout={logoutHandler}
      />
      <IdleTimerContainer
        handleLogout={logoutHandler}
        timeout={isTimedout}
        timeoutModal={timeoutModalHandler}
        timedoutHandler={(bool) => {
          setIsTimedout(bool);
        }}
      />
      <Navbar logoutHandler={logoutHandler} />
      <Sidebar logoutHandler={logoutHandler} />
    </div>
  );
}
export default Home;
