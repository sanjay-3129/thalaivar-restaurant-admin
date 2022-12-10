import React from "react";
import { Link } from "react-router-dom";
const Food = () => {
  return (
    <section>
      <div className="row fooditem">
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/menu.png" alt="addnew" />
            <p className="title">Add New</p>
            <Link to="/home/fooditems/addnew" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/dish1.png"
              alt="breakfast"
            />
            <p className="title">Breakfast</p>
            <Link
              to="/home/fooditems/breakfast"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/dish.png" alt="lunch" />
            <p className="title">Lunch</p>
            <Link to="/home/fooditems/lunch" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/hot.png" alt="dinner" />
            <p className="title">Dinner</p>
            <Link to="/home/fooditems/dinner" className="stretched-link"></Link>
          </div>
        </div>
        {/* <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/roasted-chicken.png"
              alt="starters"
              width="200px"
            />
            <p className="title">Starters</p>
            <Link
              to="/home/fooditems/starters"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/canapes.png"
              alt="desserts"
            />
            <p className="title">Desserts</p>
            <Link
              to="/home/fooditems/desserts"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/fast-food1.png"
              // src="/loaders/24064-food-squeeze-with-burger-and-hot-dog.gif"
              alt="bigdeal"
            />
            <p className="title">Big Deal Offers</p>
            <Link
              to="/home/fooditems/bigdeal"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/drink.png"
              alt="freshjuice"
            />
            <p className="title">Fresh Juice</p>
            <Link to="/home/fooditems/juice" className="stretched-link"></Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Food;
