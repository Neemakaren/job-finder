import { useState } from 'react';
import './App.css';
import { useSelector} from 'react-redux'
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import {
  About,
  AuthPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
} from "./pages";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './pages/Error';



function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}


function App() {
    const user = {}

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='/findjobs'/>} 
            />
            <Route path='/findjobs' element={<FindJobs />} />
          <Route path='/companies' element={<Companies />} />
          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />

          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />
        </Route>
        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<AuthPage />} />
        <Route path='*' element={<Error />}/>
      </Routes>
      {user && <Footer />}
    </BrowserRouter>
  )
}

export default App
