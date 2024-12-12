import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct component names
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './controller/navbar/Navbar';
import Footer from './controller/footer/Footer';
// import HomePage from './controller/homePage/HomePage';

import TermService from './controller/term/TermService';
import Dashboard from './controller/dashboard/Dashboard';
import Certificate from './controller/certificate/Certificate';
import Contact from './controller/contact/Contact';
import CertificateForm from './controller/certificate/CertificateForm';
import ForgotPassword from './controller/user/ForgotPassword';
import NotFound from './utility/NotFound';
import { getUserDetails, loadUsers } from './actions/userAction';
import GoogleLogin from './utility/GoogleLogin';
import Home from './controller/home/Home';
import Profile from './controller/profile/Profile';
import { SocketProvider } from './utility/SocketContext';
import EmployeeProgress from './controller/profile/EmployStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './controller/user/UserLogin';
import UserSignup from './controller/user/UserSignup';
import CastCertificate from './controller/dashboard/CastCertificate';
import IncomeCertificate from './controller/dashboard/IncomeCertificate';
import ResidentialCertificate from './controller/dashboard/ResidentalCertificate';
import MerriageCertificate from './controller/dashboard/MarriageCertificate';
import SeniorcitizenCertificate from './controller/dashboard/SeniorcitizenCertificate';
import RationcardCertificate from './controller/dashboard/RationcardCertificate';
import DisabilityCertificate from './controller/dashboard/DisabilityCertificate';
import CharacterCertificate from './controller/dashboard/CharacterCertificate';
import BirthCertificate from './controller/dashboard/BirthCertificate';
import { getAdminDetails, getReport, loadAdmin } from './actions/adminAction';
import AdminLogin from './controller/user/AdminLogin';
import ReporList from './controller/report/ReportList';
import ReportDashboard from './controller/report/ReportDashboard';
import PrivacyPolicy from './controller/term/PrivacyPolicy';
import FormCertificate from './controller/certificate/FormCertificate';
import User1Login from './controller/user/User1Login';
import CasteCertificateForm from './controller/certificate/CasteFormCertificate';
import Form from './controller/certificate/Form';
import FormNavbar from './controller/certificate/FormNavbar';
// import ReportPdf from './controller/report/ReportPdf';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadAdmin());
    dispatch(getUserDetails());
    dispatch(getAdminDetails())
    dispatch(getReport())
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.admin?.isAuthenticated || state.user?.isAuthenticated,
  }));

  const { admin} = useSelector((state) => state.admin);

  const { user} = useSelector((state) => state.user);

  const {report} = useSelector((state) => state.report);

  const title = "Hello 1";

  // console.log(report);
  

  return (
    <>
       <ToastContainer 
        position="top-center"  // This will show the toast in the center of the screen
        autoClose={3000}  // Toast will disappear after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <SpinnerLoader /> */}
      <SocketProvider>
        <Router>
          <Navbar adminProfile={admin?.data || null} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={isAuthenticated ? <Dashboard adminProfile={admin?.data || null} /> : <UserLogin /> } />
            <Route path='/certificate' element={isAuthenticated ? <Certificate /> : <UserLogin />} />
            <Route path='/certificateForm' element={<CertificateForm />} />
            <Route path='/formCertificate' element={<FormCertificate />} />

            <Route path='/profile'  element={<Profile profile={user?.data || null} adminProfile={admin?.data || null} />}/>
            <Route path='/employProgress' element={<EmployeeProgress profile={user?.data || null} adminProfile={admin?.data || null} /> } />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={!isAuthenticated ? <UserLogin /> : <Home/>} />
            <Route path='/adminLogin' element={<AdminLogin /> } />
            <Route path='/signup' element={<UserSignup />} />
            <Route path="/google-login" element={<GoogleLogin />} />
            <Route path='/forgot' element={<ForgotPassword /> } />
            <Route path='/term' element={<TermService />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/user1Login' element={<User1Login />} />
            <Route path='/formNavbar' element={<FormNavbar /> } />
            <Route path='/form' element={<Form /> } />
            <Route path='/casteForm' element={<CasteCertificateForm />} />
            <Route path='/casteCertificate' element={<CastCertificate adminProfile={admin?.data || null} />} />
            <Route path='/incomeCertificate' element={<IncomeCertificate adminProfile={admin?.data || null} />} />
            <Route path='/merriageCertificate' element={ <MerriageCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/seniorcitizenCertificate' element={ <SeniorcitizenCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/rationcardCertificate' element={ <RationcardCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/disabilityCertificate' element={ <DisabilityCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/characterCertificate' element={ <CharacterCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/birthCertificate' element={ <BirthCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/residentialCertificate' element={ <ResidentialCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/reportList' element={<ReporList title={title} />} />
            <Route path="/reportDashboard" element={<ReportDashboard adminProfile={admin?.data || null} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
