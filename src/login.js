import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Input1 from "./components/input";
import login_img from "./assests/img/login.jpg";
import "./assests/css/login.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import backendUrl from './constants/constants.js';


const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function Login (props) {

  const history = useHistory()
 
  const handleSubmit = (values) => {
    let data = {
      email:values.email,
      password:values.password
    };
    const url = `${backendUrl}/user/login`;
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
        localStorage.setItem("token", JSON.stringify(data.token));
        if (data.status === "success") {  
          //here is the animation
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          }).then(()=>{
            history.push('/home/1/peekSavingAndAlerts')
          })
          //  end
        } else {
          Toast.fire({
            icon: "error",
            title: data.message
          })
        }
      })
      .catch((err) => console.log(err));  
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  return <Fragment>
            <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "5em",
          }}
        >
          <center>
            <div className="login_container">
              <br />
              <br />
              <div>
                <img src={login_img} alt="login" className="login_img" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "18em",
                    marginTop: "1em",
                  }}
                >
                  <div style={{ marginTop: "0.4em", marginLeft:"1em" }}>
                    <h1>Login</h1>
                    <br />
                  </div>
                  <div>
                    <LoginIcon style={{ fontSize: "4em", marginTop:"0.32em" }}/>
                  </div>
                </div>
                {/* end */}
                {/* logo */}
                <div className="mini_logo_container1">
                  <div className="facebook_logo1">
                    <img
                      src="https://img.icons8.com/material-two-tone/30/000000/facebook-f--v2.png"
                      alt="facebook"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="google_logo1">
                    <img
                      src="https://img.icons8.com/material-rounded/30/000000/google-logo.png"
                      alt="google"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="linkedin_logo1">
                    <img
                      src="https://img.icons8.com/windows/30/000000/linkedin-2.png"
                      alt="linkedin"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                </div>
                {/* end */}
                <div style={{ marginLeft: "16.5em", marginTop: "3em" }}>
                  <p style={{ fontWeight: "500" }}>
                    or use your email for registration
                  </p>
                </div>
              <Formik      
                initialValues={{
                email: '',
                password: ''}}
                validationSchema={validate}
                onSubmit={values => {
                  handleSubmit(values)
                }}>
                  {formik => (
                    <Form className="form1" style={{ marginLeft: "16.5em" }} >
                    <div className='maroon5'>
                    <Input1 name="email" type="email" placeholder="Email" className="email_register" idvalue='error'/></div>
                    <div className='maroon5'>
                    <Input1 name="password" type="password" placeholder="Password" className="password_register" idvalue='error'/></div>
                    <br />
                  <Button variant="contained" type="submit">Login</Button>   
                  <br /></Form>)}
                </Formik>
                <p style={{ marginLeft: "16em" }}>
                  Don't have an account ? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </center>
        </div>
  </Fragment>;
}


