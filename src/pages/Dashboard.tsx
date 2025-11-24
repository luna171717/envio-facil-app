import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  Calculator,
  Eye,
} from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Total envíos",
      value: "247",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "En camino",
      value: "18",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pendientes",
      value: "5",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Entregados",
      value: "224",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const recentShipments = [
    {
      id: "SHP-2025-001",
      destination: "New York, USA",
      status: "Entregado",
      statusColor: "success",
      date: "15 de enero de 2025",
      cost: "$45.00",
    },
    {
      id: "SHP-2025-002",
      destination: "London, UK",
      status: "En tránsito",
      statusColor: "info",
      date: "18 de enero de 2025",
      cost: "$78.50",
    },
    {
      id: "SHP-2025-003",
      destination: "Tokyo, Japan",
      status: "Aduanas",
      statusColor: "warning",
      date: "20 de enero de 2025",
      cost: "$125.00",
    },
    {
      id: "SHP-2025-004",
      destination: "Berlin, Germany",
      status: "En tránsito",
      statusColor: "info",
      date: "22 de enero de 2025",
      cost: "$67.25",
    },
    {
      id: "SHP-2025-005",
      destination: "Sydney, Australia",
      status: "Pendiente",
      statusColor: "warning",
      date: "23 de enero de 2025",
      cost: "$89.75",
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div className="flex gap-3">
          <Button 
            onClick={() => navigate("/new-shipment")} 
            className="bg-[#2c5aa0] hover:bg-[#234a82] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo envío
          </Button>
          <Button variant="outline" className="border-gray-300">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular costo
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className="bg-white border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Envíos recientes</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      ID de seguimiento
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Destino
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Costo
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment, index) => (
                    <tr 
                      key={shipment.id} 
                      className={index !== recentShipments.length - 1 ? "border-b border-gray-100" : ""}
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{shipment.id}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{shipment.destination}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={
                            shipment.statusColor === "success" ? "outline" : 
                            shipment.statusColor === "info" ? "default" : 
                            "secondary"
                          }
                          className={
                            shipment.statusColor === "success" ? "bg-green-50 text-green-700 border-green-200" :
                            shipment.statusColor === "info" ? "bg-blue-50 text-blue-700" :
                            "bg-amber-50 text-amber-700"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{shipment.date}</td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{shipment.cost}</td>
                      <td className="py-4 px-4">
                        <Button
                          variant="link"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 px-0"
                          onClick={() => navigate(`/track/${shipment.id}`)}
                        >
                          Visto
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
