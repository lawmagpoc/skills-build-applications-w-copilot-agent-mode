import React, { useEffect, useState } from 'react';

const Users = () => {
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  const endpoint = baseUrl + 'users/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Users fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Users normalized:', items);
        setData(items);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {data.map((u, i) => (
          <li key={i} className="list-group-item">
            {u.name} — {u.email} {u.team?.name ? `(${u.team.name})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
