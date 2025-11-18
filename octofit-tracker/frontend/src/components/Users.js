import React, { useEffect, useState } from 'react';

const Users = () => {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
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
      <h2 className="h4 mb-3">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.team?.name || u.team || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
