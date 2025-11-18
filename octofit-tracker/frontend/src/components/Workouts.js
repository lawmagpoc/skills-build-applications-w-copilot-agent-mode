import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  const endpoint = baseUrl + 'workouts/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching workouts from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Workouts fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Workouts normalized:', items);
        setData(items);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {data.map((w, i) => (
          <li key={i} className="list-group-item">
            <strong>{w.name}</strong>
            <div>{w.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
