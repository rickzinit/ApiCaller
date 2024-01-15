import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeConverter from './TimeConverter';
import Collapsible from 'react-collapsible';

function GetValidicData() {
  const [validicId, setValidicId] = useState('');
  const [date, setDate] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`
      );
      setResponseData(response.data);

    //   const jsonData = response.data;
    //   const typeValue = (jsonData.data[0].source.type) || 'Type not found';
    //   setResponseData(typeValue)
      

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



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
      {responseData && <p style={{ color: 'red' }}><a href={`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}>
        {`https://api.v2.validic.com/organizations/5d1b5b162141970001178f0e/users/${validicId}/intraday?start_date=${date}&token=b2673e4991269d7be4391bef5888c385`}</a></p>
      } 
      {responseData && responseData.data[0].source.type}
      {responseData && 
         <div>
         <pre>
           <code>
             {/* {JSON.stringify(responseData.data[0], null, 2)} */}
           </code>
         </pre>

         {/* {Object.entries(responseData.data).map(([k,v]) => (
            k

            ))} */}

         

         <ul>
            {/* Don't include metrics node */}
           {Object.entries(responseData.data[0]).map(([key, value]) => (
             key !== "metrics" && <li key={key}>
               <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
             </li>
           ))}
         </ul>
         <ul>
            <b>METRICS</b>
           {Object.entries(responseData.data[0].metrics[0]).map(([key, value]) => (
             key !== "data_points" && <li key={key}>
               <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
             </li>
           ))}
         </ul>
         <ul>
            <b>{responseData.data[0].metrics[0].type}: {Object.keys(responseData.data[0].metrics[0].data_points).length}</b>
            <div>
            <Collapsible trigger={<button onClick={toggle}>{isOpen ? 'Collapse Values' : 'Expand Values'}</button>} 
                >
            {Object.entries(responseData.data[0].metrics[0].data_points).map(([key, value]) => (    
            <div style={{background: '#EAFFF1', width: '500px', padding: '5px'}}>              
                        <li key={key}>
                                    
                        <strong>{key}- </strong>  {responseData.data[0].metrics[0].type}: {responseData.data[0].metrics[0].data_points[key].value}, 
                            time: {responseData.data[0].metrics[0].data_points[key].time}
                        
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

export default GetValidicData;
