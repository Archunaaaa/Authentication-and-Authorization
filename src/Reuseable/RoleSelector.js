import React from 'react';
import { Field, ErrorMessage } from 'formik';

const RoleSelector = ({ name, error, touched }) => (
  <div className="mb-3 col-md-6">
    <Field
      as="select"
      name={name}
      className={`form-select ${error && touched ? 'is-invalid' : ''}`}
    >
      <option value="">Select role</option>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </Field>
    <ErrorMessage name={name} component="div" className="text-danger errorring" />
  </div>
);

export default RoleSelector;