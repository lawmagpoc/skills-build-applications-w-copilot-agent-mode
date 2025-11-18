import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  const endpoint = baseUrl + 'leaderboard/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching leaderboard from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Leaderboard fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Leaderboard normalized:', items);
        setData(items);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {data.map((l, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between">
            <span>{l.team?.name || l.team}</span>
            <span className="badge bg-primary">{l.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
