// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { signupRequest, signupFailure } from '../../Store/Auth/AuthAction';
// import { ReusableInput } from '../../Reuseable/InputField'; // Correct import statement
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './Register.css';

// const UserRegisterForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { message, error } = useSelector((state) => state.auth || {});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const initialValues = {
//     userName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobileNo: '',
//     userRole: '',
//   };

//   const validationSchema = Yup.object({
//     userName: Yup.string().required('Username is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm password is required'),
//     mobileNo: Yup.string()
//       .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
//       .required('Mobile number is required'),
//     userRole: Yup.string().required('Role is required'),
//   });

//    const handleSignupSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       await dispatch(signupRequest(values));
//     } catch (errors) {
//       dispatch(signupFailure(errors.message || 'Signup failed'));
//     }
//     // setErrors(errors);
//     console.log(values)
//     setSubmitting(false);
//     console.log(setSubmitting)
//   };

//   useEffect(() => {
//     if (message === 'User registered successfully!') {
//       navigate('/login');
//     }
//   }, [message, navigate]);

//   return (
//     <div id="signup-form" className="containers top">
//       <h2 className="text-center mb-3">SignUp Form</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSignupSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-3 form-group">
//               <ReusableInput
//                 type="text"
//                 name="userName"
//                 placeholder="Username"
//               />
//             </div>
//             <div className="mb-3 form-group">
//               <ReusableInput
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//               />
//             </div>
//             <div className="mb-3 form-group">
//               <ReusableInput
//                 type="text"
//                 name="mobileNo"
//                 placeholder="Mobile Number"
//               />
//             </div>
//             <div className="input-group mb-3 form-group">
//               <ReusableInput
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Create password"
//                 icon={showPassword ? faEye : faEyeSlash}
//                 onIconClick={togglePasswordVisibility}
//               />
//             </div>
//             <div className="input-group mb-3 form-group">
//               <ReusableInput
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 placeholder="Confirm password"
//                 icon={showConfirmPassword ? faEye : faEyeSlash}
//                 onIconClick={toggleConfirmPasswordVisibility}
//               />
//             </div>
//             <div className="mb-3 form-group">
//               <Field as="select" name="userRole" className="form-control">
//                 <option value="">Select Role</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </Field>
//               <ErrorMessage name="userRole" component="p" className="text-danger" />
//             </div>
//             <button type="submit" className="btn btn-primary fw-bold" disabled={isSubmitting}>
//               Create Account
//             </button>
//             {error && <p className="text-center mt-3 text-danger">{error.message}</p>}
//             <p className="text-center mt-3">
//               Clicking <strong>Create Account</strong> means that you agree to
//               our <a href="#" className="text-decoration">terms of service</a>.
//               <a className="m-5 text-decoration" href="/login">Existing User? Login</a>
//             </p>
//             <hr />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UserRegisterForm;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signupRequest, signupFailure } from '../../Store/Auth/AuthAction';
import { ReusableInput, RoleSelector } from '../../Reuseable/InputField';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state);
  const { errors } = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    userRole: '',
    
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    mobileNo: Yup.string().required('Mobile number is required'),
    userRole: Yup.string().required('Role is required'),
  
  });

  const handleSignupSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signupRequest(values));
    } catch (errors) {
      dispatch(signupFailure(errors.message || 'Signup failed'));
    }
    setErrors(errors);
    setSubmitting(false);
  };

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div id="signup-form" className="container mt-4">
      {message && <p>{message}</p>}
      <div className="p-5">
        <h2 className="text-center mb-1">SignUp </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
              <div className="row">
                <div className="col-md-6">
                  <ReusableInput
                    type="text"
                    name="userName"
                    placeholder="Enter your full name"
                 
                    error={errors.userName}
                    touched={touched.userName}
                  />
                </div>
                <div className="col-md-6">
                  <ReusableInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  
                    error={errors.email}
                    touched={touched.email}
                  />
                </div>
              </div>
           
                <div className="col-md-12">
                  <ReusableInput
                    type="password"
                    name="password"
                    placeholder="Create password"
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>
                <div className="col-md-12">
                  <ReusableInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    showPassword={showConfirmPassword}
                    togglePasswordVisibility={toggleConfirmPasswordVisibility}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                </div>
          
              {/* <div className="row"> */}
                <div className="col-md-12">
                  <ReusableInput
                    type="tel"
                    name="mobileNo"
                    placeholder="Enter your mobile number"
                    error={errors.mobileNo}
                    touched={touched.mobileNo}
                  />
                </div>
                <div className="col-md-12">
                  <RoleSelector
                    name="userRole"
                    error={errors.userRole}
                    touched={touched.userRole}
                  />
                </div>
                {/* <div className="col-md-12 ">
                  <GenderSelector
                    name="gender"
                    error={errors.gender}
                    touched={touched.gender}
                  />
                </div> */}
              {/* </div> */}
              <button type="submit" className="btn btn-success w-100 mt-3">
                Create Account
              </button>
              <div className='mt-2'>
                <p className="text-center ">
                  Clicking <strong>Create Account</strong> means that you agree to our <a href="#">terms of service</a>.
                  <br/>
                  <a href="/login" className="ms-4 fw-bold">Already have an Account? Login</a>
                </p>
              </div>
                <hr />
                </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;