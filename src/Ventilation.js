import React, { Fragment } from 'react';
import LeftSidebar from './components/leftSidebar'
import './assests/css/app.css'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

export default function Ventilation(props) {
  
  
  return <Fragment>
    {/* start of main body */}
    <section className='mainBody'>
    {/* code for left side bar */}
    <section>
    <LeftSidebar/>
    </section>
    {/* end of side bar code */}
    {/* start of sub-main body  */}
    <section className='subMainBody'>
      <div className='subMainBody-div'>
        <div className='subMainBody-header'><h3>Ventilation</h3></div>
        <div className='subMainBody-header-div'>
          <div><h3 className='subHeader'>Carlsberg Group</h3></div>
          <div><NotificationsActiveOutlinedIcon className='subHeader-icon'/></div>
        </div>
      </div>
    </section>
    {/* end of sub-main body */}
    </section>
    {/* end of main body */}
  </Fragment>;
}
