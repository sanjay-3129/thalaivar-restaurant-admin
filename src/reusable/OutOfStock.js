import React from "react";

const Alert = () => {
  return (
    <div className="alert">
      <h4>Out of Stock</h4>
      <div className="row horizontal">
        <div className="card">
          <img src="/images/drink.png" className="img-fluid" alt="itemimages" />
          <p className="itemname">Chicken Briyani</p>
        </div>
        <div className="card">
          <img src="/images/drink.png" className="img-fluid" alt="itemimages" />
          <p className="itemname">Chicken Briyani</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
