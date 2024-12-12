import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaBars, FaTimes } from "react-icons/fa";
import "./CertificateDashboard.css";

function CertificateDashboard({ admin = {}, states = [], cases = [] }) {
  const { fullName } = admin || {}; // Extract admin's name
  const [showSidebar, setShowSidebar] = useState(true); // Toggle for sidebar visibility
  const [selectedState, setSelectedState] = useState(""); // Selected state ID
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Selected district ID
  const [selectedSubdivisions, setSelectedSubdivisions] = useState([]); // Subdivisions for selected district
  const [selectedSubdivision, setSelectedSubdivision] = useState(""); // Selected subdivision ID
  const [certificateType, setCertificateType] = useState(""); // Selected certificate type
  const [filteredCases, setFilteredCases] = useState([]); // State to store filtered cases
  const [certificateTypes] = useState(["Birth", "Caste", "Income", "Residence"]);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [freeResources, setfreeResources] = useState("");


  const regions = ["North-West", "North-East", "South-East", "South-West", "West"];

  const handleRegionChange = (caseId, region) => {
    setSelectedRegion((prevState) => ({
      ...prevState,
      [caseId]: region,
    }));
  };


  // New state to store Region & Service Data
  const [regionServiceData, setRegionServiceData] = useState([
    { regionName: "North-East", serviceName: "Caste", resourceAllocated: 30, requiredResource: 10 },
    // You can add more entries here
  ]);

  // Handle state selection and load districts
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);

    // Reset districts and subdivisions
    setSelectedDistrict("");
    setSelectedSubdivisions([]);
    setSelectedSubdivision("");
  };

  // Handle district selection and load subdivisions
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    const selectedStateObject = states.find((state) => state._id === selectedState);
    const selectedDistrictObject =
      selectedStateObject?.districts.find((district) => district._id === districtId);

    setSelectedSubdivisions(selectedDistrictObject ? selectedDistrictObject.subdivisions : []);
    setSelectedSubdivision(""); // Reset subdivision when district changes
  };

  // Handle subdivision selection
  const handleSubdivisionChange = (e) => {
    setSelectedSubdivision(e.target.value);
  };

  // Handle certificate type selection
  const handleCertificateTypeChange = (e) => {
    setCertificateType(e.target.value);
  };

  // const handleSearch = () => {
  //   if (!selectedState || !selectedDistrict || !selectedSubdivision || !certificateType) {
  //     alert("Please select all fields before searching.");
  //     return;
  //   }

  //   // Filter the cases based on the selected certificate type
  //   const filtered = cases.filter((caseItem) => caseItem.certificateType === certificateType);
  //   setFilteredCases(filtered); // Update filtered cases state

  //   console.log("Search Parameters:", {
  //     state: states.find((s) => s._id === selectedState)?.name,
  //     district: states
  //       .find((s) => s._id === selectedState)
  //       ?.districts.find((d) => d._id === selectedDistrict)?.name,
  //     subdivision: selectedSubdivisions.find((s) => s._id === selectedSubdivision)?.name,
  //     certificateType,
  //   });
  // };

  //   // Handle Allocation Logic (button click)
  //   const handleAllocate = () => {
  //     // Iterate over each case to check if the region is selected
  //     const updatedRegionServiceData = regionServiceData.map((data) => {
  //       // Find the corresponding region from selectedRegion
  //       const selected = selectedRegion[data.regionName];
  //       if (selected) {
  //         // Check if there are enough free resources to allocate
  //         const freeResource = data.requiredResource;
  //         const resourceAllocation = data.resourceAllocated;
  
  //         if (freeResource > 0 && freeResource <= data.resourceAllocated) {
  //           // Update resource allocation
  //           return {
  //             ...data,
  //             resourceAllocation: resourceAllocation - freeResource, // Add to allocated resources
  //             requiredResource: 0, // All required resources have been allocated
  //           };
  //         }
  //       }
  //       return data;
  //     });

  //     setRegionServiceData(updatedRegionServiceData);

  //     // Now update the free resources in cases based on selectedRegion
  //     const updatedCases = filteredCases.map((caseItem) => {
  //       const region = selectedRegion[caseItem._id];
  //       if (region) {
  //         // Find the region service data and calculate the updated resources
  //         const caseRegionData = regionServiceData.find((r) => r.regionName === region);
  
  //         if (caseRegionData) {
  //           const updatedFreeResource = parseInt(caseItem.freeResource)- caseRegionData.requiredResource ;
  //           return {
  //             ...caseItem,
  //             allocation: caseRegionData.resourceAllocated,
  //             freeResource: updatedFreeResource.toString(),
  //           };
  //         }
  //       }
  //       return caseItem;
  //     });
  
  //     setFilteredCases(updatedCases); // Update cases state after allocation
  //   };


  // Toggle sidebar visibility
  
  
  
  
  const handleSearch = () => {
    if (!selectedState || !selectedDistrict || !selectedSubdivision || !certificateType) {
      alert("Please select all fields before searching.");
      return;
    }

    // Filter the cases based on the selected certificate type
    const filtered = cases.filter((caseItem) => caseItem.certificateType === certificateType);
    setFilteredCases(filtered); // Update filtered cases state

    console.log("Search Parameters:", {
      state: states.find((s) => s._id === selectedState)?.name,
      district: states
        .find((s) => s._id === selectedState)
        ?.districts.find((d) => d._id === selectedDistrict)?.name,
      subdivision: selectedSubdivisions.find((s) => s._id === selectedSubdivision)?.name,
      certificateType,
    });
  };

  // Handle Allocation Logic (button click)
  // const handleAllocate = () => {
  //   // // Iterate over each case to check if the region is selected
  //   const updatedRegionServiceData = regionServiceData.map((data) => {
  //     // Find the corresponding region from selectedRegion
  //     const selected = selectedRegion[data.regionName];
  //     if (selected) {
  //       // Check if there are enough free resources to allocate
  //       const freeResource = data.requiredResource;
  //       const resourceAllocation = data.resourceAllocated;
  //       console.log(freeResource, resourceAllocation)

  //   //     if (freeResource > 0 && freeResource <= data.resourceAllocated) {
  //   //       // Update resource allocation
  //   //       return {
  //   //         ...data,
  //   //         resourceAllocation: resourceAllocation - freeResource, // Add to allocated resources
  //   //         requiredResource: 0, // All required resources have been allocated
  //   //       };
  //   //     }
  //     }
  //     return data;


  //   });

  //   // setRegionServiceData(updatedRegionServiceData);

  //   // Now update the free resources in cases based on selectedRegion
  //   // const updatedCases = filteredCases.map((caseItem) => {
  //   //   const region = selectedRegion[caseItem._id];
  //   //   if (region) {
  //   //     // Find the region service data and calculate the updated resources
  //   //     const caseRegionData = regionServiceData.find((r) => r.regionName === region);

  //   //     if (caseRegionData) {
  //   //       const updatedFreeResource = parseInt(caseItem.freeResource) - caseRegionData.requiredResource;
  //   //       return {
  //   //         ...caseItem,
  //   //         allocation: caseRegionData.resourceAllocated,
  //   //         freeResource: updatedFreeResource.toString(),
  //   //       };
  //   //     }
  //   //   }
  //   //   return caseItem;
  //   // });

  //   // setFilteredCases(updatedCases); // Update cases state after allocation
  // };
  
