import React from "react";
import Spinner from "../svg/spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
      <p>Loading</p>
    </div>
  );
};

export default Loading;
