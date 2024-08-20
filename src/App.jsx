import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { AuthProvider } from "./pages/auth/authecontext";
import SignIn from "./pages/auth/sign-in";

function App() {
  return (
    <AuthProvider>
  
    <Routes>
    <Route path="/login" element={<SignIn />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
