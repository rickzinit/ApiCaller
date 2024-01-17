import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeConverter from './TimeConverter';
import Collapsible from 'react-collapsible';
import GetValidicData from './GetValidicData';
import './css-validic-caller.css'; // 

function ValidicCaller() {
  const [validicId, setValidicId] = useState('');
  const [date, setDate] = useState('');
  const [fetchedData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [myData, setJsonData] = useState({});
  const [customData, setCustomData] = useState({});

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`
      );
      const fetchedData = await response.json();

      if (fetchedData.data) {

        // Create custom json object of validic data
        customData.childNodes = [];
        for (const childNode of fetchedData.data) {
          customData.childNodes.push({
            validic_id: childNode.user.user_id,
            uid: childNode.user.uid,
            interval_unit: childNode.granularity.unit,
            interval_time: childNode.granularity.interval,
            device_type: childNode.source.type,
            measurement_category: childNode.type,
            created_at: childNode.created_at,
            start_time: childNode.start_time,
            end_time: childNode.end_time,
            range_start_key: childNode.tags.name,
            range_start_time: childNode.tags.value,
            utc_offset: childNode.utc_offset,
            metrics: childNode.metrics,
            measurement_type: childNode.metrics.type,
            unit: childNode.metrics.unit,
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

  // {Object.entries(responseData).map(([key,value]) => (
  //   //  Start of main loop    
  //   jsonData = 
  //         {
  //           "device": value.source.type,
  //           "data-value":value.metrics.type,
  //           "data-points": value.metrics[0].data_points
  //         }
  //   //  End of main loop           
  //       ))}
  //       setJsonData(jsonData)


  return (
    <div>
    <TimeConverter />
      <h1>Get Validic Data</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="validicId">Validic ID:</label>
        <input type="text" id="validicId" value={validicId} onChange={(e) => setValidicId(e.target.value)} />
        <label htmlFor="date">Date (YYYY-MM-DD):</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Get Data</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && <p>Loading data...</p>}
      {fetchedData && <p style={{ color: 'red' }}><a href={`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}>
        {`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}</a></p>
      } 

      
      {fetchedData && Object.entries(customData.childNodes).map(([key, value]) => (
            key && 
            <ul>
            <div>
              <div className='header1'>Observation created at: {value.created_at}</div>
            </div>
            <Collapsible trigger={<button onClick={toggle}>{isOpen ? 'Collapse Values' : 'Expand Values'}</button>} 
              
            >
            <ul>
              <li>{value.device_type}</li>
              <li>{value.measurement_category}</li>
            </ul>
             <Collapsible 
              trigger={<button onClick={toggle}>{isOpen ? 'Collapse Values' : 'Expand Values'}</button>} >
                {Object.entries(value.metrics[0].data_points).map(([k, v]) => (    
                  <div style={{background: '#EAFFF1', width: '500px', padding: '5px'}}>              
                              <li key={key}>
                                          
                              <strong>{k}- </strong>  {value.metrics[0].type}: {v.value}, 
                                  time: {v.time}
                              
                              </li>
                  </div>
                    ))
                }
                
             </Collapsible>
             </Collapsible>
             </ul>
              ))}
           


      {fetchedData && fetchedData.data[0].source.type}
      {fetchedData && 
         <div>

         <ul>
            {/* Don't include metrics node */}
           {Object.entries(fetchedData.data[0]).map(([key, value]) => (
             key !== "metrics" && <li key={key}>
               <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
             </li>
           ))}
         </ul>
         <ul>
            <b>METRICS</b>
           {Object.entries(fetchedData.data[0].metrics[0]).map(([key, value]) => (
             key !== "data_points" && <li key={key}>
               <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
             </li>
           ))}
         </ul>
         <ul>
            <b>{fetchedData.data[0].metrics[0].type}: {Object.keys(fetchedData.data[0].metrics[0].data_points).length}</b>
            <div>
            <Collapsible trigger={<button onClick={toggle}>{isOpen ? 'Collapse Values' : 'Expand Values'}</button>} 
                >
            {Object.entries(fetchedData.data[0].metrics[0].data_points).map(([key, value]) => (    
            <div style={{background: '#EAFFF1', width: '500px', padding: '5px'}}>              
                        <li key={key}>
                                    
                        <strong>{key}- </strong>  {fetchedData.data[0].metrics[0].type}: {fetchedData.data[0].metrics[0].data_points[key].value}, 
                            time: {fetchedData.data[0].metrics[0].data_points[key].time}
                        
                        </li>
            </div>
                    ))
                }
            </Collapsible>
            
            </div>
         </ul>
       </div>
      }
      
     </div>
  );
}

export default ValidicCaller;
