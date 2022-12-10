// import styled from "styled-components";

const Backdrop = (props) => {
  // const BackDrop = styled.div`
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100vh;
  //   z-index: 1000;
  //   background: rgba(0, 0, 0, 0.75);
  // `;

  return (
    <div
      onClick={props.onClose}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        zIndex: "1000",
        background: "rgba(0, 0, 0, 0.75)"
      }}
    />
  );
};

export default Backdrop;
// import styled from "styled-components";

// const Backdrop = (props) => {
//   const BackDrop = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100vh;
//     z-index: 1000;
//     background: rgba(0, 0, 0, 0.75);
//   `;

//   return <BackDrop onClick={props.onClose} />;
// };

// export default Backdrop;
