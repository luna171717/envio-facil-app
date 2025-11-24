import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewShipment from "./pages/NewShipment";
import ShipmentCost from "./pages/ShipmentCost";
import ConfirmShipment from "./pages/ConfirmShipment";
import ShipmentConfirmed from "./pages/ShipmentConfirmed";
import TrackShipment from "./pages/TrackShipment";
import DeliveryConfirmation from "./pages/DeliveryConfirmation";
import RateExperience from "./pages/RateExperience";
import ShipmentHistory from "./pages/ShipmentHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-shipment"
            element={
              <ProtectedRoute>
                <NewShipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipment-cost"
            element={
              <ProtectedRoute>
                <ShipmentCost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-shipment"
            element={
              <ProtectedRoute>
                <ConfirmShipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipment-confirmed"
            element={
              <ProtectedRoute>
                <ShipmentConfirmed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <TrackShipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track/:id"
            element={
              <ProtectedRoute>
                <TrackShipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery/:id"
            element={
              <ProtectedRoute>
                <DeliveryConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rate/:id"
            element={
              <ProtectedRoute>
                <RateExperience />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <ShipmentHistory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
