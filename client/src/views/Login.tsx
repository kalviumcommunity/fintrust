import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../styles/Login.css'; // Import your CSS file

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.number().required('Phone number is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

interface FormData{
  email: string;
  phoneNumber: number;
  username:string
  password:string
}

export const Login: React.FC = () => {
  const initialValues:FormData = {
    email: '',
    phoneNumber: 0,
    username: '',
    password: '',
  };

  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const onSubmit = (formData: FormData) => {
    console.log(formData); // You can handle the form submission here
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">Login</h1>
          <p className="form-subtitle">Please enter your details to log in.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <Field type="text" name="email" id="email" className="form-input" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <Field type="text" name="phoneNumber" id="phoneNumber" className="form-input" placeholder="Enter your phone number" />
              <ErrorMessage name="phoneNumber" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <Field type="text" name="username" id="username" className="form-input" placeholder="Choose a username" />
              <ErrorMessage name="username" component="div" className="form-error" />
            </div>

            <div className="form-group password-input-container">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                // type={showPassword ? 'text' : 'password'}
                type='text'
                name="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
              />
              {/* <button
                type="button"
                className="show-password-button"
                
              >
                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={showPassword ? faEyeSlash : faEye} />
              </button> */}
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>

            <button type="submit" className="form-button">
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

