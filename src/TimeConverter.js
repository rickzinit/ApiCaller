import React, { useState, useEffect } from 'react';

function TimeConverter(utc) {
  const [utcTime, setUtcTime] = useState('');
  const [localTime, setLocalTime] = useState('');

  const handleUtcTimeChange = (e) => {
    setUtcTime(e.target.value);
  };

  useEffect(() => {
    if (utc) {
      const utcTime = utc.utc;
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
    <span>
      {/* <input type="text" value={utcTime} onChange={handleUtcTimeChange} placeholder="Enter UTC time (YYYY-MM-DDTHH:mm:ss)" /> */}
      {localTime}
    </span>
  );
}

export default TimeConverter;
