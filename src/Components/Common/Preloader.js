import React from "react";

const Preloader = () => {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <h2 class="sr-only"> Loading ... </h2>
      </div>
    </div>
  );
};
export default Preloader;
