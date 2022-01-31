import React ,{Fragment} from 'react';
import '../assests/css/alertForm.css';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import Input1 from "./input";
import Input2 from './inout2';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

export default function alertForm(props) {

    const validate = Yup.object({
        name: Yup.string().required('Name is required'),
        criteria:Yup.string(),
        value: Yup.number().required('Value is required'),
        days:Yup.string().required('Days is required'),
        email:Yup.string().email('Email is not valid').required('Email is required'),
        phone:Yup.string().phone('Please enter a valid phone number').required('Phone number is required')
    })

    const handleAlertFormSubmit = async(values)=>{
        let data={
            name:values.name,
            criteria:values.criteria,
            value:values.value,
            days:values.days,
            email:values.email,
            phone:values.phone.toString()
        }
        console.log(data)
        let token = JSON.parse(localStorage.getItem("token"))
        const url = "http://localhost:8080/form/addFormData";
        fetch(url,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization:token
            },
            body: JSON.stringify(data),
          })
          .then((response)=>response.json())
          .then((resData)=>{
            if(resData.status==='success'){
            Toast.fire({
                icon: "success",
                title: resData.message,
              })
            }else{
              console.log(resData)
            Toast.fire({
                icon: "error",
                title: data.errMessage
              })
            }
          }).catch(err=>{
            console.log(err)
            Toast.fire({
                icon: "error",
                title: 'something went wrong while connecting to server'
              })
          })
        
       

    }

    return <Fragment>
{/* start of main div */}
<div className='alertFormMainDiv'>
    <div className='alertFormSubMainDiv'>
    <h4 className='alertFormHeader'>Create Alert</h4>
    <Formik      
        initialValues={{
        name: '',
        criteria:'greater',
        value:'',
        days:'',
        email:'',
        phone:''
        }}
        validationSchema={validate}
        onSubmit={values => {
            handleAlertFormSubmit(values)
        }}>{formik=>(
        <Form>
            <div>
            <Input1 name="name" type="text" placeholder="Name" className='alertForm-input' idvalue='alertError'/></div>
            {/* start of radio button here */}
            <p className='criteriaPTag'>Criteria</p>
            <div className='radioButtonDiv'>
                <div>
            <Input1 name="criteria" value='greater' type="radio"  idvalue='radioButtonError' checked/>
            <label htmlFor="greater">Greater than</label>
            </div>
            <div className='alertLabelDiv'>
            <Input1 name="criteria" value='less' type="radio"  idvalue='radioButtonError'/>
            <label htmlFor="less">Less than</label>
            </div>
            </div>
            {/* end of radio button code here */}
            <div className='alertInputValueDiv'><Input1 name="value" placeholder='value' type="number" className='alertForm-input'  idvalue='alertError'/></div>
            {/* start of days */}
            <div className='alertInputValueDiv'>
            <Input2 name="days" idvalue='alertError' className='alertSelect'>
            <option value="" label="Select a Days" />
            <option value="sunday" label="Sunday" />
            <option value="monday" label="Monday" />
            <option value="tuesday" label="Tuesday" />
            <option value="wednesday" label="Wednesday" />
            <option value="thursday" label="Thursday" />
            <option value="friday" label="Friday" />
            <option value="saturday" label="Saturday" />
            </Input2>
            </div>
            {/* end of days  */}
            <div className='alertInputValueDiv'>
            <Input1 name="email" type="email" placeholder="Email" className='alertForm-input' idvalue='alertError'/></div>
            <div className='alertInputValueDiv'>
            <Input1 name="phone" type="number" placeholder="Phone" className='alertForm-input' idvalue='alertError'/></div>
            <div className='alertSubmitButton'>
            <Button variant="contained" type="submit">Submit</Button></div>
        </Form>)}
    </Formik>
    </div>
</div>
{/* end of main div */}
    </Fragment>;
}
