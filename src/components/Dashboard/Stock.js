import React, { useState, useEffect } from "react";
import { getMultiTitleItems } from "../../api/ItemDB";
const Stock = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let titles = ["BreakFast", "Dinner"];
    getMultiTitleItems(titles, props.type, (res) => {
      setItems(res);
    });
  }, []);
  let ui = null;
  if (items.length === 0) {
  } else {
    console.log("items", items);
    ui = items.map((item) => {
      return (
        <div className="card row" key={item.id}>
          <p className="ino">1</p>
          <p className="iname">{item.Name}</p>
          <input type="number" id="increament" value={item.unit} />
          <p className="update">
            <i class="fas fa-check"></i>
          </p>
        </div>
      );
    });
  }
  return (
    <div className="stock">
      <h6>Stock Maintainance</h6>
      <input
        type="search"
        id="search"
        placeholder="search for food / grocery item"
      />
      {/* {getItem !== undefined &&
        getItem.map((item) => (
          <div className="card row">
            <p className="ino">001</p>
            <p className="iname">{item.Name}</p>
            <input type="number" id="increament" />
            <p className="update">
              <i class="fas fa-check"></i>
            </p>
          </div>
        ))} */}

      {ui}
      {/* <div className="card row">
        <p className="ino">001</p>
        <p className="iname">Product Name</p>
        <input type="number" id="increament" min="0" />
        <p className="update">
          <i class="fas fa-check"></i>
        </p>
      </div> */}
    </div>
  );
};

export default Stock;
