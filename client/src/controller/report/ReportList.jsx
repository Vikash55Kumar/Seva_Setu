import React from 'react'
import {CgFileDocument} from 'react-icons/cg'
import "./ReportList.css"
    const ReporList = () => {

        const styles = {
            bold : { fontSize:'13px', fontWeight: 600},
            thin : {  fontSize:'11px',  color:'#6f6f6f',  fontWeight: 500 },
            btn:{ borderRadius : '3px', border:'1px solid gray', display : 'flex', alignItems :'center', gap:'2px', padding : '3px', fontSize:'11px', color:'#4f4f4f', fontWeight: 600, cursor:'pointer', userSelect:'none'}
        }

      return (
        <div className='list'>
            <div className='form-list'>
                <div className='title'>
                    <span>Caste Certificate</span>
                </div>
                <div >
                    <span>CreatedAt:28</span>
                </div>
                <div>
                    <span>Total Forms:28</span>
                    <br/>
                    <span>Pending Forms:28</span>
                    <br/>
                    <span>Processed Forms:28</span>
                    <br/>
                    <span>Rejected Forms:28</span>
                </div>
                <div >
                    <div >
                        <CgFileDocument size={14}/>
                        <span>View Image</span>
                    </div>
                </div>
            </div>
        </div>
      )
    }

    export default ReporList







// import React from "react";
// import { CgFileDocument } from "react-icons/cg";
// import { HiOutlineDownload, HiOutlinePrinter } from "react-icons/hi";
// import { FiShare2 } from "react-icons/fi";
// import "./ReportCard.css";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ReportPdf from "./ReportPdf";


// const ReporList = ({ title }) => {
//   return (
//     <div className="report">
//       <h2>Report List</h2>

//       <div className="pdf-card-container">
//         <div className="pdf-card-flex">
//           <CgFileDocument color="#90e0ef" size={20} />
//           <span className="pdf-card-bold">{title}</span>
//         </div>
//         <div className="pdf-card-thin">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
//           eligendi reiciendis fuga doloremque.
//         </div>

//         <div className="pdf-card-actions">
//           <PDFDownloadLink document={<ReportPdf />} fileName="invoice.pdf">
//             <div className="pdf-card-btn">
//               <HiOutlineDownload size={14} />
//               <span>Download</span>
//             </div>
//           </PDFDownloadLink>

//           <div className="pdf-card-btn">
//             <HiOutlinePrinter size={14} />
//             <span>Print</span>
//           </div>
//           <div className="pdf-card-btn">
//             <FiShare2 size={14} />
//             <span>Share</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReporList;
