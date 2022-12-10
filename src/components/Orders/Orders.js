import React, { useContext, useEffect, useState } from "react";
import { getMonthOrders, getOrders, getYearOrders } from "../../api/OrderDB";
import LineChart from "../../ui/Charts/LineChart";
import PieChart from "../../ui/Charts/PieChart";
import Tables from "../../ui/Tables/Tables";
import AuthContext from "../../context/auth-context";
import { ExportToExcel } from "../../helpers/ExportToExcel";

const Orders = () => {
  const authCtx = useContext(AuthContext);
  const [filter, setFilter] = useState({
    type: "",
    value: "",
    itemType: "food",
  });
  const [orders, setOrders] = useState(null);
  const [stat, setStat] = useState(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (authCtx.user !== null) {
      let date = new Date();
      setFilter({
        type: "day",
        value: date.toISOString().split("T")[0],
      });
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = date.getFullYear();
      date = day + "." + month + "." + year;
      // document.getElementById("date").valueAsDate = date;
      getOrders(date, "food", authCtx.user.location, (orders, stat) => {
        setShowTable(true);
        setOrders(orders);
        setStat(stat);
      });
    }
  }, [authCtx.user]);

  const onChangeHandler = (e) => {
    // console.log("value", e.target.value);
    if (e.target.name === "filter") {
      setFilter((prevState) => {
        return {
          ...prevState,
          type: e.target.value,
        };
      });
    } else if (e.target.name === "itemType") {
      setFilter((prevState) => {
        return {
          ...prevState,
          itemType: e.target.value,
        };
      });
    } else {
      setFilter((prevState) => {
        return {
          ...prevState,
          value: e.target.value,
        };
      });
    }
  };

  const onCheckHandler = () => {
    console.log("check", filter);
    let type = filter.itemType;
    let location = authCtx.user.location;
    let emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (filter.type === "month") {
      getMonthOrders(type, location, filter, (orders, stat) => {
        // console.log("orders-stat-month", orders, stat);
        setShowTable(false);
        setOrders(orders);
        setStat(stat);
      });
    } else if (filter.type === "year") {
      getYearOrders(type, location, filter, (orders, stat) => {
        // console.log("orders-stat-year", orders, stat);
        setShowTable(false);
        setOrders(orders);
        if (stat === undefined) {
          setStat(emptyData);
        } else {
          setStat(stat);
        }
      });
    } else if (filter.type === "day") {
      let date = filter.value.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2];
      date = day + "." + month + "." + year;
      // console.log(date);
      // console.log("date", date);
      getOrders(date, type, authCtx.user.location, (orders, stat) => {
        setShowTable(true);
        setOrders(orders);
        setStat(stat);
      });
    }
  };

  // const generateExcel = () => {};

  let ui = null;
  if (filter.type === "year") {
    ui = (
      <input
        type="number"
        min="2018"
        max=""
        id="year"
        name="year"
        onChange={onChangeHandler}
        value={filter.value}
        autoComplete="off"
      />
    );
  } else if (filter.type === "month") {
    ui = (
      <input
        type="month"
        id="month"
        name="month"
        onChange={onChangeHandler}
        value={filter.value}
      />
    );
  } else {
    ui = (
      <input
        type="date"
        id="date"
        name="date"
        onChange={onChangeHandler}
        value={filter.value}
      />
    );
  }

  return (
    <>
      <div className="row stats">
        <div className="col-6 line">
          {stat !== null && (
            <LineChart labelName="test" filter={filter} stat={stat} />
          )}
        </div>
        <div className="col-4 pie">
          {stat !== null && <PieChart filter={filter} stat={stat} />}
        </div>
        <div className="col-2 calender">
          <div className="dropdown">
            <select
              name="itemType"
              onChange={onChangeHandler}
              value={filter.itemType}
            >
              <option value="food">Food</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <form>
            <input
              type="radio"
              name="filter"
              id="day"
              value="day"
              checked={filter.type === "day" ? true : false}
              onChange={onChangeHandler}
            />
            <label htmlFor="day">Day</label>
            <br />
            <input
              type="radio"
              name="filter"
              id="month"
              value="month"
              checked={filter.type === "month" ? true : false}
              onChange={onChangeHandler}
            />
            <label htmlFor="month">Month</label>
            <br />
            <input
              type="radio"
              name="filter"
              id="year"
              value="year"
              checked={filter.type === "year" ? true : false}
              onChange={onChangeHandler}
            />
            <label htmlFor="year">Year</label>
            <br />
            {ui}
            <br />
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCheckHandler}
            >
              Check
            </button>
            {/* <button type="button" className="btn btn-primary">
              Clear
            </button> */}
          </form>
        </div>
        <div className="col-12 export">
          {showTable ? (
            orders !== null && (
              <>
                {orders.length === 0 || orders === "empty" ? (
                  <h1>No Orders To Export</h1>
                ) : (
                  <div className="export-">
                    <ExportToExcel apiData={orders} fileName={filter.value} />
                    <Tables orders={orders} />
                  </div>
                )}
                {/* <ExportToExcel apiData={orders} fileName={filter.value} /> */}
              </>
            )
          ) : (
            <div>
              {/* <button
                className="btn btn-primary"
                type="button"
                onClick={generateExcel}
              >
                Generate Excel : {filter.value}
              </button> */}
              {orders !== null &&
              (orders.length === 0 || orders === "empty") ? (
                <h1>No Orders To Export</h1>
              ) : (
                <ExportToExcel apiData={orders} fileName={filter.value} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;

// useEffect(() => {
// $("#yearPicker").datetimepicker({
//   format: "YYYY",
//   viewMode: "years"
// });
// $(".date-picker-year").datepicker({
//   changeYear: true,
//   showButtonPanel: true,
//   dateFormat: "yy",
//   onClose: function (dateText, inst) {
//     var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//     $(this).datepicker("setDate", new Date(year, 1));
//   }
// });
// $(".date-picker-year").focus(function () {
//   $(".ui-datepicker-month").hide();
// });
// }, []);
