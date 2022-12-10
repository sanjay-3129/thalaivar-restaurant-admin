import "./Snackbar.css";

function snackbar(item, status) {
  var el = document.createElement("div");
  el.className = "snackbar";
  var y = document.getElementById("snackbar-container");
  el.innerHTML = item.Name + " - " + status;
  y.append(el);
  el.className = "snackbar show";
  setTimeout(function () {
    el.className = el.className.replace("snackbar show", "snackbar");
  }, 3000);
}

// function snackbar1(item, status) {
//   var el = document.createElement("div");
//   el.className = "snackbar";
//   var y = document.getElementById("snackbar-container");
//   el.innerHTML = "Some Text1 Message";
//   y.append(el);
//   el.className = "snackbar show";
//   setTimeout(function () {
//     el.className = el.className.replace("snackbar show", "snackbar");
//   }, 3000);
// }

export default snackbar;
