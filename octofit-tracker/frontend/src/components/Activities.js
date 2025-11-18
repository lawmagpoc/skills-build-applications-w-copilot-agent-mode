import React, { useEffect, useState } from 'react';

const Activities = () => {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
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
      <h2 className="h4 mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {data.map((a, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{a.type}</td>
                <td>{a.duration}</td>
                <td>{a.date}</td>
                <td>{a.user?.name || a.user || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
