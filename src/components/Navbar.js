import React, { useContext, useEffect, useState } from "react";
import Counter from "../ui/Counter";
import Search from "../ui/Search";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";
// import OrdersContext from "../context/orders-context";

const Overlay = (props) => {
  return (
    <div className="content">
      <ul>
        <li className="inner-list">
          <p>Welcome {props.authCtx.user.name} !</p>
        </li>
        {/* <li className="inner-list">
                  <a href="#" className="list-link">
                    <i className="fas fa-cog"></i>Settings
                  </a>
                </li> */}
        <li className="inner-list">
          <div className="list-link" onClick={props.logoutHandler}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

const Navbar = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("authCtx", authCtx.user);
  // }, [authCtx.user]);

  const overlayHandler = () => {
    setIsOverlay((prevState) => {
      // console.log(userDetail, "overlay");
      return !prevState;
    });
  };

  // const [orderData, setOrderData] = useState({
  //   online: 0,
  //   dinein: 0,
  //   ready: 0,
  //   cancelled: 0
  // });

  return (
    <section className="nav-bar">
      {authCtx.user !== null && (
        <div className="navbar">
          <div className="logo">
            <img className="img-fluid" src="/images/logo.jpg" alt="Logo" />
          </div>
          <Counter />
          {/* <Search /> */}
          <ul className="nav-item">
            <li className="list-item">
              <a className="list-link" href="#l">
                <i className="far fa-bell"></i>
              </a>
            </li>
            <li className="list-item">
              <button
                type="button"
                onClick={overlayHandler}
                className="btn collapsible"
              >
                <div className="flex">
                  <img
                    className="img-fluid"
                    src={authCtx.user.img}
                    alt="profilepic"
                  />
                  <p className="aname">
                    {authCtx.user.name}
                    <i className="fas fa-angle-down"></i>
                  </p>
                </div>
              </button>
              {isOverlay && (
                <Overlay
                  authCtx={authCtx}
                  logoutHandler={props.logoutHandler}
                />
              )}
            </li>
            <li className="list-item">
              <Link
                to="/home/profile"
                activeClassName="active"
                className="list-link"
              >
                <i className="fas fa-cog"></i>
              </Link>
            </li>
            {/* <li className="list-item">
              <a className="list-link" href="#l">
                <i className="fas fa-cog"></i>
              </a>
            </li> */}
          </ul>
        </div>
      )}

      {/* <!-- Header Ends --> */}
    </section>
  );
};

export default Navbar;
