import React, { useState } from "react";
import axios from "axios";

function ApiCaller() {
  const [url, setUrl] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [urls, setUrls] = useState(['https://smhd2.mapsandbox.net/smhdsync/v4/public/readings', 'https://example.com/api/endpoint2']); // Replace with your actual URLs


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      setResponseData(response.data.result); // Access the "result" array
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (urlItem) => {
    navigator.clipboard.writeText(urlItem)
      .then(() => {
        alert('URL copied to clipboard!');
        const urlTextbox = document.getElementById('url');
        urlTextbox.onChange=setUrl(urlItem)
        // urlTextbox.textContent = urlItem;
      })
      .catch((error) => {
        console.error('Error copying URL:', error);
      });
    };
  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
        <h2>URLs:</h2>
        <ul>
            {urls.map((urlItem) => (
            <li key={urlItem}>
                {urlItem} <button onClick={() => handleCopy(urlItem)}>Copy</button>
            </li>
            ))}
        </ul>
      </div>
        <label htmlFor="url">Enter URL:</label>
        <input
          size={100}
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send GET Request"}
        </button>
      </form>
      {error && <div style={{ fontSize: '30px', fontWeight: 'bold', color: 'red' }}>
        <p>{error.message}</p></div>}
        <br/>
        <hr></hr>
      {responseData && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Unit</th>
              <th>Code</th>
              <th>Aggregation Type</th>
              <th>Categories</th>
              <th>Friendly Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((item) => (
              <tr key={item.code}>
                <td>{item.title}</td>
                <td>{item.unit}</td>
                <td>{item.code}</td>
                <td>{item.aggregationType}</td>
                <td>{item.categories.join(", ")}</td>
                <td>{item.friendlyName}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


export default ApiCaller;
