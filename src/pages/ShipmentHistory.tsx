import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Download, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const allShipments = [
    {
      id: "ENV-2024-001234",
      destination: "Ciudad de México, CDMX",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-23",
      cost: "$450.00",
    },
    {
      id: "ENV-2024-001233",
      destination: "Guadalajara, JAL",
      status: "En camino",
      statusColor: "info",
      date: "2024-11-22",
      cost: "$320.00",
    },
    {
      id: "ENV-2024-001232",
      destination: "Monterrey, NL",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-21",
      cost: "$380.00",
    },
    {
      id: "ENV-2024-001231",
      destination: "Puebla, PUE",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-20",
      cost: "$290.00",
    },
    {
      id: "ENV-2024-001230",
      destination: "Tijuana, BC",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-19",
      cost: "$560.00",
    },
    {
      id: "ENV-2024-001229",
      destination: "Cancún, QROO",
      status: "Cancelado",
      statusColor: "destructive",
      date: "2024-11-18",
      cost: "$480.00",
    },
    {
      id: "ENV-2024-001228",
      destination: "Mérida, YUC",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-17",
      cost: "$410.00",
    },
    {
      id: "ENV-2024-001227",
      destination: "León, GTO",
      status: "Entregado",
      statusColor: "success",
      date: "2024-11-15",
      cost: "$330.00",
    },
  ];

  const getStatusVariant = (color: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      info: "default",
      warning: "secondary",
      success: "outline",
      destructive: "destructive",
    };
    return variants[color] || "default";
  };

  const filteredShipments = allShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      shipment.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historial de Envíos</h1>
          <p className="text-muted-foreground mt-1">
            Consulta todos tus envíos anteriores
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="en camino">En camino</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fechas</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Todos los Envíos
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredShipments.length} envíos encontrados
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
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
                  {filteredShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-foreground">
                          {shipment.id}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">
                        {shipment.destination}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(shipment.statusColor)}>
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {shipment.date}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-foreground">
                        {shipment.cost}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/track/${shipment.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredShipments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron envíos con los filtros seleccionados
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShipmentHistory;
