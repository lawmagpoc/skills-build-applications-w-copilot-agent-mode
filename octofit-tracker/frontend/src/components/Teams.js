import React, { useEffect, useState } from 'react';

const Teams = () => {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
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
      <h2 className="h4 mb-3">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t.name}</td>
                <td>{t.members?.length ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
