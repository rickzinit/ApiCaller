import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetValidicData(validic) {
  const [validicId, setValidicId] = useState('');
  const [date, setDate] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [vdata, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [customData, setCustomData] = useState({});

  // const [responseData, setResponseData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get(url);
  //     setResponseData(response.data); // Access the "data" array
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="url">Enter URL:</label>
  //       <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
  //       <button type="submit" disabled={isLoading}>
  //         {isLoading ? 'Loading...' : 'Send GET Request'}
  //       </button>
  //     </form>
  //     {error && <p>{error.message}</p>}
  //     {responseData && (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Checksum</th>
  //             <th>Created At</th>
  //             <th>ID</th>
  //             <th>Log ID</th>
  //             <th>Metrics</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {responseData.map((item) => (
  //             <tr key={item.id}>
  //               <td>{item.checksum}</td>
  //               <td>{item.created_at}</td>
  //               <td>{item.id}</td>
  //               <td>{item.log_id}</td>
  //               <td>
  //                 <table>
  //                   <thead>
  //                     <tr>
  //                       <th>Type</th>
  //                       <th>Origin</th>
  //                       <th>Unit</th>
  //                       <th>Data Points</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {item.metrics.map((metric) => (
  //                       <tr key={metric.type}>
  //                         <td>{metric.type}</td>
  //                         <td>{metric.origin}</td>
  //                         <td>{metric.unit}</td>
  //                         <td>
  //                           <ul>
  //                             {metric.data_points.map((dataPoint) => (
  //                               <li key={dataPoint.time}>
  //                                 Value: {dataPoint.value}, Time: {dataPoint.time}
  //                               </li>
  //                             ))}
  //                           </ul>
  //                         </td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </table>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     )}
  //   </div>
  // );

// ****** START MAIN LOOP


if (validic.data) {
  // Create custom json object of validic data
  customData.childNodes = [];
  for (const childNode of validic.data) {
    customData.childNodes.push({
      device: childNode.source.type
    });
    
    setCustomData(customData);
  }

}

  

return customData;
}

export default GetValidicData;
