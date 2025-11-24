import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  Calculator,
} from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([
    {
      title: "Total envíos",
      value: "0",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "En camino",
      value: "0",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pendientes",
      value: "0",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Entregados",
      value: "0",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]);

  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // Efecto que se ejecuta al cargar el componente o cambiar de página
  // Llama a la función para obtener los datos del dashboard
  useEffect(() => {
    fetchDashboardData();
  }, [currentPage]);

  /**
   * Obtiene los datos del dashboard desde Supabase
   * - Métricas globales (total envíos, en tránsito, pendientes, entregados)
   * - Lista de envíos recientes del usuario con paginación
   */
  const fetchDashboardData = async () => {
    try {
      // Obtener métricas globales
      const { data: globalMetrics, error: metricsError } = await supabase
        .rpc('get_global_shipment_metrics');

      if (metricsError) throw metricsError;

      if (globalMetrics && globalMetrics.length > 0) {
        const stats = globalMetrics[0];
        setMetrics([
          {
            title: "Total envíos",
            value: stats.total_shipments?.toString() || "0",
            icon: Package,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "En camino",
            value: stats.in_transit?.toString() || "0",
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Pendientes",
            value: stats.pending?.toString() || "0",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Entregados",
            value: stats.delivered?.toString() || "0",
            icon: CheckCircle2,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
        ]);
      }

      // Obtener total de envíos del usuario para calcular páginas
      const { count, error: countError } = await supabase
        .from('shipments')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      const total = count || 0;
      setTotalPages(Math.ceil(total / itemsPerPage));

      // Obtener envíos recientes del usuario (filtrados por RLS) con paginación
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data: userShipments, error: shipmentsError } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (shipmentsError) throw shipmentsError;

      if (userShipments) {
        setRecentShipments(userShipments.map(shipment => ({
          id: shipment.tracking_id,
          destination: shipment.destination,
          status: shipment.status,
          statusColor: 
            shipment.status === "Entregado" ? "success" : 
            shipment.status === "En tránsito" ? "info" : 
            "warning",
          date: new Date(shipment.created_at).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          cost: `$${shipment.total_cost.toFixed(2)}`,
        })));
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos del dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Button 
            variant="outline" 
            className="border-gray-300"
            onClick={() => navigate("/shipment-cost")}
          >
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

            {loading ? (
              <p className="text-center text-gray-500 py-8">Cargando...</p>
            ) : recentShipments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No tienes envíos registrados</p>
            ) : (
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
                            Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && recentShipments.length > 0 && totalPages > 1 && (
              <div className="flex flex-col items-center justify-center gap-3 mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-[#2c5aa0] hover:bg-[#234a82] text-white"
                            : "border-gray-300"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
