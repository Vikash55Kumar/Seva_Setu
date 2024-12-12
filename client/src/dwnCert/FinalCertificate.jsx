import React from "react";
import logo1 from "../assets/logo1.jpeg"
import untitled from "../assets/Untitled 1.png"
import profile from "../assets/we.jpg"

const FinalCertificate = () => {
  return (
    <div>
          <style>
        {`
          table, tr, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          td h4 {
            margin: 0;
            padding: 0;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
          }
          td h5 {
            font-family: Arial, Helvetica, sans-serif;
          }
          p span {
            font-weight: 700;
          }
        `}
      </style>

      <table align="center">
        <tr>
          <td height="80px" width="120px" align="center">
            <img src={logo1} height="80px" width="120px" alt="" />
          </td>
          <td height="80px" width="700px" colSpan="2" valign="top">
            <br />
            <h4>REVENUE DEPARTMENT, GOVT OF NCT OF DELHI</h4>
            <h4>OFFICE OF THE DISTRICT MAGISTRATE</h4>
            <h4>NORTH EAST DISTRICT</h4>
          </td>
        </tr>
        <tr>
          <td colSpan="3" height="40px" width="800px">
            <h4>OBC CERTIFICATE</h4>
            <h4>For applying for application to Posts under the Government of India</h4>
          </td>
        </tr>
        <tr style={{ border: "1px solid black" }}>
          <td colSpan="3" height="600px" width="800px" valign="top" style={{ borderBottomColor: "white" }}>
            <table style={{ border: "none" }}>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} height="80px" width="100px">
                  <img src={untitled}  height="80px" width="100px" alt="" />
                </td>
                <td style={{ border: "none" }} height="80px" width="600px">
                  <h5>CERTIFICATE NO: 11258521445</h5>
                </td>
                <td style={{ border: "none", padding: "10px" }} height="80px" width="100px">
                  <img src={profile} height="80px" width="100px" alt="" />
                </td>
              </tr>
            </table>
            <p style={{ margin: "60px", fontSize: "14px", textAlign: "justify", fontFamily: "Arial, Helvetica, sans-serif" }}>
              This is to certify that <span style={{ fontWeight: "700" }}>PRIYANKA RANI</span> D/o <span style={{ fontWeight: "700" }}>MUKESH KUMAR</span> R/o <span style={{ fontWeight: "700" }}>
                C-90 GALI NO-03 BHAJANPURA DELHI 110053 INDIA
              </span> belongs to the <span style={{ fontWeight: "700" }}>NAI</span> community and is recognized as Other Backward Class under the Government of India, Ministry of Social Justice and Empowerment.
              <br />
              <br />
              <span style={{ fontWeight: "700" }}>PRIYANKA RANI</span> and her family ordinarily reside at <span style={{ fontWeight: "700" }}>
                C-90 GALI NO-03 BHAJANPURA DELHI 110053 INDIA
              </span>
              <br />
              <br />
              This certificate is issued on the basis of OBC certificate issued to <span style={{ fontWeight: "700" }}>PRIYANKA</span> SELF of <span style={{ fontWeight: "700" }}>PRIYANKA RANI</span> R/o <span style={{ fontWeight: "700" }}>
                C-90 GALI NO-03 BHAJANPURA DELHI 110053 INDIA
              </span> belongs to the <span style={{ fontWeight: "700" }}>NAI</span> community of <span style={{ fontWeight: "700" }}>DELHI</span> State wide certificate no <span style={{ fontWeight: "700" }}>36968</span> dated <span style={{ fontWeight: "700" }}>09/04/2008</span> issued by the <span style={{ fontWeight: "700" }}>TEHSILDAR NORTH EAST DISTRICT</span>.
              <br />
              <br />
              This is also certify that she does not belong to the person/sections (Creamy layer) mentioned in column 3 of the Schedule to the Government of India, Department of Personnel & Training O.M. No. 36012/22/93-Esst(SCT), 36033/3/2004-Esst(RES), 36033/1/2013-ESST(RES) dated 8/9/2004 & 14/10/2008 and 27/5/2013 respectively.
            </p>

            <h5 style={{ marginTop: "100px", marginRight: "60px", textAlign: "right" }}>
              Digitally Signed By <span style={{ fontWeight: "700" }}>RAJESH DHAWAL</span>
              <br />
              TEHSILDAR
              <br />
              2024.12.09 18:35:16
            </h5>
          </td>
        </tr>
        <tr>
          <td colSpan="2" height="100px" width="800px" style={{ border: "none", borderColor: "white" }}>
            <ol type="1" style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "14px", margin: "30px", textAlign: "justify", lineHeight: "20px" }}>
              <li>This certificate is valid as per Information Technology Act 2000 as amended from time to time.</li>
              <li>The Authenticity of the document should be verified at http://edistrict.delhigovt.nic.in. Any discrepancy in this document when compared to those available on the website renders it invalid.</li>
              <li>The onus of checking the legitimacy is on the users of the document.</li>
              <li>In case of any discrepancy, please inform the authority issuing this certificate.</li>
              <li>The Non-creamy layer status of the applicant has been certified based on the self-declaration provided by the applicant to this effect.</li>
            </ol>
          </td>
        </tr>
      </table>
      <button onClick={() => window.print()} style={{width:'300px'}}>Download Certificate</button>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    </div>
  );
};

export default FinalCertificate;
