import React, { useState, useEffect } from 'react';

function TimeConverter() {
  const [utcTime, setUtcTime] = useState('');
  const [localTime, setLocalTime] = useState('');

  const handleUtcTimeChange = (e) => {
    setUtcTime(e.target.value);
  };

  useEffect(() => {
    if (utcTime) {
      const date = new Date(utcTime);
      const options = {
        timeZone: 'UTC',
        hour12: true,
        // weekday: 'long',
        // day: 'numeric',
      };
      const localTimeString = date.toLocaleString('en-US', options);
      setLocalTime(localTimeString);
    }
  }, [utcTime]);

  return (
    <div style={{ border: '2px solid red', padding: '10px' }}>
      <input type="text" value={utcTime} onChange={handleUtcTimeChange} placeholder="Enter UTC time (YYYY-MM-DDTHH:mm:ss)" />
      <p>Local Time: {localTime}</p>
    </div>
  );
}

export default TimeConverter;
