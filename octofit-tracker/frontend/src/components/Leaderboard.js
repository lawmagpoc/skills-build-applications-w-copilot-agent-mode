import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
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
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((l, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{l.team?.name || l.team}</td>
                <td>{l.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
