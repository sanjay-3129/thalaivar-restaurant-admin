import React, { useEffect, useState } from "react";

const StockMaintainance = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const onChangeHandler = (e, id) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "add") {
      setItems((prevState) => {
        let list = [...prevState];
        let index = list.findIndex((v) => v.id === id);
        let newVal = list[index][props.location].unit + 1;
        let item = list[index];
        let updatedData = {
          ...item,
          [props.location]: {
            ...item[props.location],
            unit: newVal
          }
        };
        list[index] = updatedData;
        // console.log("newVal", newVal);
        return list;
      });
    } else if (name === "remove") {
      setItems((prevState) => {
        let list = [...prevState];
        let index = list.findIndex((v) => v.id === id);
        let newVal = list[index][props.location].unit - 1;
        let item = list[index];
        let updatedData = {
          ...item,
          [props.location]: {
            ...item[props.location],
            unit: newVal
          }
        };
        list[index] = updatedData;
        // console.log("newVal", newVal);
        return list;
      });
    } else {
      setItems((prevState) => {
        let list = [...prevState];
        let index = list.findIndex((v) => v.id === id);
        let item = list[index];
        let updatedData = {
          ...item,
          [props.location]: {
            ...item[props.location],
            unit: value
          }
        };
        list[index] = updatedData;
        return list;
      });
    }
  };

  const checkHandler = (item) => {
    // console.log("check", id, unit);
    if (item.unit < 0) {
      alert("Unit should not be less than 0!!!");
    } else {
      props.checkHandler(item);
    }
  };

  return (
    <div className="stock-maintain">
      <details>
        <summary>
          <h4>
            Out of Stock - {props.type}
            <span>{items.length}</span>
          </h4>
        </summary>
        <div className="stock">
          {items.map((item, i) => {
            return (
              <div className="card row" key={item.id}>
                <p className="ino">{i + 1}</p>
                <p className="iname">{item.Name}</p>
                <div className="quantity row">
                  <input
                    type="button"
                    className="minus"
                    value="-"
                    name="remove"
                    onClick={(e) => onChangeHandler(e, item.id)}
                  />
                  <input
                    type="number"
                    id="increament"
                    min="0"
                    // value={item[props.location].unit}
                    onChange={(e) => onChangeHandler(e, item.id)}
                  />
                  <input
                    type="button"
                    className="plus"
                    value="+"
                    name="add"
                    onClick={(e) => onChangeHandler(e, item.id)}
                  />
                </div>
                <p className="update">
                  <i
                    class="fas fa-check"
                    onClick={() => checkHandler(item)}
                  ></i>
                  <i
                    class="fa fa-times"
                    onClick={() => props.removeHandler(item.id)}
                  ></i>
                </p>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
};

export default StockMaintainance;
