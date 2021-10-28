import React from "react";
const ModalSmall = () => {
  return (
    <>
      <div
        class="modal fade bd-example-modal-sm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">{res.data.message}</div>
        </div>
      </div>
    </>
  );
};
export default ModalSmall;
