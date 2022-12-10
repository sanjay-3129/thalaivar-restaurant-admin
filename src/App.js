import "./styles.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./ui/404Error";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "./context/auth-context";

export default function App() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      history.replace("/");
    } else {
      history.replace("/home");
    }
  }, [authCtx.isLoggedIn]);

  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route path="*" render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}
