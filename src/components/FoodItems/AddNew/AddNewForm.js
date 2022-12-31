import React from "react";
import PreviewCard from "./PreviewCard";

const AddNewForm = (props) => {
  let ui = null;
  if (props.price !== null) {
    if (props.price === "quantityPrice") {
      ui = (
        <div className="col-12 optional">
          <p>
            Pick the Quantity
            {/* Pick the Quantity<small>&nbsp;(Optional)</small> */}
          </p>
          <div className="single-row">
            <input
              type="checkbox"
              id="quarter"
              name="quantity"
              value="quarter"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="quarter" className="label">
              Quarter
            </label>
            <label htmlFor="quarterPrice" className="price">
              Actual Price
            </label>
            <input
              type="number"
              id="quarterPrice"
              name="quarterPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.quarterPrice}
            />
            <label htmlFor="cquaterPrice" className="price">
              Current Price
            </label>
            <input
              type="number"
              id="cquarterPrice"
              name="cquarterPrice"
              min="0"
              onChange={props.onChangeHandler}
              value={props.item.cquarterPrice}
            />
          </div>
          <div className="single-row">
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
          </div>
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
            value={props.item.actualPrice}
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

                <div className="inner-row">
                  <label htmlFor="productId">Enter Product Id</label>
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
                  <div className="col-md-4 check">
                    <p>Pick Category</p>
                    <div className="single">
                      <input
                        type="radio"
                        id="BreakFast"
                        value="BreakFast"
                        name="category"
                        onClick={props.onChangeHandler}
                      />
                      <label htmlFor="BreakFast">BreakFast</label>
                    </div>
                    <div className="single">
                      <input
                        type="radio"
                        id="Lunch"
                        value="Lunch"
                        name="category"
                        onClick={props.onChangeHandler}
                      />
                      <label htmlFor="Lunch">Lunch</label>
                    </div>
                    <div className="single">
                      <input
                        type="radio"
                        id="Dinner"
                        value="Dinner"
                        name="category"
                        onClick={props.onChangeHandler}
                      />
                      <label htmlFor="dinner">Dinner</label>
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
                  {/* <div className="col-md-4 style">
                    <p>Pick Style</p>
                    <input
                      type="radio"
                      id="southindian"
                      name="style"
                      value="southindian"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="southindian">South Indian</label>

                    <input
                      type="radio"
                      id="chinese"
                      name="style"
                      value="chinese"
                      onChange={props.onChangeHandler}
                    />
                    <label htmlFor="chinese">Chinese</label>
                  </div> */}
                  <div className="col-md-7">
                    <div className="unit">
                      <label htmlFor="actualUnit">
                        Total Unit:
                        <br />
                        {/* <small>(Optional)</small> */}
                      </label>
                      <input
                        type="number"
                        id="actualUnit"
                        name="actualUnit"
                        min="1"
                        onChange={props.onChangeHandler}
                        value={props.item.actualUnit}
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
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantityPerUnit"
                        min="1"
                        onChange={props.onChangeHandler}
                        value={props.item.quantityPerUnit}
                        required
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
