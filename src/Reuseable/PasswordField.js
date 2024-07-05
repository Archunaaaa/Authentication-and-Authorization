import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInputField = ({ name, placeholder, errors, touched }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3 col-md-12">
      <div className="input-group">
        <Field
          type={showPassword ? 'text' : 'password'}
          name={name}
          className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
        <span className="input-group-text toggle-password" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
      <ErrorMessage name={name} component="div" className="text-danger errorring" />
    </div>
  );
};

export default PasswordInputField;