import React, { useEffect, useState } from 'react';

const Activities = () => {
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  const endpoint = baseUrl + 'activities/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching activities from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Activities fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Activities normalized:', items);
        setData(items);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {data.map((a, i) => (
          <li key={i} className="list-group-item">
            <strong>{a.type}</strong> — {a.duration} minutes on {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