const handleAllocate =(freeResource) => {
  {regionServiceData.map((data, index) => (
      
    setRegionServiceData[data.resourceAllocated +=parseInt(freeResource)],
    setRegionServiceData[data.requiredResource-=parseInt(freeResource)]
      
  ))
  
  }
  {filteredCases.map((caseItem) => (
    
     setfreeResources[caseItem.freeResource-=freeResource]
      
    
  ))
  
  }
  
}
  
  
  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <div className="certificate-dash">
      {/* Button to toggle sidebar */}
      <button
        className="toggle-button"
        onClick={toggleSidebar}
        style={{ left: showSidebar ? "12rem" : "1rem" }}
      >
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <div className="dashboard-menu">
          <h2>Certificate Dashboard</h2>

          {/* State Selection */}
          <div className="menu-item">
            <span>State</span>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Selection */}
          {selectedState && (
            <div className="menu-item">
              <span>District</span>
              <select value={selectedDistrict} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                {states
                  .find((state) => state._id === selectedState)
                  ?.districts.map((district) => (
                    <option key={district._id} value={district._id}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Subdivision Selection */}
          {selectedDistrict && (
            <div className="menu-item">
              <span>Subdivision</span>
              <select value={selectedSubdivision} onChange={handleSubdivisionChange}>
                <option value="">Select Subdivision</option>
                {selectedSubdivisions.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Certificate Type Selection */}
          {selectedSubdivision && (
            <div className="menu-item">
              <span>Certificate Types</span>
              <select
                value={certificateType}
                onChange={handleCertificateTypeChange}
              >
                <option value="">Select Certificate Type</option>
                {certificateTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          {certificateType && (
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className={`main-content ${showSidebar ? "sidebar-open" : ""}`}>
        <div className="header">
          <div>
            <span>Certificate Dashboard</span>
            <span>
              Welcome back, <b>{fullName}</b>
            </span>
          </div>
          <a href="">
            <img src="/img2.jpg" alt="Profile" />
          </a>
        </div>


        {/* Table displaying cases in selected subdivision */}
        <div className="case-info">
          <h3>Cases in {selectedSubdivision || "N/A"}</h3>
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Type of Certificate</th>
              <th>Resource Allocation</th>
              <th>Total Certificate</th>
              <th>Pending Certificate</th>
              <th>Done Certificate</th>
              <th>Free Resource</th>
              <th>Aloocate</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => (
              <tr key={caseItem._id}>
                <td>{caseItem.certificateType}</td>
                <td>{caseItem.allocation}</td>
                <td>{caseItem.totalCertificate}</td>
                <td>{caseItem.pendingCertificate}</td>
                <td>{caseItem.doneCertificate}</td>
                <td>{caseItem.freeResource}</td>
                <td>
                <select
                  value={selectedRegion[caseItem._id] || ""}
                  onChange={(e) => handleRegionChange(caseItem._id, e.target.value)}
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {handleAllocate(caseItem.freeResource)}
              </td>
              <td>
                {/* <div className="btnw"><button onClick={handleAllocate(caseItem.freeResource)} >Allocate</button></div> */}
              </td>
              </tr>
            ))
            
            }
            
          </tbody>
        </table>
        <br />
        





        {/* Table displaying Region and Service Data when 'Caste' is selected */}
        {certificateType === "Caste" && (
          <div className="case-info">
            <h3>Region & Service Data</h3>
          </div>
        )}

        {certificateType === "Caste" && (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Region Name</th>
                <th>Service Name</th>
                <th>Resource Allocated</th>
                <th>Required Resource</th>
              </tr>
            </thead>
            <tbody>
              {regionServiceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.regionName}</td>
                  <td>{data.serviceName}</td>
                  <td>{data.resourceAllocated}</td>
                  <td>{data.requiredResource }</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>

    </div>
  );
}

CertificateDashboard.propTypes = {
  admin: PropTypes.object,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      districts: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          subdivisions: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            })
          ),
        })
      ),
    })
  ),
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      certificateType: PropTypes.string.isRequired,
      allocation: PropTypes.string.isRequired,
      totalCertificate: PropTypes.string.isRequired,
      pendingCertificate: PropTypes.string.isRequired,
      doneCertificate: PropTypes.string.isRequired,
      freeResource: PropTypes.string.isRequired,
    })
  ),
};

export default CertificateDashboard;


























CertificateDashboard.propTypes = {
  admin: PropTypes.object,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      districts: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          subdivisions: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            })
          ),
        })
      ),
    })
  ),
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      certificateType: PropTypes.string.isRequired,
      allocation: PropTypes.string.isRequired,
      totalCertificate: PropTypes.string.isRequired,
      pendingCertificate: PropTypes.string.isRequired,
      doneCertificate: PropTypes.string.isRequired,
      freeResource: PropTypes.string.isRequired,
    })
  ),
};