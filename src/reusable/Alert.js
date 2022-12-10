import React from "react";
import AlertCard from "./Card/AlertCard";

const Alert = () => {
  return (
    <div className="alert">
      <details open>
        <summary>
          <h4>Out of Stock - Food</h4>
        </summary>
        <div className="horizontal">
          <AlertCard />
          <AlertCard />
          <AlertCard />
          <AlertCard />
        </div>
      </details>
    </div>
  );
};

export default Alert;
