import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
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
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Suggested For</th>
            </tr>
          </thead>
          <tbody>
            {data.map((w, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{w.name}</td>
                <td>{w.description}</td>
                <td>{w.suggested_for || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
