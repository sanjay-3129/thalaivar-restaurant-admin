import React from "react";
import { Link } from "react-router-dom";
import Card from "../../reusable/Card/Card";

const Food = () => {
  return (
    <section>
      <div className="row fooditem">
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Add New Item</p>
            <Link
              to="/home/grocery/addnewitem"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/rice1.png" alt="addnew" />
            <p className="title">Rice</p>
            <Link to="/home/grocery/rice" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/harvest.png" alt="addnew" />
            <p className="title">Fruits/Vegetables</p>
            <Link
              to="/home/grocery/fruitsvegs"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        {/* <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/cannedfood.png"
              alt="addnew"
            />
            <p className="title">Canned goods</p>
            <Link
              to="/home/grocery/cannedgoods"
              className="stretched-link"
            ></Link>
          </div>
        </div> */}
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/personalcare.png"
              alt="addnew"
            />
            <p className="title">Soap's</p>
            <Link to="/home/grocery/soaps" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/softdrink.png"
              alt="addnew"
            />
            <p className="title">
              SummerDrinks/
              <br />
              Beverages
            </p>
            <Link
              to="/home/grocery/summer-drinks-beverages"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/personalcare.png"
              alt="addnew"
            />
            <p className="title">Pharmacy</p>
            <Link to="/home/grocery/pharmacy" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/rice1.png" alt="addnew" />
            <p className="title">Organics</p>
            <Link to="/home/grocery/organics" className="stretched-link"></Link>
          </div>
        </div>
        {/* <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/basket.png"
              alt="breakfast"
            />
            <p className="title">Cleaners</p>
            <Link to="/home/grocery/cleaners" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/grocerycart.png"
              alt="lunch"
            />
            <p className="title">Others</p>
            <Link to="/home/grocery/others" className="stretched-link"></Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Food;
