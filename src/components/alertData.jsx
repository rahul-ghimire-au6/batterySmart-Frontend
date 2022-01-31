import React, { Fragment,useState,useEffect } from 'react';
import '../assests/css/alertData.css'
import '../assests/css/table.css'
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
let callCount=0


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




export default function AlertData() {

  const [formData,setFormData] = useState('');
  const [paginationCount,setPaginationCount] = useState(0);
  const [currentFormData,setCurrentFormData] = useState([]);

  useEffect(()=>{
    // let token = JSON.parse(localStorage.getItem("token"))
        const url = "http://localhost:8080/form/fetchFormData";
        fetch(url,{
            method: "GET",
            headers: {
              // "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              // Authorization:token
            },
          })
          .then((response)=>response.json())
          .then((resData)=>{
            if(resData.status==='success')
            {
              setFormData([...resData.message])
              //setting count for pagination
              let temp = resData.message.length/5
              setPaginationCount(Math.ceil(temp))
              // end of setting count for pagination
              //slicing array into 5 elements
              let temp159 = resData.message.splice(0,5);
              setCurrentFormData(temp159)
              //end of slicing array into 5 element
            }
          }).catch(err=>{
            console.log(err)
          })
  },[])

  const handlePagination=(e)=>{
    e.preventDefault();
    let temp=''
    let currentValue = e.target.textContent;
    let step = 0;
    let count = 5;
    const a = (key)=>{
      if(key===1){
          let dummy1 = [...formData]
          temp = dummy1.splice(step,count)
      }
      for(let i=1; i<key;){
        if(key!==1){
          let dummy2 = [...formData]
          step=step+count
          temp = dummy2.splice(step,count)
          i++
        }
      }
    }
    a(parseInt(currentValue))
    setCurrentFormData(temp)
  }

  const handleRefresh=(e)=>{
    if(e!==undefined)
      e.preventDefault()
        // let token = JSON.parse(localStorage.getItem("token"))
        const url = "http://localhost:8080/form/fetchFormData";
        fetch(url,{
            method: "GET",
            headers: {
              // "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              // Authorization:token
            },
          })
          .then((response)=>response.json())
          .then((resData)=>{
            if(resData.status==='success')
            {
              setFormData([...resData.message])
              //setting count for pagination
              let temp = resData.message.length/5
              setPaginationCount(Math.ceil(temp))
              // end of setting count for pagination
              //slicing array into 5 elements
              let temp159 = resData.message.splice(0,5);
              setCurrentFormData(temp159)
              //end of slicing array into 5 element
            }
          }).catch(err=>{
            console.log(err)
          })
    
  }

  const handleDelete=(e)=>{
    e.preventDefault()
    if(callCount===0){
      if(e.target.id===''){
        return
      }else{
        console.log('ok')
        let dataId = e.target.id;
        // let token = JSON.parse(localStorage.getItem("token"))
        const url = `http://localhost:8080/form/deleteFormData/${dataId}`;
        fetch(url,{
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              // Authorization:token
            },
          })
          .then((response)=>response.json())
          .then((resData)=>{
            if(resData.status==='success'){
              handleRefresh()
              Toast.fire({
                icon: "success",
                title: resData.message,
              })  
            }
          }).catch(err=>{
            console.log(err)
          })

        
        callCount=callCount+1
      }






    }else{
      callCount=0
      return
    }
  }




  return <Fragment>
{/* start of main div */}
<div className='alertDataMainDiv'>
  <div className='alertDataMainSubDiv'>
  {/* start of top button element */}
  <div className='alertDataButtonDiv'>
    <div className='alertDataButtonSubDiv1'>
      <div><Button variant="contained" id='alertDataButton1'>Alerts</Button></div>
      <div><Button variant="outlined" id='alertDataButton2'>Triggered Alerts</Button></div>
    </div>
    <div className='alertDataButtonSubDiv2'>
      <RefreshIcon className='refreshIcon' onClick={handleRefresh}/>
    </div>    
  </div>
  {/* end of top button element */}
  {/* start of table component here */}
  <div className='alertDataTable'>
  {/* <Table159 tableData={currentFormData} deleteData={handleDelete}/> */}
  <table className='alertDataTable'>
            <thead>
                <tr>
                    <th className='alertDataTable-th'>Name</th>
                    <th className='alertDataTable-th'>Phone</th>
                    <th className='alertDataTable-th'>Criteria</th>
                    <th className='alertDataTable-th'>Value</th>
                    <th className='alertDataTable-th'>Email</th>
                    <th className='alertDataTable-th'>Active Days</th>
                    <th className='alertDataTable-th'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentFormData.length === 0 ? null : currentFormData.map((element) => (<Fragment key={element.id===undefined?element._id:element.id}>
                    <tr className='alertDataTable-tr'>
                        <td className='alertDataTable-td'>{element.name}</td>
                        <td className='alertDataTable-td'>{element.phone}</td>
                        <td className='alertDataTable-td'>{element.criteria}</td>
                        <td className='alertDataTable-td'>{element.value}</td>
                        <td className='alertDataTable-td'>{element.email}</td>
                        <td className='alertDataTable-td'>{element.days}</td>
                        <td className='alertDataTable-td'><div className='tableFontMainDiv'>
                            <div><EditIcon /></div>
                            <div id={element.id===undefined?element._id:element.id}  onClick={handleDelete}><DeleteOutlineOutlinedIcon id={element.id===undefined?element._id:element.id} onClick={handleDelete}/></div>
                        </div>
                        </td></tr>
                </Fragment>))}
            </tbody>
        </table>
  </div>
  {/* end of table component here */}
  {/* start of pagination code here */}
  <div className='alertDataPaginationMainDiv'>
  <Stack spacing={2}>
      <Pagination count={paginationCount} variant="outlined" shape="rounded" sx={{color: '#0D1148 !important'}} onClick={handlePagination} />
  </Stack>
  </div>
  {/* end of pagination code here */}







  {/* end of table code */}
  </div>
</div>
{/* end of main div */}
  </Fragment>;
}
