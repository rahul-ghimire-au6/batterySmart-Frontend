import React, {Fragment } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Input1 from "./components/input";
import login_img from "./assests/img/register.jpg";
import "./assests/css/register.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// let regx159 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function Register(props) {
  const history = useHistory()

  const handleSubmit = async (values) => {
    console.log(values)

      let data = {
        name:values.name,
        email:values.email,
        password:values.password,
      };
      const url = "http://localhost:8080/user/register";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status==='success') {
            //here is the animation
            Toast.fire({
              icon: "success",
              title: "Congratulations Account Created Successfully",
            }).then(()=>{
              history.push('/login')
            });
            //end
          }
          else{
            Toast.fire({
              icon: "error",
              title: data.message
            })
          }
        })
        .catch((err) => console.log(err));
    
  };

    const validate = Yup.object({
    name: Yup.string()
      .min(5, 'Minimum 5 characters required')
      .required('Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      `Min 8 letters, 1 uppercase, 1 number \n and 1 special case character`
    ).required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })

  return <Fragment>
            <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "4em",
          }}
        >
          <center>
            <div className="register_container">
              <div>
                <img src={login_img} alt="login" className="register_img" />
              </div>
              <div>
                <div style={{ marginLeft: "18em", marginTop: "1em" }}>
                  <div>
                    <h1>Registration</h1>
                    <br />
                  </div>
                </div>
                {/* logo */}
                <div className="mini_logo_container">
                  <div className="facebook_logo">
                    <img
                      src="https://img.icons8.com/material-two-tone/30/000000/facebook-f--v2.png"
                      alt="facebook"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="google_logo">
                    <img
                      src="https://img.icons8.com/material-rounded/30/000000/google-logo.png"
                      alt="google"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="linkedin_logo">
                    <img
                      src="https://img.icons8.com/windows/30/000000/linkedin-2.png"
                      alt="linkedin"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                </div>
                {/* end */}
                <div style={{ marginLeft: "17.7em", marginTop: "1em" }}>
                  <p style={{ fontWeight: "500", marginBottom: "0em" }}>
                    or use your email for registration
                  </p>
                </div>
                <Formik      
                initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: ''}}
                validationSchema={validate}
                onSubmit={values => {
                  handleSubmit(values)
                }}>
                  {formik => (
                    <Form className="form1" style={{ marginLeft: "17.5em" }} >
                    <div className='maroon5'>
                    <Input1 name="name" type="text" placeholder="Name" className="name_register" idvalue='error'/></div>
                    <div className='maroon5'>
                    <Input1 name="email" type="email" placeholder="Email" className="email_register" idvalue='error'/></div>
                    <div className='maroon5'>
                    <Input1 name="password" type="password" placeholder="Password" className="password_register" idvalue='error'/></div>
                    <div className='maroon5'>
                    <Input1 name="confirmPassword" type="password" placeholder="Confirm Password" className="password_register" idvalue='error'/></div>
                    <br />
                  <Button variant="contained" type="submit">Register</Button>   
                  <br />
          </Form>
      )}
                </Formik>
                <p style={{ marginLeft: "17em" }}>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </center>
        </div>
  </Fragment>;
}



