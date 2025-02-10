import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import NotificationBell from "./components/NotificationBell"; // ✅ Correct Import

function App() {
  return (
    <Router>
      <Navbar />
      <NotificationBell />  {/* ✅ Correct Placement (if standalone) */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/vendor" element={<VendorDashboardPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
