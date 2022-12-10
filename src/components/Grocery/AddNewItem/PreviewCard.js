const PreviewCard = (props) => {
  return (
    <div className="card">
      {/* <div className="overlay">v</div> */}
      <div className="overlay">
        {props.item.foodType === "" ? null : props.item.foodType}
      </div>
      <div className="preview">preview</div>
      <img
        className={
          props.item.img !== undefined && props.item.img.url !== ""
            ? ""
            : "card-img"
        }
        id="cardImg"
        src={
          props.item.img !== undefined && props.item.img.url === ""
            ? "/images/tray.png"
            : props.item.img.url
        }
        alt="item name"
      />
      {/* <img
        className="card-img"
        id="cardImg"
        src="/images/tray.png"
        alt="item name"
      /> */}
      <div className="card-body">
        <p className="item-name">
          {props.item.name === "" ? "Item Name" : props.item.name}&nbsp;
          <span>
            ({props.item.altName === "" ? "alternative" : props.item.altName})
          </span>
        </p>
        <p className="item-desc">
          &ensp;
          {props.item.desc === ""
            ? "Contains a small description of the item"
            : props.item.desc}
        </p>
        <p className="pills" style={{ textTransform: "capitalize" }}>
          {props.item.category === "" ? null : props.item.category}
        </p>
        {/* <p className="pills" style={{ textTransform: "capitalize" }}>
          {props.item.foodType === "" ? null : props.item.foodType}
        </p> */}
        {/* <p className="item-style">
          Style:&nbsp;
          <b style={{ textTransform: "uppercase" }}>
            {props.item.style === "" ? "" : props.item.style}
          </b>
        </p> */}
        <p className="item-quantity">
          Quantity:&nbsp;
          <b>{props.item.minimumUnit}</b>
        </p>
      </div>
      <div className="card-footer">
        {/* <p className="ratings">
          <span className="fas fa-star"></span>
          <span className="fas fa-star"></span>
          <span className="fas fa-star"></span>
          <span className="fas fa-star"></span>
          <span className="fas fa-star"></span>
        </p> */}
        <p className="price">
          <i className="fas fa-rupee"></i>&nbsp;
          {props.price === "normalPrice"
            ? props.item.currentPrice
            : props.item.cfullPrice}
        </p>
        <p>
          Discount Percentage:{" "}
          {props.price === "normalPrice"
            ? 100 -
              (props.item.currentPrice / props.item.actualPrice) * 100 +
              "%"
            : 100 - (props.item.cfullPrice / props.item.fullPrice) * 100 + "%"}
        </p>
      </div>
    </div>
  );
};

export default PreviewCard;
