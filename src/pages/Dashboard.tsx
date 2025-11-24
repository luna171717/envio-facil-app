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
  Search,
  Eye,
  History,
} from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Total de Envíos",
      value: "1,234",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "En Camino",
      value: "48",
      icon: TrendingUp,
      color: "text-info",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pendientes",
      value: "12",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Entregados",
      value: "1,174",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-green-50",
    },
  ];

  const recentShipments = [
    {
      id: "ENV-2024-001234",
      destination: "Ciudad de México, CDMX",
      status: "En camino",
      statusColor: "info",
      date: "2024-11-20",
      cost: "$450.00",
    },
    {
      id: "ENV-2024-001233",
      destination: "Guadalajara, JAL",
      status: "Pendiente",
      statusColor: "warning",
      date: "2024-11-20",
      cost: "$320.00",
    },
    {
      id: "ENV-2024-001232",
      destination: "Monterrey, NL",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-19",
      cost: "$380.00",
    },
    {
      id: "ENV-2024-001231",
      destination: "Puebla, PUE",
      status: "En camino",
      statusColor: "info",
      date: "2024-11-19",
      cost: "$290.00",
    },
    {
      id: "ENV-2024-001230",
      destination: "Tijuana, BC",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-18",
      cost: "$560.00",
    },
  ];

  const getStatusVariant = (color: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      info: "default",
      warning: "secondary",
      success: "outline",
    };
    return variants[color] || "default";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona y monitorea todos tus envíos
            </p>
          </div>
          <Button size="lg" onClick={() => navigate("/new-shipment")} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Envío
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-xl`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Envíos Recientes</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/history")}>
                <History className="mr-2 h-4 w-4" />
                Ver Todo
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      ID de Seguimiento
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Destino
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Estado
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Costo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-foreground">{shipment.id}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">{shipment.destination}</td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(shipment.statusColor)}>
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{shipment.date}</td>
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{shipment.cost}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/track/${shipment.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/track/${shipment.id}`)}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
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
