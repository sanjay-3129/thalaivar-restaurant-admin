import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

const AuthContext = React.createContext({
  user: {
    id: "",
    name: "",
    location: "",
    role: "",
    email: "",
    img: "",
    phone: ""
  },
  isLoggedIn: false,
  setUser: (user) => {},
  setIsLoggedIn: () => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userId !== null) {
      // auth.onAuthStateChanged((user) => {
      //   if (user !== null) {
      //   }
      // });
      db.collection("admin")
        .doc(userId)
        .get()
        .then((doc) => {
          setUser(doc.data());
          setIsLoggedIn(true);
        })
        .catch((e) => console.log(e));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const setMyUser = (user) => {
    console.log("Setting User", user);
    setUser(user);
  };

  const setLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const logoutHandler = () => {
    console.log("logout");
    // return true;
    // auth
    //   .signOut()
    //   .then(() => {
    //     // Sign-out successful.
    //     console.log("signed out successfully...");
    //     // alert("signed out");
    //     return true;
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error);
    //     return false;
    //   });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setMyUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setLoggedIn,
        logout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
