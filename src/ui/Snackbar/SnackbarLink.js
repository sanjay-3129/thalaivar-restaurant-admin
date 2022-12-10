import "./Snackbar.css";

function snackbarLink(item, status) {
  console.log("status", item);
  var el = document.createElement("div");
  el.className = "snackbar";
  var y = document.getElementById("snackbar-container");
  // el.innerHTML = status;
  el.innerHTML = item.orderId + "-" + item.items[0].itemName + " - " + status;
  y.append(el);
  el.className = "snackbar show";
  setTimeout(function () {
    el.className = el.className.replace("snackbar show", "snackbar");
  }, 6000);
}

export default snackbarLink;
