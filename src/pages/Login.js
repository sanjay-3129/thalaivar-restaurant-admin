import React, { useContext, useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import AuthContext from "../context/auth-context";
import { auth, db, getToken } from "../services/firebase";
import Input from "../ui/Input";
import style from "./Login.module.css";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [userCred, setUserCred] = useState({
    email: "",
    password: ""
  });
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState(false);
  console.log("Token found", isTokenFound);

  // console.log("navigator", navigator.onLine);
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        setToken(data);
        console.log("Token is", data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);

  const changeHandler = (event) => {
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // firebase signin auth
    auth
      .signInWithEmailAndPassword(userCred.email, userCred.password)
      .then((userCredential) => {
        // setOpen(true);
        // Signed in
        let userId = userCredential.user.uid;
        console.log("userId", userId);
        localStorage.setItem("userId", userId);
        // props.history.replace(`/home?userId=${userId}`);
        db.collection("admin")
          .doc(userId)
          .get()
          .then((doc) => {
            console.log(doc.data());
            let user = doc.data();
            if (user.fcm_token !== token) {
              user = {
                ...user,
                fcm_token: token
              };
              db.collection("admin")
                .doc(userId)
                .update({
                  fcm_token: token
                })
                .then(() => {})
                .catch((e) => console.log(e));
            }
            console.log("user", user);
            authCtx.setUser(user);
            authCtx.setIsLoggedIn(true);
            // sessionStorage.setItem("userId", userId);
          })
          .catch((e) => console.log(e));
        props.history.push("/home");
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/wrong-password") {
          setError("Incorrect password. Try again.");
        } else if (e.code === "auth/network-request-failed") {
          setError("Internet connection is down!!!");
        } else {
          setError("User doesn't exist. Please do register.");
        }
      });
  };

  return (
    <>
      <div className={style.Login}>
        {/* <Snackbar open={open} handleClose={handleClose} /> */}
        <h1>Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            name="email"
            label="Email address"
            id="email"
            placeholder="Enter email"
            text="We'll never share your email with anyone else."
            isText="true"
            onChange={changeHandler}
            value={userCred.email}
          />

          <Input
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            value={userCred.password}
          />

          <Button className={style.Button} variant="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" className={style.Button} variant="primary">
            Clear
          </Button>
          <br />
          <br />
          <br />
          {/* <p style={{ display: "inline" }}>Don't have an account? </p>
          <a className={style.Link} href="/signup">
            Register
          </a> */}
        </form>
      </div>
    </>
  );
};

export default Login;
