import React from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router";
import * as pagenotfound from "../assets/images/64076-404-not-found-page.json";

const PageNotFound = () => {
  const history = useHistory();
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: pagenotfound.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div id="wrapper" onClick={() => history.push("/")}>
      <Lottie options={defaultOptions1} height={500} width={1000} />
      {/* <div id="info">
        <h3>This page could not be found</h3>
      </div> */}
    </div>
  );
};

export default PageNotFound;
