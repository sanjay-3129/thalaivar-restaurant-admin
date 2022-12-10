import React, { useState } from "react";
import PreviewCard from "./PreviewCard";

const AddNewForm = (props) => {
  // const [priceItem, setPriceItem] = useState([
  //   {
  //     id: 0,
  //     quantity: 0,
  //     units: "",
  //     actualPrice: 0,
  //     currentPrice: 0
  //   }
  // ]);

  const addMoreQuantity = () => {
    let prevState = props.item.priceItem;
    let lastdata = prevState[prevState.length - 1];
    let newId = lastdata.id + 1;
    let data = {
      id: newId,
      quantity: 0,
      units: "",
      actualPrice: 0,
      currentPrice: 0,
    };
    prevState = [...prevState, data];
    // console.log("prevState", prevState);
    props.priceItemChangeHandler(prevState);
  };

  const reduceQuantity = () => {
    let prevState = props.item.priceItem;
    if (prevState.length > 1) {
      prevState.pop();
    }
    // let lastdata = prevState[prevState.length - 1];
    // let newId = lastdata.id + 1;
    // let data = {
    //   id: newId,
    //   quantity: 0,
    //   units: "",
    //   actualPrice: 0,
    //   currentPrice: 0
    // };
    prevState = [...prevState];
    props.priceItemChangeHandler(prevState);
  };

  const onChangeHandler = (e, id) => {
    let name = e.target.name;
    let value = e.target.value;
    let list = [...props.item.priceItem];
    let index = list.findIndex((item) => {
      return item.id === id;
    });
    let data = "";
    if (name === "units") {
      data = {
        ...list[index],
        [name]: value,
      };
    } else {
      data = {
        ...list[index],
        [name]: parseFloat(value),
      };
    }
    list[index] = data;
    // console.log("updated List", list);
    // props.setPriceItem(list);
    props.priceItemChangeHandler(list);
  };

  let ui = null;
  if (props.price !== null) {
    if (props.price === "quantityPrice") {
      ui = (
        <div className="col-12 optional">
          <p>
            Pick the Quantity
            {/* Pick the Quantity<small>&nbsp;(Optional)</small> */}
          </p>
          {props.item.priceItem.map((price) => {
            return (
              <div key={price.id} className="single-row">
                <div className="pic">
                  <input
                    className="pics"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    max="1000"
                    value={price.quantity}
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                  />

                  <select
                    className="amo"
                    name="units"
                    id="units"
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                    value={price.units}
                  >
                    <option value="">--Select--</option>
                    <option value="grams">grams</option>
                    <option value="kilograms">kilograms</option>
                    <option value="millilitres">millilitres</option>
                    <option value="litres">litres</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="actualPrice" className="price">
                    Actual Price&nbsp;
                  </label>
                  <i className="fas fa-rupee"></i>
                  <input
                    type="number"
                    id="actualPrice"
                    name="actualPrice"
                    min="0"
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                    value={price.actualPrice}
                  />
                  <label htmlFor="currentPrice" className="price">
                    Current Price&nbsp;
                  </label>
                  <i className="fas fa-rupee"></i>
                  <input
                    type="number"
                    id="currentPrice"
                    name="currentPrice"
                    min="0"
                    onChange={(e) => {
                      onChangeHandler(e, price.id);
                    }}
                    value={price.currentPrice}
                  />
                </div>
              </div>
            );
          })}

          <button type="button" onClick={addMoreQuantity}>
            <i class="fas fa-plus-circle"></i>
          </button>
          <button type="button" onClick={reduceQuantity}>
            <i class="fas fa-minus-circle"></i>
          </button>
          {/* <div className="single-row">
            <input
              type="checkbox"
              id="half"
              name="quantity"
              value="half"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="half" className="label">
              Half
            </label>
            <label htmlFor="halfPrice" className="price">
              Actual Price
            </label>
            <input
              type="number"
              id="halfPrice"
              name="halfPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.halfPrice}
            />
            <label htmlFor="chalfPrice" className="price">
              Current Price
            </label>
            <input
              type="number"
              id="chalfPrice"
              name="chalfPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.chalfPrice}
            />
          </div>

          <div className="single-row">
            <input
              type="checkbox"
              id="full"
              name="quantity"
              value="full"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="full" className="label">
              Full
            </label>
            <label htmlFor="fullPrice" className="price">
              Actual Price
            </label>
            <input
              type="number"
              id="fullPrice"
              name="fullPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.fullPrice}
            />
            <label htmlFor="cfullPrice" className="price">
              Current Price
            </label>
            <input
              type="number"
              id="cfullPrice"
              name="cfullPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.cfullPrice}
            />
          </div> */}
        </div>
      );
    } else if (props.price === "normalPrice") {
      ui = (
        <div className="col-12 price">
          {/* <p>Actual Price</p>
          <i className="fas fa-rupee"></i>
          <input
            type="number"
            id="actualPrice"
            name="actualPrice"
            style={{ marginRight: "15px" }}
            min="0"
            onChange={props.onChangeHandler}
            value={props.item.priceItem.actualPrice}
          /> */}
          <p>Current Price</p>
          <i className="fas fa-rupee"></i>
          <input
            type="number"
            id="currentPrice"
            name="currentPrice"
            min="0"
            onChange={props.onChangeHandler}
            value={props.item.currentPrice}
          />
        </div>
      );
    }
  }

  return (
    <form onSubmit={props.draftHandler}>
      <div className="row">
        <div className="col-md-8">
          <div className="card-data">
            <div className="row">
              <div className="col-sm-5">
                <div className="inner-row">
                  <label htmlFor="name">Enter Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={props.onChangeHandler}
                    value={props.item.name}
                    required
                    autoComplete="off"
                  />
                </div>

                {/* <div className="inner-row">
                  <label htmlFor="altName">
                    Enter Brand Name<small>&nbsp;(optional)</small>
                  </label>
                  <input
                    type="text"
                    id="altName"
                    name="altName"
                    onChange={props.onChangeHandler}
                    value={props.item.altName}
                    required
                    autoComplete="off"
                  />
                </div> */}
                <div className="inner-row">
                  <label htmlFor="altName">Enter Product Id</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    onChange={props.onChangeHandler}
                    value={props.item.productId}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="inner-row">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    name="desc"
                    onChange={props.onChangeHandler}
                    value={props.item.desc}
                    required
                    autoComplete="off"
                  ></textarea>
                </div>

                <div className="inner-row">
                  <label htmlFor="img">Upload the image</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={props.onChangeHandler}
                    required
                  />
                  <small>
                    The preview of the image can be seen in the card
                  </small>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="row">
                  <div className="col-md-8 check">
                    <p>Pick Category</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="single">
                          <input
                            type="radio"
                            id="Fruits_Vegetables"
                            value="Fruits_Vegetables"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="Fruits_Vegetables">
                            Fruits_Vegetables
                          </label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="Rice"
                            value="Rice"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="Rice">Rice</label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="Summer_Drinks_Beverages"
                            value="Summer_Drinks_Beverages"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="Summer_Drinks_Beverages">
                            Summer_Drinks_Beverages
                          </label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="soaps"
                            value="soaps"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="soaps">Soaps</label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="Pharmacy"
                            value="Pharmacy"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="Pharmacy">Pharmacy</label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="Organics"
                            value="Organics"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="Organics">Organics</label>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="single">
                          <input
                            type="radio"
                            id="personalCare"
                            value="personalCare"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="personalCare">Personal Care</label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="cleaners"
                            value="cleaners"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="cleaners">Cleaners</label>
                        </div>
                        <div className="single">
                          <input
                            type="radio"
                            id="others"
                            value="others"
                            name="category"
                            onChange={props.onChangeHandler}
                          />
                          <label htmlFor="others">Others</label>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="col-md-4 veg">
                    <p>Food Type</p>
                    <input
                      type="radio"
                      id="nonveg"
                      name="foodType"
                      value="non-veg"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="nonveg">Non-Veg</label>

                    <input
                      type="radio"
                      id="veg"
                      name="foodType"
                      value="veg"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="veg">Veg</label>
                  </div> */}
                  <div className="col-md-7">
                    <div className="unit">
                      <label htmlFor="actualUnit">Total Unit:</label>
                      <input
                        type="number"
                        id="actualUnit"
                        name="actualUnit"
                        min="0"
                        onChange={props.onChangeHandler}
                        value={props.item.actualUnit}
                        required
                      />
                    </div>
                    {/* <div className="quantity">
                      <label htmlFor="unit">Enter Minimum Unit:</label>
                      <input
                        type="number"
                        id="unit"
                        name="minimumUnit"
                        min="0"
                        onChange={props.onChangeHandler}
                        value={props.item.minimumUnit}
                        required
                      />
                    </div>
                    <div className="unit">
                      <label htmlFor="quantity">
                        Quantity Per Unit:
                        <br />
                        <small>(Optional)</small>
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantityPerUnit"
                        min="1"
                        onChange={props.onChangeHandler}
                        value={props.item.quantityPerUnit}
                      />
                    </div> */}
                  </div>
                  <div className="col-md-5 others">
                    <div className="single">
                      <input
                        type="checkbox"
                        id="dealOfTheDay"
                        name="dealOfTheDay"
                        onChange={props.onChangeHandler}
                      />
                      <label htmlFor="dealOfTheDay">Deal of the day</label>
                    </div>
                    {/* <div className="single">
                      <input
                        type="checkbox"
                        id="onSale"
                        name="onSale"
                        onChange={props.onChangeHandler}
                      />
                      <label htmlFor="onSale">On Sale</label>
                    </div> */}
                    <div className="single">
                      <input
                        type="checkbox"
                        id="isProductAvailable"
                        name="isProductAvailable"
                        onChange={props.onChangeHandler}
                      />
                      <label htmlFor="isProductAvailable">
                        Product Available
                      </label>
                    </div>
                    <div className="single">
                      <input
                        type="checkbox"
                        id="bestSeller"
                        name="bestSeller"
                        onChange={props.onChangeHandler}
                      />
                      <label htmlFor="bestSeller">Best Seller</label>
                      {/* <label htmlFor="top">Top Product</label> */}
                    </div>
                  </div>
                  <div className="col-4">
                    <input
                      type="radio"
                      id="normalPrice"
                      name="price"
                      value="normalPrice"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="normalPrice">&nbsp;Normal Price</label>
                  </div>
                  {/* <div className="col-6">
                    <input
                      type="radio"
                      id="quantityPrice"
                      name="price"
                      value="quantityPrice"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="quantityPrice">
                      &nbsp;Quantity Based Price
                    </label>
                  </div> */}
                  {/* <div className="col-12 price">
                    <p>Actual Price</p>
                    <i className="fas fa-rupee"></i>
                    <input
                      type="number"
                      id="actualPrice"
                      name="actualPrice"
                      style={{ marginRight: "15px" }}
                      min="0"
                      onChange={props.onChangeHandler}
                      value={props.item.actualPrice}
                    />
                    <p>Current Price</p>
                    <i className="fas fa-rupee"></i>
                    <input
                      type="number"
                      id="currentPrice"
                      name="currentPrice"
                      min="0"
                      onChange={props.onChangeHandler}
                      value={props.item.currentPrice}
                    />
                  </div> */}
                  {ui}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <PreviewCard item={props.item} price={props.price} />
          <div className="button">
            <button type="submit" className="submit-btn">
              Save
            </button>
            <button type="button" className="submit-btn">
              Cancel
            </button>
            <button
              type="reset"
              className="submit-btn"
              onClick={props.clearHandler}
              // onClick={this.form.reset()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewForm;
