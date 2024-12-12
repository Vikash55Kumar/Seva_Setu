import React, { useState, useEffect } from "react";
import DistrictDashboard from "./CertificateDashboard";
import SubdivisionDashboard from "./SubdivisionDashboard";
import CaseDashboard from "./CaseDashboard";

const ResourceDashboard = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdivision, setSelectedSubdivision] = useState(null);

  // Fetch districts on load
  useEffect(() => {
    fetch("/api/districts")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Certificate Management Dashboard</h1>
      {/* District Selection */}
      <DistrictDashboard
        districts={districts}
        onSelectDistrict={setSelectedDistrict}
      />

      {/* Subdivision Selection */}
      {selectedDistrict && (
        <SubdivisionDashboard
          districtId={selectedDistrict.id}
          onSelectSubdivision={setSelectedSubdivision}
        />
      )}

      {/* Case Details */}
      {selectedSubdivision && (
        <CaseDashboard subdivisionId={selectedSubdivision.id} />
      )}
    </div>
  );
};

export default ResourceDashboard;
