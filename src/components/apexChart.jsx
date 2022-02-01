import React, { Fragment,useEffect,useState } from 'react';
import '../assests/css/apexChart.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import ReactApexChart from "react-apexcharts";
import backendUrl from '../constants/constants';

export default function ApexChart() {

  const [age, setAge] = useState('Select Day');
  const [series,setSeries] = useState([])   
  const [options] = useState({chart: {
    height: '180vh',
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'time',
    categories: [`07:57 AM`, "07:59 AM", "08:01 AM", "08:03 AM", "08:05 AM", "07:57 AM", "07:59 AM"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  },
  
})



// {
//   name: 'series1',
//   data:
// }, { [31, 40, 28, 51, 42, 109, 100]
//   name: 'series2',
//   data: [11, 32, 45, 32, 34, 52, 41]
// }




useEffect(()=>{

  const url = `${backendUrl}/mockData/fetchApexMockData`;
  fetch(url,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response)=>response.json())
    .then((resData)=>{
      if(resData.status==='success')
      {
        let objectKeys = Object.keys(resData.message)
        let myData = [];
        for(let i=0;i<objectKeys.length;i++){
          myData.push({
            name:objectKeys[i],
            data:resData.message[objectKeys[i]]
          })
        }
        // console.log(myData)
        setSeries(myData)

      }
    }).catch(err=>{
      console.log(err)
    })

},[])


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return <Fragment>
    {/* start of main div */}
    <div className='apexCharMainDiv'>
    <div className='apexChartSubDiv'>
    {/* start of apex chart header here */}
    <div className='apexChartHeadingDiv'>
      <div><h3 className='heading-h3'>Power Cost</h3></div>
      <div className='apexChartHeadingSubDiv'>
        <div className='menuItemDiv'>
          {/* start of menu item */}
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className='menuItemInputLabel'></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label=""
          onChange={handleChange}
          className='menuItemSelect'
          style={{fontSize:'0.9em',color:'#A9A9A9'}}
          IconComponent={() => <EventIcon style={{fontSize:'1.2em',paddingRight:'0.3em',color:'#000000'}}/>}       
        >
          <MenuItem value='Select Day' style={{fontSize:'0.9em',color:'#A9A9A9',backgroundColor:'#FFFFFF'}}>Select Day</MenuItem>
          <MenuItem value='December 14th' style={{fontSize:'0.9em',color:'#A9A9A9',backgroundColor:'#FFFFFF'}}>December 14th</MenuItem>
          <MenuItem value='December 14th' style={{fontSize:'0.9em',color:'#A9A9A9',backgroundColor:'#FFFFFF'}}>December 14th</MenuItem>
          <MenuItem value='December 14th' style={{fontSize:'0.9em',color:'#A9A9A9',backgroundColor:'#FFFFFF'}}>December 14th</MenuItem>
        </Select>
      </FormControl>
          {/* end of menu item */}
        </div>
        <div className='header-icon-div'><SettingsIcon style={{fontSize:'1.3em'}} className='header-icon'/></div>
      </div>
    </div>
    {/* end of apex chart header here */}
    {/* start of apexChart Code here */}
    <div>
    <div id="chart">
    <ReactApexChart options={options} series={series} type="area" height="180vh" />
    </div>
    </div>
    {/* end of apexChart code here */}
    </div>
    </div>
    {/* end of main div */}
  </Fragment>;
}
