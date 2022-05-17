import React, { useState } from "react";

const UpdatePassword = () => {
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [validationerror, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
  };
  const validateMethod = () => {
    const error = {};

    if (resetPassword.password === "") {
      error.password = "Password is missing";
    }

    if (resetPassword.confirmPassword === "") {
      error.confirmPassword = "confirm Password is missing";
    }



    return Object.keys(error).length === 0 ? null : error;
  };
  const resetpassword = () => {
    let error = {};
    error = validateMethod();
    setValidationError({
      error: error || null,
    });

    if (error) return;
    console.log("noerror");
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={resetPassword.password}
            onChange={(e) => handleChange(e)}
          />
          <span className="text-danger">{validationerror.error?.password}</span>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={resetPassword.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <span className="text-danger">
            {validationerror.error?.confirmPassword}
          </span>
        </div>
        <div>
          <button
            type="button"
            onClick={resetpassword}
            className="btn round-btn-01 btn-success"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdatePassword;
