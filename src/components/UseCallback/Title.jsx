import React from "react";

const Title = () => {
  console.log("Rendering title ....");
  return (
    <div>
      <h4>Use Callback hook</h4>
    </div>
  );
};

export default React.memo(Title);
