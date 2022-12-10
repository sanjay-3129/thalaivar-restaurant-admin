import React from "react";

const DeliveryCard = (props) => {
  return (
    <div className="col-md-3 delivery-card">
      {props.users.length === 0 ? (
        <p>No Users!!!</p>
      ) : (
        props.users.map((user) => {
          return (
            <div className="card" key={user.user_id}>
              <img
                className="img-fluid"
                src={user.user_image_url}
                alt={user.user_username}
              />
              <p className="name">
                <b>Name:</b>&ensp;{user.user_username}
              </p>
              <p className="no">
                <b>Mobile:</b>&ensp;{user.user_phone_number}
              </p>
              <p className="add">
                <b>Address:</b>&ensp;{user.user_locality}
              </p>
              <div className="footer row">
                <button
                  type="submit"
                  className="acpt"
                  onClick={() => props.acceptHandler(user)}
                >
                  Accept&nbsp;<i className="fas fa-check"></i>
                </button>
                {user.userStatus === "registered" ? (
                  <>
                    <button
                      type="submit"
                      className="rjct"
                      onClick={() => props.rejectHandler(user)}
                    >
                      Reject&nbsp;<i className="fas fa-times"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="rjct"
                      onClick={() => props.removeHandler(user)}
                    >
                      Remove&nbsp;<i className="fas fa-times"></i>
                    </button>
                  </>
                )}
                {/* <button
                  type="submit"
                  className="rjct"
                  onClick={() => props.rejectHandler(user)}
                >
                  Reject&nbsp;<i className="fas fa-times"></i>
                </button> */}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DeliveryCard;
