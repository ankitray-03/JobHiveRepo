import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ApplicationsList from "./pages/ApplicationsList";
import Interviews from "./components/Dashboard/Interviews";
import ApplicationForm from "./components/Dashboard/ApplicationFrom";
import UpdateApplicationForm from "./components/Dashboard/UpdateApplicationForm";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ViewResume from "./pages/ViewResume";
import PasswordResetForm from "./pages/PasswordResetForm";
import NewPasswordForm from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/Profile";
import JobDescAnalyzer from "./pages/AnalyseJD";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<PasswordResetForm />} />
        <Route
          path="/reset-password/:resetToken"
          element={<NewPasswordForm />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/applications"
            element={<ApplicationsList />}
          />
          <Route path="/dashboard/interviews" element={<Interviews />} />
          <Route
            path="/dashboard/addApplication"
            element={<ApplicationForm />}
          />
          <Route
            path="/dashboard/job/:jobId"
            element={<UpdateApplicationForm />}
          />
          <Route path="/dashboard/addResume" element={<ResumeUploadPage />} />
          <Route path="/dashboard/viewResume" element={<ViewResume />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/job-desc-analyse" element={<JobDescAnalyzer />} />

          {/* 
          
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/dashboard/settings" element={<Settings />}></Route>
          
        */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
