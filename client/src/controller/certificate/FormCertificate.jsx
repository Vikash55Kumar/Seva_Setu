import React, { useState } from "react";
import "./FormCertificate.css";
import logo from "../../assets/logo.png"

const FormCertificate = () => {
  const [formData, setFormData] = useState({
    aadharNumber: "",
    dob: "",
    gender: "",
    caste:"",
    email: "",
    religion: "",
    adress: "",
    phoneNumber: "",
    motherName: "",
    fatherName: "",
    fatherOTR: "",
    motherOTR: "",
    aadharImage: null,
    documentsImage: null,
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPhoneNumber, setPopupPhoneNumber] = useState("");
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false); // State to handle OTP popup visibility
  const [disableOTR, setDisableOTR] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setDisableOTR(e.target.checked);
  };

  const handleFetch = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePopupSubmit = () => {
    console.log("Aadhar Number:", formData.aadharNumber);
    console.log("Phone Number:", popupPhoneNumber);
    closePopup();
    setIsOtpPopupVisible(true); // Open OTP popup after phone number submission
  };

  const handlePopupPhoneNumberChange = (e) => {
    setPopupPhoneNumber(e.target.value);
  };

  const handleOtpSubmit = () => {
    // Handle OTP submit logic here
    console.log("OTP Submitted for phone number:", popupPhoneNumber);
    setIsOtpPopupVisible(false); // Close OTP popup after submitting
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setIsPopupVisible(true); // Show phone number popup when form is submitted
  };

  return (
    <div className="bod">
    <div className="form-container">
      <header className="form-header">
      <div id="auth-account">
        <img src={logo} className="logoDas" alt="Logo" />
    </div>
        <h1>OTR User Registration Form</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Details</legend>
          <div className="input-group">
            <label htmlFor="aadharNumber">Aadhar Number:</label>
            <div className="input-with-button">
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                required
                maxLength="12"
                placeholder="Enter your Aadhar Number"
              />
              {/* Fetch button is disabled if Aadhar number is empty */}
              <button 
              className="btnFt"
                type="button"
                onClick={handleFetch}
                disabled={!formData.aadharNumber}
              >
                Fetch
              </button>
            </div>
          </div>


          <div className="input-container">
            <label htmlFor="email">Name :</label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your Name"
            />
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="email">Email ID:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email ID"
              />
            </div>
            <div className="input-container">
              <label htmlFor="caste">Caste:</label>
              <select
                id="caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">General</option>
                <option value="Female">OBC</option>
                <option value="Other">SC</option>
                <option value="Other">ST</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                dob="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>


          <div className="input-row">
            <div className="input-container">
              <label htmlFor="name">Mother Name:</label>
              <input
                type="mother"
                id="name"
                motherName="name"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="* Enter your Mother Name"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="father">Father Name:</label>
              <input
                id="father"
                fatherName="father"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="* Enter your Father Name"
                required
              >
              </input>
            </div>
          </div>


          <div className="input-container">
            <label htmlFor="religion">Religion:</label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              required
              placeholder="Enter your Religion"
            />
          </div>

          <div className="input-container">
            <label htmlFor="adress">Pernmanent Adress:</label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              required
              placeholder="* Enter your Adress"
            />
          </div>

        </fieldset>

        {/* <fieldset>
          <legend>OTR Details</legend>
          <h9>(* Enter at least one OTR Number) </h9>
          <br/>
          <br/>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="name">Father OTR NUMBER :</label>
              <input
                type="fatherOtr"
                id="num"
                name="name"
                value={formData.fatherOTR}
                onChange={handleChange}
                required
                placeholder="* Enter your Father OTR"
              />
            </div>

            <div className="input-container">
              <label htmlFor="name">Mother OTR NUMBER:</label>
              <input
                type="motherOtr"
                id="motherOtr"
                name="name"
                value={formData.motherOTR}
                onChange={handleChange}
                required
                placeholder="* Enter your Father OTR"
              />
            </div>

          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked />
            <label class="form-check-label" for="flexSwitchCheckDefault">If Father and Mother are not live </label>
          </div>

        </fieldset> */}

<fieldset>
            <legend>OTR Details</legend>
            <h9>(* Enter at least one OTR Number) </h9>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="fatherOTR">Father OTR NUMBER :</label>
                <input
                  type="text"
                  id="fatherOTR"
                  name="fatherOTR"
                  value={formData.fatherOTR}
                  onChange={handleChange}
                  disabled={disableOTR}
                  placeholder="Enter your Father OTR"
                />
              </div>
              <div className="input-container">
                <label htmlFor="motherOTR">Mother OTR NUMBER:</label>
                <input
                  type="text"
                  id="motherOTR"
                  name="motherOTR"
                  value={formData.motherOTR}
                  onChange={handleChange}
                  disabled={disableOTR}
                  placeholder="Enter your Mother OTR"
                />
              </div>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={disableOTR}
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                If Father and Mother are not Deceased
              </label>
            </div>
          </fieldset>



        <fieldset>
          <legend>Document Uploads</legend>

          <div className="input-container">
            <label htmlFor="aadharImage">Aadhar Card:</label>
            <input
              type="file"
              id="aadharImage"
              name="aadharImage"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="documentsImage">Caste Certificate</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="documentsImage">Income Certificate</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="documentsImage">10th Marksheet</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="documentsImage">12th Marksheet</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="documentsImage">Pan Card</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="documentsImage">Residential Certificate</label>
              <input
                type="file"
                id="documentsImage"
                name="documentsImage"
                onChange={handleFileChange}
              />
            </div>
          </div>


          <h9>(* Upload file maximum number of file )</h9>
        </fieldset>
        {/* <button type="submit">Submit</button> */}
        <button className="btn2" type="submit">
            {disableOTR ? "Register to Officer" : "Submit"}
          </button>
      </form>


      {/* Popup for Phone Number Entry */}
      {isPopupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>Enter Aadhar Linked Mobile Number:</p>
            <input
              type="text"
              value={popupPhoneNumber}
              onChange={handlePopupPhoneNumberChange}
              required
              maxLength="10"
              placeholder="Enter your phone number"
            />
            <br/><br/>
            <button className="btnFt" onClick={handlePopupSubmit}>Submit</button>
          </div>
        </div>
      )}

      {/* OTP Popup after Form Submit */}
      {isOtpPopupVisible && (
        <div className="popup-overlay" onClick={() => setIsOtpPopupVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>Enter OTP sent to your Mobile Number:</p>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              maxLength="6" // Typically OTPs are 6 digits
            />
            <br/><br/>
            <button onClick={handleOtpSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FormCertificate;
