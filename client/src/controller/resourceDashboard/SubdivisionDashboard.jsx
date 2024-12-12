import React, { useState, useEffect } from "react";

const SubdivisionDashboard = ({ districtId, onSelectSubdivision }) => {
  const [subdivisions, setSubdivisions] = useState([]);

  // Fetch subdivisions for the selected district
  useEffect(() => {
    fetch(`/api/subdivisions/${districtId}`)
      .then((res) => res.json())
      .then((data) => setSubdivisions(data))
      .catch((err) => console.error(err));
  }, [districtId]);

  return (
    <div>
      <h2>Select a Subdivision</h2>
      {subdivisions.map((subdivision) => (
        <button
          key={subdivision.id}
          onClick={() => onSelectSubdivision(subdivision)}
        >
          {subdivision.name}
        </button>
      ))}
    </div>
  );
};

export default SubdivisionDashboard;
