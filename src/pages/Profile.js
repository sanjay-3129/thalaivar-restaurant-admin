import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { db, auth, firebase } from "../services/firebase";
import AuthContext from "../context/auth-context";
import snackbar from "../ui/Snackbar/Snackbar";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [newData, setNewData] = useState({
    name: "",
    prfl_img: null,
    mno: ""
  });

  const [password, setPassword] = useState({
    // oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (authCtx.user !== null) {
      let user = authCtx.user;
      setNewData({
        name: user.name,
        prfl_img: null,
        mno: user.phone
      });
    }
  }, [authCtx.user]);

  $(document).ready(function () {
    $("#togglePassword").click(function () {
      var x = document.getElementById("newpass");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      $("#togglePassword").toggleClass("fa-eye-slash");
    });

    $("#togglePassword1").click(function () {
      var x = document.getElementById("pass");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      $("#togglePassword1").toggleClass("fa-eye-slash");
    });
  });

  const getFile1 = () => {
    $("#uploadButton1").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton1").css(
          "background-image",
          'url("' + reader.result + '")'
        );
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
      }
    });
  };

  // onChangeHandler()
  // submitHandler()
  const updateUser = (newData) => {
    // console.log("updating user details", newData);
    let authUser = authCtx.user;
    let name = authUser.name;
    let phone = authUser.phone;
    // only image is updated
    // both udpated
    if (newData.prfl_img !== undefined && newData.prfl_img !== null) {
      // version - 8
      let bucketName = "images";
      let img = newData.prfl_img;
      let storageRef = firebase.storage().ref();
      let timestamp = +new Date().getTime() + "-" + newData.prfl_img.name;
      // console.log("timestamp", timestamp);
      let imgRef = storageRef.child(`${bucketName}/${timestamp}`);
      // let photoUrl = "";
      // delete previous photo from storage, but not the default photo
      imgRef
        .put(img)
        .then((snapshot) => {
          imgRef.getDownloadURL().then((imgUrl) => {
            // photoUrl = imgUrl;
            db.collection("admin")
              .doc(authUser.id)
              .update({
                name: newData.name,
                phone: newData.mno,
                img: imgUrl
              })
              .then(() => {
                if (
                  authUser.img !==
                  "https://www.w3schools.com/howto/img_avatar.png"
                ) {
                  firebase
                    .storage()
                    .refFromURL(authUser.img)
                    .delete()
                    .then(() =>
                      console.log(
                        "image deleted successfullty from firebase storage"
                      )
                    );
                }
                alert("successfully updated");
                // console.log("successfully updated data to db");
                authCtx.setUser({
                  ...authUser,
                  name: newData.name,
                  phone: newData.mno,
                  img: imgUrl
                });

                document.getElementById("img").value = "";
                $("#uploadButton").css("background-image", 'url("")');
              })
              .catch((e) => console.log("getDownloadUrl", e));
          });
        })
        .catch((e) => {
          console.log("img put", e);
        });
    } else {
      // no img
      if (name !== newData.name || phone !== newData.mno) {
        // console.log("name, mno", newData);
        db.collection("admin")
          .doc(authUser.id)
          .update({
            name: newData.name,
            phone: newData.mno
          })
          .then(() => {
            alert("successfully updated");
            console.log("successfully updated data to db");
            authCtx.setUser({
              ...authUser,
              name: newData.name,
              phone: newData.mno
            });
          })
          .catch((e) => console.log(e));
      } else {
        alert("change anything to update!!!");
      }
    }
    // } else {
    //   // User is signed out
    //   // ...
    // }
    // });
  };

  const updatePassword = (password) => {
    // console.log("newPas", password);
    if (password.confirmPassword !== password.newPassword) {
      alert("New Password is not equal to Confirm Password!!!");
    } else {
      auth.onAuthStateChanged((user) => {
        if (user !== null) {
          // console.log("userId", user.uid);
          user
            .updatePassword(password.newPassword)
            .then(() => {
              // let item = {
              //   Name: "Password"
              // };
              // snackbar(item, "updated successfully");
              alert("password updated successfully!!!");
              setPassword({
                newPassword: "",
                confirmPassword: ""
              });
            })
            .catch((e) => {
              if (e.code === "auth/requires-recent-login") {
                alert(
                  "Changing sensitive information, So please try again immediately after login. If password is wrong, try with new password you tried."
                );
              }
              console.log(e);
            });
        }
      });
    }
  };

  const onChangeHandler = (event) => {
    // console.log(event.target.name);
    let value = null;
    if (event.target.name === "prfl_img") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    if (
      event.target.name === "newPassword" ||
      event.target.name === "confirmPassword"
    ) {
      setPassword((prevState) => {
        return {
          ...prevState,
          [event.target.name]: value
        };
      });
    } else {
      setNewData((prevState) => {
        return {
          ...prevState,
          [event.target.name]: value
        };
      });
    }
  };

  return (
    <div className="settings">
      <div className="row form">
        {/* box-shadow bg white */}
        <div className="col-md-5">
          <div class="upload-img">
            <input
              type="file"
              id="img"
              name="prfl_img"
              accept=".gif, .jpg, .png"
              onChange={onChangeHandler}
            />
            <label
              onClick={() => {
                getFile1();
                // setImgView(true);
              }}
              htmlFor="img"
              id="uploadButton1"
              style={
                {
                  // backgroundImage: `url('${props.img}')`
                }
              }
            >
              <span>+</span>
            </label>
          </div>
          {authCtx.user !== null && (
            <>
              <p className="name">{authCtx.user.name}</p>
              <p className="phn">{authCtx.user.phone}</p>
              <p className="email">{authCtx.user.email}</p>
              <p className="branch">{authCtx.user.location}</p>
            </>
          )}
        </div>
        <div className="col-md-7">
          <form className="edit-details">
            <h4 className="title">Account Details</h4>
            <div className="row">
              <div className="col-sm-6">
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  value={newData.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="col-sm-6">
                <label for="phone">Phone:</label>
                <input
                  type="tel"
                  class="form-control"
                  id="mno"
                  name="mno"
                  value={newData.mno}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              value={authCtx.user !== null && authCtx.user.email}
              disabled
            />
            <div className="footer">
              <button
                class="save"
                type="button"
                onClick={() => updateUser(newData)}
              >
                Save
              </button>
              {/* <button class="cancel" type="button">
                Clear
              </button> */}
            </div>
            <br />

            {/* //button */}
            <h4 className="title">Account Security</h4>
            {/* <label for="oldpass">Old Password:</label>
            <input
              type="password"
              class="form-control"
              id="oldpass"
              name="oldPassword"
              value={password.oldPassword}
              onChange={onChangeHandler}
            /> */}
            <div className="row">
              <div className="col-sm-6">
                <label for="newpass">New Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="newpass"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={onChangeHandler}
                />
                <i class="fas fa-eye" id="togglePassword"></i>
              </div>
              <div className="col-sm-6">
                <label for="pass">Confirm Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={onChangeHandler}
                />
                <i
                  class="fas fa-eye"
                  id="togglePassword1"
                  style={{ right: "15px" }}
                ></i>
              </div>
            </div>

            <div className="footer">
              <button
                class="save"
                type="button"
                onClick={() => updatePassword(password)}
              >
                Save
              </button>
              {/* <button class="cancel" type="button">
                Clear
              </button> */}
            </div>
          </form>
        </div>
      </div>
      {/* <div id="snackbar-container"></div> */}
    </div>
  );
};

export default Profile;
