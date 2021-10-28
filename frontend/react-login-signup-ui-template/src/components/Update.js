import React, { useEffect, useState } from "react";
import axios from "axios";

const Update = (props) => {
  const [fname, setFname] = useState(props.fname);
  const [lname, setLname] = useState(props.lname);
  const [email, setEmail] = useState(props.email);
  const [mobile, setMobile] = useState(props.phone);

  return (
    <>
      {/* {console.log(props)} */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={props.email}
                    disabled={true}
                  />
                </div>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={props.fname}
                    required
                    onChange={(event) => {
                      props.setFname(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={props.lname}
                    required
                    onChange={(event) => {
                      props.setLname(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Phone No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No"
                    value={props.phone}
                    required
                    pattern="[6-9]{1}[0-9]{9}"
                    required
                    title="Phone number with 6-9 and remaing 9 digit with 0-9"
                    onChange={(event) => {
                      props.setPhone(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  data-dismiss="modal"
                  onClick={props.updateData}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
