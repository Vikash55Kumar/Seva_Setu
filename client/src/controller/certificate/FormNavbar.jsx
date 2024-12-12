// import React from "react";
// import { Link } from "react-router-dom"; // For navigation
// import "./FormNavbar.css"; // Add custom styles

// const FormNavbar = ({ user, utrCode }) => {
//   return (
//     <nav className="formN">
//       <div className="formN-logo">
//         <h2>e-Certify Portal</h2>
//       </div>

//       <div className="formN-links">
//         {/* Dropdown for Certificate Types */}
//         <div className="dropdown">
//           <button className="dropdown-btn">
//             Apply for Certificate <span>&#9662;</span>
//           </button>
//           <div className="dropdown-content">
//             <Link to="/apply-caste-certificate">Caste Certificate</Link>
//             <Link to="/apply-income-certificate">Income Certificate</Link>
//             <Link to="/apply-domicile-certificate">Domicile Certificate</Link>
//           </div>
//         </div>

//         {/* Display Employee/User Icon */}
//         <div className="user-info">
//           <img
//             src={user?.avatar || "/default-avatar.png"} // User avatar or default
//             alt="User Icon"
//             className="user-icon"
//           />
//           <span>{user?.name || "Guest"}</span>
//         </div>

//         {/* Display UTR Code */}
//         <div className="utr-info">
//           <strong>UTR:</strong> <span>{utrCode || "Not Assigned"}</span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default FormNavbar;






import React from "react";
import PropTypes from "prop-types"; // For prop validation
import { Link } from "react-router-dom";
import userImg from "../../assets/project.jpeg"
import "./FormNavbar.css";

const FormNavbar = ({ user, utrCode }) => {
  const certificates = [
    { name: "Caste Certificate", path: "/form" },
    { name: "Income Certificate", path: "/apply-income-certificate" },
    { name: "Domicile Certificate", path: "/apply-domicile-certificate" },
  ];

  return (
    <nav className="formN">
      <div className="formN-logo">
        <h2>OTR Portal</h2>
      </div>

      <div className="formN-links">
        {/* Dropdown for Certificate Types */}
        <div className="dropdown" tabIndex="0" aria-label="Apply for certificates">
          <button className="dropdown-btn" aria-haspopup="true">
            Apply for Certificate <span>&#9662;</span>
          </button>
          <div className="dropdown-content">
            {certificates.map((cert) => (
              <Link key={cert.name} to={cert.path}>
                {cert.name}
              </Link>
            ))}
          </div>
        </div>

        {/* User Information */}
        <div className="user-info">
          <img
            src={userImg || ""}
            className="user-icon"
          />
          <span>{user?.name || "Guest"}</span>
        </div>

        {/* Display UTR Code */}
        <div className="utr-info">
          <strong>OTR:</strong> <span>{utrCode || "Not Assigned"}</span>
        </div>
      </div>
    </nav>
  );
};

// Prop Validation
FormNavbar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  utrCode: PropTypes.string,
};

// Default Props
FormNavbar.defaultProps = {
  user: { avatar: "/default-avatar.png", name: "Guest" },
  utrCode: "Not Assigned",
};

export default FormNavbar;
