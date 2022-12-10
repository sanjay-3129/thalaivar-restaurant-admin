import React, { useEffect, useState } from "react";
import "./card.css";

const Card = (props) => {
  useEffect(() => {
    let item = props.item;
    let branch = item.branch[props.location];
    console.log("item", item, branch, props.location);
  }, []);
  let ui = null;
  // console.log(
  //   "item-undefined",
  //   props.item[props.location]["price"]["currentPrice"]
  // );
  if (props.item.branch[props.location]["current_price"] !== undefined) {
    ui = props.item.branch[props.location]["current_price"];
  }

  return (
    <>
      <div class="col-lg-3 col-md-4 col-sm-3">
        <div class="card">
          <div class="overlay">{props.item.Type}</div>
          <img src={props.item.image} alt={props.item.Name} />
          <div class="card-body">
            <h3 class="card-title">
              {props.item.Name}
              {/* {props.item.Name}<span>({props.item.Name})</span> */}
            </h3>
            <div
              class="edit-option"
              style={{ cursor: "pointer" }}
              onClick={() => props.updateItem(props.item)}
            >
              <i class="fa fa-pencil-square-o"></i>
            </div>
            {/* <div
              class="trash-option"
              style={{ cursor: "pointer" }}
              onClick={() => props.deleteItem(props.item)}
            >
              <i class="fa fa-trash"></i>
            </div> */}
            <p>Desc: {props.item.description}</p>
            <p>
              Style:&ensp;
              <b style={{ fontSize: "18px", textTransform: "uppercase" }}>
                {props.item.style}
              </b>
            </p>
            <p class="time" style={{ textTransform: "capitalize" }}>
              {/* {props.item.category} */}
              {props.item.Type}
            </p>
            {/* <p class="time">Dinner</p> */}
            <div class="row quantity">
              {/* <p class="quantity">Qty Per Unit:&ensp;</p>
              <b>{props.item[props.location]["quantityPerUnit"]}</b>&ensp;&emsp; */}
              <p class="quantity">Min Unit:&ensp;</p>
              <b>{props.item.branch[props.location]["unit"]}</b>
            </div>
            {/* <form></form> */}

            <hr />
            {/* <p class="food-rating">
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
            </p> */}

            <p class="price ">
              <i class=" fa fa-inr" aria-hidden="true"></i>
              {/* {props.item[props.location]["price"]["currentPrice"] === -1
                ? props.item[props.location]["price"]["cquarterPrice"] !== -1
                : props.item[props.location]["price"]["currentPrice"]} */}
              {ui}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
