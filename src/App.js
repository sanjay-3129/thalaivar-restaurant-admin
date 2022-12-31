import "./styles.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./ui/404Error";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
// import BulkUpdate from "./components/BulkUpdate";

export default function App() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // console.log("location: ", window.location.pathname);
    if (!authCtx.isLoggedIn) {
      history.replace("/");
    } else {
      history.replace("/home");
    }
  }, [authCtx.isLoggedIn]);

  return (
    <div className="App">
      <Switch>
        {/* <Route path="/bulk" component={BulkUpdate} /> */}
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route path="*" render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}
