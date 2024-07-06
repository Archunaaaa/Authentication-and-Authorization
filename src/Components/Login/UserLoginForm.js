// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup'; 
// import { loginRequest } from '../../Store/Auth/AuthAction';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './Login.css';

// const UserLoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error, user } = useSelector((state) => state.auth || {}); 
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = (values) => {
//     dispatch(loginRequest(values));
//   };

//   if (user) {
//     if (user.role === 'USER') {
//       navigate('/usertable');
//     } else if (user.role === 'ADMIN') {
//       navigate('/admintable');
//     }
//   }

//   return (
//     <div id="login-form" className="container mt-5">
//       <h2 className="text-center mb-3">Login Form</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-3">
//               <Field
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Email"
//               />
//               <ErrorMessage name="email" component="p" className="text-danger" />
//             </div>
//             <div className="input-group mb-3">
//               <Field
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 className="form-control password-input"
//                 placeholder="Password"
//               />
//               <span className="input-group-text" onClick={togglePasswordVisibility}>
//                 <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//               </span>
//               <ErrorMessage name="password" component="p" className="text-danger" />
//             </div>
//             <button type="submit" className="btn btn-primary fw-bold" disabled={isSubmitting}>
//               Login
//             </button>
//             {error && <p className="text-center mt-3 text-danger">{error}</p>}
//             <p className="text-center mt-3">
//               Don't have an account? <a href="/" className="text-decoration-none">Sign Up</a>
//             </p>
//             <hr />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UserLoginForm;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation schema
import { loginRequest } from '../../Store/Auth/AuthAction';
import './Login.css'; // Import your custom CSS file

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Full name or email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: values => {
      dispatch(loginRequest(values));
    },
  });

  // Redirect if user is logged in
  if (user) {
    if (user.role === 'USER') {
      navigate('/usertable');
    } else if (user.role === 'ADMIN') {
      navigate('/admintable');
    }
  }

  return (
    <div id="login-form" className="container">
      <div className="card carding p-5">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit} className="">
          <div className="mb-3">
            <input
              type="text"
              className="form-control logininput"
              placeholder="Enter email or username"
              id="email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3 password-field">
            <input
              type={formik.values.passwordVisible ? 'text' : 'password'}
              className="form-control logininput"
              placeholder="Enter password"
              id="password"
              {...formik.getFieldProps('password')}
            />
            <span
              className="password-toggle-icon"
              onClick={() => formik.setFieldValue('passwordVisible', !formik.values.passwordVisible)}
            >
              {formik.values.passwordVisible ? '👁️' : '🙈'}
            </span>
          </div>
          <button type="submit" className="btn btn-success loginaccount">
            Login
          </button>
          <p className="text-center mt-3">
            <a href="javascript:void(0)" className="text-decoration-none fw-bold  me-4">
              Forgotten account
            </a>
            <a href="/" className="ms-4 fw-bold">
              Signup
            </a>
          </p>
          <hr />
          {error && <p className="text-danger errorring">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
