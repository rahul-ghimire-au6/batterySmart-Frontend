import React, {Fragment, useState, useEffect} from "react";
import '../assests/css/leftSidebar.css';
import profileImg from '../assests/img/profileImg.jfif';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyIcon from '@mui/icons-material/Key';
import HighlightIcon from '@mui/icons-material/Highlight';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirIcon from '@mui/icons-material/Air';
import HotTubIcon from '@mui/icons-material/HotTub';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EvStationIcon from '@mui/icons-material/EvStation';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CellTowerIcon from '@mui/icons-material/CellTower';
import InsightsIcon from '@mui/icons-material/Insights';
import HistoryIcon from '@mui/icons-material/History';
import {useParams,Link} from "react-router-dom";



export default function LeftSidebar(props) {
  const params =  useParams()

  const [e3Apps,sete3Apps] = useState(true)
  const [currentTab,setCurrentTab] = useState('')

  useEffect(()=>{
   setCurrentTab(params.value)
  },[params.value])

  const handleOnClick = (e) => {
    e.preventDefault()
    if(e.target.id==='e3Apps'){
      sete3Apps(!e3Apps)
    }
  }

  return (
    <Fragment>
      <aside className='left_sidebar'>
      <div className='custom_container_left_sidebar'>
        <div className="gridManagerDiv">
          <h5>Grid Manager 2.0</h5>
          <div></div>
          </div>
        {/* this should be changed doing this for temperary for image */}        
        <div className='left_sidebar_profile'>
          <div className='left_sidebar_profile_pic_div'>     
          <img src={profileImg} alt='profile' className='left_sidebar_profile_pic'/>
          </div>
          <div>
          <p className='left_sidebar_profile_name'>Hey, Jason{props.nameValue}</p>
          <p className='left_sidebar_profile_sub_name'>User id: Abc- 24{props.idValue}</p></div>
          </div>
          {/* end */}
          {/* ----------------------------menus-----------------------------------*/}
          <div className='left_sidebar_menu_div'>
          <div className='home_icon_div'>
          <GridViewIcon className="Icons"/>
          <span className='icon_value'>Dashboard</span>
            </div>
          {/* start of the e3 apps code  */}
          {e3Apps===false?<div className="home_icon_main_div1">
          <div className='home_icon_div' id='e3Apps' onClick={handleOnClick}>
          <KeyIcon className="Icons"/>
          <span className='icon_value' id='e3Apps' onClick={handleOnClick}>E3 Apps</span>
          <ArrowDropDownIcon className="arrowIcons" id='e3Apps' onClick={handleOnClick}/>
          </div> 
          </div>:<div className="home_icon_main_div">
          <div className="e3AppsDiv">
          <div className='home_icon_div' id='e3Apps' onClick={handleOnClick}>
          <KeyIcon className="Icons"/>
          <span className='icon_value' id='e3Apps' onClick={handleOnClick}>E3 Apps</span>
          <ArrowDropUpIcon className="arrowIcons" id='e3Apps' onClick={handleOnClick}/>
          </div>
          </div>
          <div className={currentTab==='peekSavingAndAlerts'?'selectedPeakSaving':'peakSaving'}  >   
          <Link to='/home/1/peekSavingAndAlerts'>      
          <div className='home_icon_div'>
          <HighlightIcon className="Icons"/>
          <span className='icon_value'>Peak Shaving {'&'} Alert</span>
            </div></Link> 
          </div>
          <div className={currentTab==='ventilation'?'selectedVentilation':"ventilation"} >  
          <Link to='/home/2/ventilation'>                 
          <div className='home_icon_div'>
          <AcUnitIcon className="Icons"/>
          <span className='icon_value'>Ventilation</span>
            </div></Link>
          </div>
          <div className={currentTab==='cooling'?'selectedCooling':"cooling"} >  
          <Link to='/home/3/cooling'>         
          <div className='home_icon_div'>
          <AirIcon/>
          <span className='icon_value'>Cooling</span>
            </div></Link>
          </div> 
          <div className={currentTab==='heatPump'?'selectedHeatPump':"heatPump"}>
          <Link to='/home/4/heatPump'>   
            <div className='home_icon_div'>
          <HotTubIcon/>
          <span className='icon_value'>Heat Pump</span>
            </div></Link>
          </div>   
          <div className={currentTab==='outOfHours'?'selectedOutOfHours':"outOfHour"}>
          <Link to='/home/5/outOfHours'> 
            <div className='home_icon_div'>
          <AccessTimeIcon/>
          <span className='icon_value'>Out of Hours</span>
            </div></Link> 
          </div> 
          <div className={currentTab==='evCharging'?'selectedEvCharging':"evCharging"}> 
          <Link to='/home/6/evCharging'> 
            <div className='home_icon_div'>
          <EvStationIcon/>
          <span className='icon_value'>Ev Charging</span>
            </div></Link> 
          </div>
          <div className={currentTab==='loadShifting'?'selectedLoadShifting':"loadShifting"}>
          <Link to='/home/7/loadShifting'>  
            <div className='home_icon_div'>
          <EmojiObjectsIcon/>
          <span className='icon_value'>Load Shifting</span>
            </div></Link>
            </div>   
          {/* end of the e3 apps code  */}
            </div>}
          {/* start of demand and response  */}
          <div className="otherMainDiv">
          <div className='home_icon_div'>
          <CellTowerIcon className="Icons"/>
          <span className='icon_value'>Demand Response</span>
          <ArrowDropDownIcon className="arrowIcons"/>
          </div></div>
          {/* end of demand and response */}
          {/* start of demand and response  */}
          <div className="otherMainDiv">
          <div className='home_icon_div'>
          <InsightsIcon className="Icons"/>
          <span className='icon_value'>Insights</span>
          <ArrowDropDownIcon className="arrowIcons" />
          </div></div>
          {/* end of demand and response */}  
          {/* start of demand and response  */}
          <div className="otherMainDiv">
          <div className='home_icon_div'>
          <HistoryIcon className="Icons"/>
          <span className='icon_value' >Version History</span>
          <ArrowDropDownIcon className="arrowIcons"/>
          </div></div>
          {/* end of demand and response */}

          </div>
          {/* end */}
        </div>  
      </aside>
    </Fragment>
  );
}

