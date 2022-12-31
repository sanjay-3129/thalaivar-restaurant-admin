import { useState } from "react";
import { updateProductId } from "../scripts/firebase_bulk_update";

const BulkUpdate = () => {
  const updateItem = () => {
    console.log("Updating...");
    updateProductId();
  };

  return (
    <>
      <p>Bulk Update</p>
      <button onClick={updateItem}>Start</button>
    </>
  );
};

export default BulkUpdate;
