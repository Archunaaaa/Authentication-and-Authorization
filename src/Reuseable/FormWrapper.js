import React from 'react';

const FormContainer = ({ children }) => (
  <div id="signup-form" className=" mt-5">
    <div className="p-5">
      <h2 className="text-center mb-3">SignUp Form</h2>
      {children}
    </div>
  </div>
);

export default FormContainer;