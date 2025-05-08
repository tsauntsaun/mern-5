import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function AppContent() {
  const { user, loading } = useAuth();
  const bgColor = useColorModeValue("gray.200", "gray.700");
  if (loading) return null;
  return (
    <>
      <Box minH={"100vh"} bg={bgColor}>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster richColors posiition="top-center" expand />
    </AuthProvider>
  );
}

export default App;
