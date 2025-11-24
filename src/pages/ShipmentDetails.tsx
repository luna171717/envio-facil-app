import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import Layout from "@/components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipmentDetails();
  }, [id]);

  const fetchShipmentDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setShipment(data);
      } else {
        toast({
          title: "Error",
          description: "No se encontró el envío",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error fetching shipment:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del envío",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotifyDelivery = () => {
    navigate(`/delivery/${id}`);
  };


  const handleDownloadLabel = () => {
    if (!shipment) return;

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
    
    // Current Status
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Estado Actual", 20, 60);
    
    autoTable(doc, {
      startY: 65,
      head: [['Campo', 'Información']],
      body: [
        ['Estado', shipment.status],
        ['Última actualización', new Date(shipment.updated_at).toLocaleString('es-MX')],
        ['Destino', shipment.destination],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Package Information
    const finalY1 = (doc as any).lastAutoTable.finalY || 95;
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Paquete", 20, finalY1 + 10);
    
    autoTable(doc, {
      startY: finalY1 + 15,
      head: [['Campo', 'Valor']],
      body: [
        ['Peso', `${shipment.package_weight} kg`],
        ['Dimensiones', `${shipment.package_length} x ${shipment.package_width} x ${shipment.package_height} cm`],
        ['Valor', `$${shipment.package_value?.toFixed(2) || '0.00'}`],
        ['Descripción', shipment.package_description || 'N/A'],
        ['Frágil', shipment.is_fragile ? 'Sí' : 'No'],
        ['Tipo de servicio', shipment.service_type],
        ['Fecha de entrega prevista', shipment.estimated_delivery_date ? new Date(shipment.estimated_delivery_date).toLocaleDateString('es-MX') : 'N/A'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Sender Information
    const finalY2 = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Remitente", 20, finalY2 + 10);
    
    autoTable(doc, {
      startY: finalY2 + 15,
      head: [['Campo', 'Información']],
      body: [
        ['Nombre', shipment.recipient_name],
        ['Dirección', `${shipment.recipient_address}, ${shipment.recipient_city}, ${shipment.recipient_state} ${shipment.recipient_zip}`],
        ['País', shipment.recipient_country],
        ['Teléfono', shipment.recipient_phone || 'N/A'],
        ['Email', shipment.recipient_email || 'N/A'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Receiver Information
    const finalY3 = (doc as any).lastAutoTable.finalY || 190;
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Receptor", 20, finalY3 + 10);
    
    autoTable(doc, {
      startY: finalY3 + 15,
      head: [['Campo', 'Información']],
      body: [
        ['Nombre', 'John Smith'],
        ['Dirección', '456 Oak Street, Los Angeles, CA 90210'],
        ['Teléfono', '(555) 987-6543'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Gracias por usar nuestro servicio de envíos", 105, 280, { align: "center" });
    
    // Save PDF
    doc.save(`Etiqueta-${id}.pdf`);
  };

  const handlePrint = () => {
    // Same as download - just download the PDF
    handleDownloadLabel();
  };

  const trackingHistory = [
    {
      date: "15 de enero de 2025, 14:30",
      status: "El paquete salió de las instalaciones",
      location: "Chicago, IL",
      details: "El paquete salió de las instalaciones",
    },
    {
      date: "15 de enero de 2025, 8:45",
      status: "Procesado",
      location: "Chicago, IL",
      details: "Llegó al centro de distribución",
    },
    {
      date: "14 de enero de 2025, 18:30",
      status: "En tránsito",
      location: "Indianapolis, IN",
      details: "Paquete en tránsito",
    },
    {
      date: "13 de enero de 2025, 16:15",
      status: "Recogido",
      location: "New York, NY",
      details: "Paquete recogido del remitente",
    },
    {
      date: "13 de enero de 2025, 10:30",
      status: "Etiqueta creada",
      location: "New York, NY",
      details: "Etiqueta de envío creada",
    },
  ];

  return (
    <Layout title="Detalles del envío">
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : !shipment ? (
        <div className="text-center py-8">No se encontró el envío</div>
      ) : (
        <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/track")}>
            Seguimiento
          </span>
          <span>&gt;</span>
          <span className="text-gray-900">{id}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Detalles del envío</h1>
            <p className="text-sm text-gray-600">ID de seguimiento: {id}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/track")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al seguimiento
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Left Column - Main Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Current Status */}
            <Card className="bg-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Estado actual</h2>
                  <span className={`${shipment?.status === "Entregado" ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} text-xs font-medium px-3 py-1 rounded`}>
                    {shipment?.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Última actualización</p>
                    <p className="font-semibold">{shipment ? new Date(shipment.updated_at).toLocaleString('es-MX') : '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Destino</p>
                    <p className="font-semibold">{shipment?.destination || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Information */}
            <Card className="bg-blue-100">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Información del paquete</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Peso</p>
                    <p className="font-semibold">2.5 lbs</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tipo de paquete</p>
                    <p className="font-semibold">Caja estándar</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Dimensiones</p>
                    <p className="font-semibold">12" x 8" x 4"</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Valor</p>
                    <p className="font-semibold">$150.00</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tipo de servicio</p>
                    <p className="font-semibold">Entrega urgente</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Fecha de entrega prevista</p>
                    <p className="font-semibold">17 de enero de 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking History */}
            <Card className="bg-blue-100">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Historial de seguimiento</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="text-left py-2 font-semibold">Fecha y hora</th>
                        <th className="text-left py-2 font-semibold">Estado</th>
                        <th className="text-left py-2 font-semibold">Ubicación</th>
                        <th className="text-left py-2 font-semibold">Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackingHistory.map((event, index) => (
                        <tr key={index} className="border-b border-blue-200">
                          <td className="py-3">{event.date}</td>
                          <td className="py-3">{event.status}</td>
                          <td className="py-3">{event.location}</td>
                          <td className="py-3">{event.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sender, Receiver, Carrier */}
          <div className="space-y-4">
            {/* Sender Information */}
            <Card className="bg-blue-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm">Información del remitente</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs">Nombre</p>
                    <p className="font-medium">Tech Solutions Inc.</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Dirección</p>
                    <p className="font-medium">123 Business Ave</p>
                    <p className="font-medium">New York, NY 10001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Teléfono</p>
                    <p className="font-medium">(555) 123-1567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Receiver Information */}
            <Card className="bg-blue-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm">Información del receptor</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs">Nombre</p>
                    <p className="font-medium">John Smith</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Dirección</p>
                    <p className="font-medium">456 Oak Street</p>
                    <p className="font-medium">Los Angeles, CA 90210</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Teléfono</p>
                    <p className="font-medium">(555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carrier Information */}
            <Card className="bg-blue-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm">Compañía de transporte</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Envío rápido Express</p>
                      <p className="text-xs text-gray-600">Transporte Premium</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Tracking</p>
                    <p className="font-medium">{id}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs">Entrega urgente</span>
                    <span className="font-medium text-xs">Sí</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs">Tiempo de tránsito:</span>
                    <span className="font-medium text-xs">2-3 días hábiles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs">Seguro:</span>
                    <span className="font-medium text-xs">Incluido</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-blue-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm">Acciones</h3>
                <div className="space-y-2">
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    onClick={handleNotifyDelivery}
                    disabled={shipment?.status === "Entregado"}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {shipment?.status === "Entregado" ? "Entrega Notificada" : "Notificar Entrega"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white" 
                    size="sm"
                    onClick={handleDownloadLabel}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar etiqueta
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir seguimiento
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white" 
                    size="sm"
                    onClick={handlePrint}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      )}
    </Layout>
  );
};

export default ShipmentDetails;
