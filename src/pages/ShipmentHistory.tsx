import { useState, useEffect } from "react";
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
import { Search, Download, Filter, RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ShipmentHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allShipments, setAllShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Efecto que carga los envíos al montar el componente
  useEffect(() => {
    fetchShipments();
  }, []);

  /**
   * Obtiene todos los envíos del usuario autenticado desde Supabase
   * Los ordena por fecha de creación (más recientes primero)
   */
  const fetchShipments = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para ver tu historial",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAllShipments(data || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los envíos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Genera y descarga un PDF con los detalles de un envío específico
   * @param shipment - Objeto con toda la información del envío
   */
  const handleDownloadPDF = (shipment: any) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(44, 90, 160);
    doc.text("Detalles del Envío", 105, 20, { align: "center" });
    
    // Tracking ID
    doc.setFillColor(245, 245, 247);
    doc.rect(20, 30, 170, 20, 'F');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("ID de seguimiento", 105, 37, { align: "center" });
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(shipment.tracking_id, 105, 45, { align: "center" });
    
    // Shipment Information
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Envío", 20, 60);
    
    autoTable(doc, {
      startY: 65,
      head: [['Campo', 'Información']],
      body: [
        ['ID de seguimiento', shipment.tracking_id],
        ['Origen', shipment.origin],
        ['Destino', shipment.destination],
        ['Estado', shipment.status],
        ['Fecha', format(new Date(shipment.created_at), 'dd/MM/yyyy')],
        ['Costo Total', `$${shipment.total_cost.toFixed(2)}`],
        ['Destinatario', shipment.recipient_name],
        ['Dirección', `${shipment.recipient_address}, ${shipment.recipient_city}, ${shipment.recipient_state} ${shipment.recipient_zip}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Gracias por usar nuestro servicio de envíos", 105, 280, { align: "center" });
    
    // Save PDF
    doc.save(`Envio-${shipment.tracking_id}.pdf`);
  };

  /**
   * Restaura todos los filtros a sus valores por defecto
   */
  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("");
    setCurrentPage(1);
  };

  /**
   * Devuelve las clases CSS para colorear el badge según el estado del envío
   * @param status - Estado del envío (Entregado, En tránsito, Aduanas, Pendiente)
   * @returns String con las clases de Tailwind CSS
   */
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Entregado": "bg-green-100 text-green-700",
      "En tránsito": "bg-blue-100 text-blue-700",
      "Aduanas": "bg-orange-100 text-orange-700",
      "Pendiente": "bg-yellow-100 text-yellow-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const filteredShipments = allShipments.filter((shipment) => {
    const matchesSearch =
      shipment.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipient_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;

    const matchesDate = !dateFilter || format(new Date(shipment.created_at), 'yyyy-MM-dd') === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedShipments = filteredShipments.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout title="Historial de envíos">
        <div className="text-center py-8">Cargando...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Historial de envíos">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">
            Consulta y gestiona tus envíos anteriores
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Busqueda por código de seguimiento, nombre del cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Entregado">Entregado</SelectItem>
                  <SelectItem value="En tránsito">En tránsito</SelectItem>
                  <SelectItem value="Aduanas">Aduanas</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="mm/dd/yyyy"
                className="w-full md:w-[150px]"
              />

              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>

              <Button variant="outline" onClick={handleReset}>
                Restaurar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Envíos recientes</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      ID de seguimiento
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Destino
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Estado
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Costo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedShipments.map((shipment, index) => (
                    <tr
                      key={shipment.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">
                        {shipment.tracking_id}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {shipment.destination}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {format(new Date(shipment.created_at), 'dd/MM/yyyy')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        ${shipment.total_cost.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => handleDownloadPDF(shipment)}
                        >
                          Ver detalles
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredShipments.length)} de {filteredShipments.length} resultados
                <Download className="inline ml-2 h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-blue-600" : ""}
                    >
                      {page}
                    </Button>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No se encontraron envíos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShipmentHistory;
