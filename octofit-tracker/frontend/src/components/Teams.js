import React, { useEffect, useState } from 'react';

const Teams = () => {
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  const endpoint = baseUrl + 'teams/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching teams from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Teams fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Teams normalized:', items);
        setData(items);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {data.map((t, i) => (
          <li key={i} className="list-group-item">{t.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
