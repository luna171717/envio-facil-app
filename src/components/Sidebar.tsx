import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Truck,
  LayoutDashboard,
  Plus,
  Search,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/new-shipment", label: "Nuevo envío", icon: Plus },
    { path: "/track", label: "Seguimiento", icon: Search },
    { path: "/history", label: "Historial", icon: History },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
          isOpen ? "w-64" : "w-0 md:w-16"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2c5aa0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Sistema de Gestión
                  <br />
                  de Envíos
                </span>
              </div>
            )}
            {!isOpen && (
              <div className="w-8 h-8 bg-[#2c5aa0] rounded-lg flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 transition-colors",
                  isActive(item.path)
                    ? "bg-[#2c5aa0] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-4 bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-all z-50",
          isOpen ? "left-60" : "left-4 md:left-12"
        )}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
