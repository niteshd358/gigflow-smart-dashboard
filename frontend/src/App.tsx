import { Routes, Route, Navigate } from "react-router-dom";

import  LoginPage from "./pages/LoginPage";
import RegisterPage  from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

import DashboardLayout  from "./layouts/DashboardLayout";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <Routes>

       {/* // PUBLIC ROUTES */}
         <Route path='/login' element={<LoginPage />} />
         <Route path='/register' element={<RegisterPage />} />

        {/* // PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Route>

        {/* // DEFAULT ROUTE */}
        <Route path='*' element={<Navigate to="/dashboard" replace/>} />

    </Routes>
      
  );
};

export default App;