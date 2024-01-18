import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeConverter from './TimeConverter';
import Collapsible from 'react-collapsible';
import GetValidicData from './GetValidicData';
import './css-validic-caller.css'; 
// import './collapsible.scss';

function ValidicCaller() {
  const [validicId, setValidicId] = useState('');
  const [date, setDate] = useState('');
  const [fetchedData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [myData, setJsonData] = useState({});
  const [customData, setCustomData] = useState({});



  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`
      )
      
      const fetchedData = await response.json();

      if (fetchedData.data.length == 0) {
        throw new Error("No Data Found");
      }

      if (fetchedData.data) {

        // Create custom json object of validic data
        customData.childNodes = [];
        for (const childNode of fetchedData.data) {

          customData.childNodes.push({
            validic_id: childNode.user.user_id,
            uid: childNode.user.uid,
            interval_unit:  childNode.granularity === undefined ? '' : childNode.granularity.unit ,
            interval_time:  childNode.granularity === undefined ? '' : childNode.granularity.interval,
            device_type: childNode.source.type === undefined ? '' : childNode.source.type,
            measurement_category: childNode.type === undefined ? '' : childNode.type,
            created_at: childNode.created_at,
            start_time: childNode.start_time,
            end_time: childNode.end_time,
            range_start_name: childNode.tags.name === undefined ? '' : childNode.tags[0].name,
            range_start_time: childNode.tags.name === undefined ? '' : childNode.tags[0].value,
            range_end_name: childNode.tags.name === undefined ? '' : childNode.tags[1].name,
            range_end_time: childNode.tags.value === undefined ? '' : childNode.tags[1].value,
            utc_offset: childNode.utc_offset === undefined ? '' : childNode.utc_offset,
            metrics: childNode.metrics === undefined ? '' : childNode.metrics,
            measurement_type: childNode.metrics.type === undefined ? '' : childNode.metrics.type,
            unit: childNode.metrics.unit === undefined ? '' : childNode.metrics.unit,
            data_points_array: childNode.metrics.data_points,

          });
          
          setCustomData(customData);
        }
      
      }

      setResponseData(fetchedData);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <h1 className='title1'>Fetch Validic Data</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="validicId">Sandbox Validic ID: </label>
          <input className='textbox1' type="text" id="validicId" value={validicId} onChange={(e) => setValidicId(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="date">Date: </label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button className='btn-get-data' type="submit">Get Data</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {error2 && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && <p>Loading data...</p>}
      {fetchedData && 
        <div className='border1 top1 left1'>
          <div className='title3'>
            For Raw Data Click on Link
          </div>
          <div class='div-link'><a target='blank' href={`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}>
            {`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}
            </a></div>
        </div>
      } 

      {customData.childNodes &&
        <div class='title2' style={{margin: '10px'}}> {customData.childNodes.length} Observations found </div>
      }
      {fetchedData && Object.entries(customData.childNodes).map(([key, value]) => (
            key && 
            <ul>
            <div>
              <div className='header1'>{value.measurement_category} Observation created at: <TimeConverter utc={value.created_at}/>
              </div>
            </div>
            <Collapsible trigger={<button class='button'onClick={toggle1}>{'Click Here >>' } {value.device_type}  {value.metrics[0].type} ({value.metrics[0].unit}) </button>} 
              >
            <ul className='header2'>
              <li>{value.device_type}</li>
              <li>Start Time: <TimeConverter utc={value.start_time}/></li>
              <li>End Time: <TimeConverter utc={value.end_time}/></li>
              <li>Range Start Time: <TimeConverter utc={value.range_start_time}/></li>
              <li>Range End Time: <TimeConverter utc={value.range_end_time}/></li>
              <p class="header2">{value.metrics[0].type === undefined ? '' : value.metrics[0].type} ({value.metrics[0].unit === undefined ? '' : value.metrics[0].unit})</p>
                {Object.entries(value.metrics[0].data_points === undefined ? value.metrics : value.metrics[0].data_points).map(([k, v]) => (    
                  <div class='metrics-list'>              
                              <li key={key}>                                         
                              <strong>{k}- </strong>  {value.metrics[0].type}: {v.value}, 
                                  time: <TimeConverter utc={v.time}/>
                              
                              </li>
                  </div>
                    ))
                }

            </ul>
                
             </Collapsible>
             </ul>
              ))}

           {/* Display with actual node names - Don't include metrics node */}
            {fetchedData && Object.entries(fetchedData.data[0]).map(([key, value]) => (
             <li key={key}>
               <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
             </li>
           ))}
 
      
     </div>
  );
}

export default ValidicCaller;
