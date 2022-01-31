import React, { Fragment, useEffect } from 'react';
import LeftSidebar from './components/leftSidebar';
import ApexChart from './components/apexChart';
import AlertForm from './components/alertForm';
import AlertData from './components/alertData'
import './assests/css/app.css';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useHistory } from "react-router-dom";

export default function App(props) {
  const history = useHistory()

  useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('token')) 
    if(!token){
      history.push('/login')
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  
  return <Fragment>
    {/* start of main body */}
    <section className='mainBody'>
    {/* code for left side bar */}
    <section>
    <LeftSidebar/>
    </section>
    {/* end of side bar code */}
    <section className='subMainBody'>
      {/* start of sub-main body  */}
      <div className='subMainBody-div'>
        <div className='subMainBody-header'><h3>Peak Shaving {'&'} Alert</h3></div>
        <div className='subMainBody-header-div'>
          <div><h3 className='subHeader'>Carlsberg Group</h3></div>
          <div><NotificationsActiveOutlinedIcon className='subHeader-icon'/></div>
        </div>
      </div>
      {/* end of sub-main body */}
      <div className='componentRootDiv'>
      {/* start of apexChart component */}
      <ApexChart/>
      {/* end of apexChart component here */}
      <div className='componentRootSubDiv'>
      {/* start of alert form component */}
      <div><AlertForm/></div>
      {/* end of alert div component */}
      {/* start of alert data component */}
      <div>
      <AlertData/>
      </div>
      {/* end of alert data component */}
      </div>
      </div>
    </section>
    </section>
    {/* end of main body */}
  </Fragment>;
}
