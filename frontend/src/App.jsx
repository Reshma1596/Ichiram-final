import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import WelcomeFlow from "./pages/WelcomeFlow.jsx";
import Content from "./pages/Content";
import Menu from "./pages/Menu.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import CartReview from "./pages/CartReview.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import { getGuestFromLocal } from "./utils/storage";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { getAdminSession } from "./utils/storage";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminMenu from "./pages/AdminMenu.jsx";  

function ProtectedRoute({ children }) {
  const guest = getGuestFromLocal();

  if (!guest.name || !guest.phone) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminProtectedRoute({ children }) {
  const admin = getAdminSession();

  if (!admin.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/admin-login" && location.pathname !== "/admin";

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<WelcomeFlow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminPage />
    </AdminProtectedRoute>
  }
/>
        <Route path="/home" element={<Content />} />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aboutus"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartReview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/orders"
  element={
    <AdminProtectedRoute>
      <AdminOrders />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/menu"
  element={
    <AdminProtectedRoute>
      <AdminMenu />
    </AdminProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;