import React, { useContext } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Food from "./FoodItems/Food";
import Orders from "./Orders/Orders";
import Grocery from "./Grocery/Grocery";
import AddNew from "./FoodItems/AddNew/AddNew";
import AddNewItem from "./Grocery/AddNewItem/AddNewItem";
// import FoodItem from "./FoodItems/FoodItem";
import Items from "../reusable/Items/Items";
import Profile from "../pages/Profile";
import Delivery from "../pages/Delivery";

import AuthContext from "../context/auth-context";

const Sidebar = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <section>
      {/* <!-- main content --> */}
      <div className="container-fluid pt">
        <div className="flex-wrapper">
          <div className="sidebar">
            <ul className="sidebar-list">
              <li className="list-item">
                <NavLink
                  to="/home/dashboard/allorder"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i className="fas fa-tachometer-alt"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/dashboard.png"
                    alt="dashboard"
                  />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              {/* <li className="list-item">
                <NavLink
                  to="/home/profile"
                  activeClassName="active"
                  className="list-link"
                >
                  
                  <img
                    className="img-fluid"
                    src="/images/user.png"
                    alt="profile"
                  />
                  <span>Profile</span>
                </NavLink>
              </li> */}
              <li className="list-item">
                <NavLink
                  to="/home/fooditems"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i class="fas fa-utensils"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/cutlery.png"
                    alt="fooditem"
                  />
                  <span>Food Items</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/grocery"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/groceries.png"
                    alt="grocery"
                  />
                  <span>Grocery</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/orders"
                  activeClassName="active"
                  className="list-link"
                >
                  <img
                    className="img-fluid"
                    src="/images/order.png"
                    alt="fooditem"
                  />
                  <span>Orders</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/delivery"
                  activeClassName="active"
                  className="list-link"
                >
                  <img
                    className="img-fluid"
                    src="https://cdn-icons-png.flaticon.com/512/2830/2830312.png"
                    alt="fooditem"
                  />
                  <span>Delivery</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/profile"
                  activeClassName="active"
                  className="list-link"
                >
                  <img
                    className="img-fluid"
                    // src="/images/profile.png"
                    src={authCtx.user !== null && authCtx.user.img}
                    alt="fooditem"
                  />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li className="list-item">
                <div className="list-link" onClick={props.logoutHandler}>
                  <img
                    className="img-fluid"
                    src="/images/exit.png"
                    alt="fooditem"
                  />
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="rt">
            <Switch>
              {/* Food */}
              <Route path="/home/fooditems/addnew">
                <AddNew type="Food" />
              </Route>
              <Route path="/home/fooditems/breakfast">
                {/* <BreakFast /> */}
                {/* <FoodItem title="BreakFast" type="food" /> */}
                <Items title="BreakFast" type="Food" authCtx={authCtx} />
              </Route>
              <Route path="/home/fooditems/lunch">
                <Items title="Lunch" type="Food" authCtx={authCtx} />
              </Route>
              <Route path="/home/fooditems/dinner">
                <Items title="Dinner" type="Food" authCtx={authCtx} />
              </Route>
              {/* <Route path="/home/fooditems/starters">
                <Items title="Starters" type="food" authCtx={authCtx} />  
              </Route>
              <Route path="/home/fooditems/desserts">
                <Items title="Desserts" type="food" authCtx={authCtx} />
              </Route>
              <Route path="/home/fooditems/bigdeal">
                <Items title="BigDeal" type="food" authCtx={authCtx} />
              </Route>
              <Route path="/home/fooditems/juice">
                <Items title="Juice" type="food" authCtx={authCtx} />
              </Route> */}
              <Route path="/home/fooditems">
                <Food />
              </Route>

              {/* Food Orders */}
              <Route path="/home/orders">
                <Orders />
              </Route>

              {/* Grocery */}
              <Route path="/home/grocery/rice">
                <Items title="Rice" type="Grocery" authCtx={authCtx} />
              </Route>
              <Route path="/home/grocery/fruitsvegs">
                <Items
                  title="Fruits_Vegetables"
                  type="Grocery"
                  authCtx={authCtx}
                />
              </Route>
              {/* <Route path="/home/grocery/cannedgoods">
                <Items title="CannedGoods" type="grocery" authCtx={authCtx} />
              </Route> */}
              <Route path="/home/grocery/summer-drinks-beverages">
                <Items
                  title="Summer_Drinks_Beverages"
                  type="Grocery"
                  authCtx={authCtx}
                />
              </Route>
              <Route path="/home/grocery/soaps">
                <Items title="soaps" type="Grocery" authCtx={authCtx} />
              </Route>
              <Route path="/home/grocery/pharmacy">
                <Items title="Pharmacy" type="Grocery" authCtx={authCtx} />
              </Route>
              <Route path="/home/grocery/organics">
                <Items title="Organics" type="Grocery" authCtx={authCtx} />
              </Route>
              {/* <Route path="/home/grocery/cleaners">
                <Items title="Cleaners" type="grocery" authCtx={authCtx} />
              </Route>
              <Route path="/home/grocery/others">
                <Items title="Others" type="grocery" authCtx={authCtx} />
              </Route> */}
              <Route path="/home/grocery/addnewitem">
                <AddNewItem type="Grocery" />
              </Route>
              <Route path="/home/grocery">
                <Grocery />
              </Route>

              {/* Delivery */}
              <Route path="/home/delivery">
                <Delivery />
              </Route>

              {/* Profile */}
              <Route path="/home/profile">
                <Profile />
              </Route>

              {/* Dashboard */}
              <Route path="/home/dashboard/manual">
                <Dashboard />
              </Route>
              <Route path="/home/dashboard/delivered">
                <Dashboard type="food" />
              </Route>
              <Route path="/home/dashboard/ondeliver">
                <Dashboard type="food" />
              </Route>
              <Route path="/home/dashboard/preparing">
                <Dashboard type="food" />
              </Route>
              <Route path="/home/dashboard/neworder">
                <Dashboard type="food" />
              </Route>
              <Route path="/home/dashboard/allorder">
                <Dashboard type="food" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
