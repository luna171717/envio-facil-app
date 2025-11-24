import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Eye, Mail, Bell, Plus } from "lucide-react";
import Layout from "@/components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ShipmentConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageInfo, receiverInfo } = location.state || {};

  // Generar un código de seguimiento aleatorio
  const trackingId = `ESP-2025-${Math.floor(Math.random() * 1000000000)}`;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(44, 90, 160);
    doc.text("¡Envío Confirmado!", 105, 20, { align: "center" });
    
    // Subtítulo
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Su paquete ha sido registrado exitosamente en nuestro sistema", 105, 28, { align: "center" });
    
    // Código de seguimiento
    doc.setFillColor(245, 245, 247);
    doc.rect(20, 35, 170, 25, 'F');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Código de Seguimiento", 105, 42, { align: "center" });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(trackingId, 105, 52, { align: "center" });
    
    // Información del envío
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Envío", 20, 75);
    
    autoTable(doc, {
      startY: 80,
      head: [['Concepto', 'Detalles']],
      body: [
        ['Origen', 'Madrid, España'],
        ['Destino', `${receiverInfo?.city || 'Barcelona'}, ${receiverInfo?.state || 'España'}`],
        ['Fecha estimada', '15 Enero 2025'],
        ['Servicio', 'Envío Estándar'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Información del destinatario
    const finalY = (doc as any).lastAutoTable.finalY || 120;
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Información del Destinatario", 20, finalY + 10);
    
    autoTable(doc, {
      startY: finalY + 15,
      head: [['Campo', 'Información']],
      body: [
        ['Nombre', receiverInfo?.name || 'N/A'],
        ['Teléfono', receiverInfo?.phone || 'N/A'],
        ['Email', receiverInfo?.email || 'N/A'],
        ['Dirección', receiverInfo?.address || 'N/A'],
        ['Ciudad', receiverInfo?.city || 'N/A'],
        ['Estado/Provincia', receiverInfo?.state || 'N/A'],
        ['Código Postal', receiverInfo?.zipCode || 'N/A'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Detalles del paquete
    const finalY2 = (doc as any).lastAutoTable.finalY || 180;
    doc.setFontSize(12);
    doc.setTextColor(44, 90, 160);
    doc.text("Detalles del Paquete", 20, finalY2 + 10);
    
    const weight = parseFloat(packageInfo?.weight || '0');
    const WEIGHT_THRESHOLD = 15;
    const EXCESS_WEIGHT_RATE = 8.00;
    const baseRate = 50;
    const weightCharge = weight > WEIGHT_THRESHOLD ? (weight - WEIGHT_THRESHOLD) * EXCESS_WEIGHT_RATE : 0;
    const shippingCost = baseRate + weightCharge;
    const insurance = 15.00;
    const fragileCharge = packageInfo?.fragile ? 10.00 : 0;
    const subtotal = shippingCost + insurance + fragileCharge;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    
    autoTable(doc, {
      startY: finalY2 + 15,
      head: [['Detalle', 'Valor']],
      body: [
        ['Peso', `${packageInfo?.weight || '0'} kg`],
        ['Dimensiones', `${packageInfo?.length || '0'} x ${packageInfo?.width || '0'} x ${packageInfo?.height || '0'} cm`],
        ['Tipo', packageInfo?.fragile ? 'Frágil' : 'Estándar'],
        ['Valor declarado', `$${packageInfo?.value || '0'} ${packageInfo?.currency || 'USD'}`],
        ['', ''],
        ['Envío estándar', `$${shippingCost.toFixed(2)}`],
        ['Seguro de mercancía', `$${insurance.toFixed(2)}`],
        ...(packageInfo?.fragile ? [['Manejo especial', `$${fragileCharge.toFixed(2)}`]] : []),
        ['Subtotal', `$${subtotal.toFixed(2)}`],
        ['IVA (16%)', `$${iva.toFixed(2)}`],
        ['Total', `$${total.toFixed(2)}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [44, 90, 160] },
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Gracias por confiar en nosotros para su envío", 105, 280, { align: "center" });
    
    // Guardar PDF
    doc.save(`Envio-${trackingId}.pdf`);
  };

  return (
    <Layout title="Confirmación de envío">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8">
          {/* Icono de confirmación */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Envío Confirmado!</h1>
            <p className="text-sm text-gray-600">
              Su paquete ha sido registrado exitosamente en nuestro sistema
            </p>
          </div>

          {/* Código de seguimiento */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <p className="text-xs text-gray-500 text-center mb-2">Código de Seguimiento</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg py-4 px-6 text-center mb-2">
              <p className="text-xl font-bold text-gray-900 tracking-wide">{trackingId}</p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Guarde este código para rastrear su envío
            </p>
          </div>

          {/* Información del envío */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Origen</p>
              <p className="text-sm font-medium text-gray-900">Madrid, España</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha estimada</p>
              <p className="text-sm font-medium text-gray-900">15 Enero 2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Destino</p>
              <p className="text-sm font-medium text-gray-900">
                {receiverInfo?.city || "Barcelona"}, {receiverInfo?.state || "España"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Servicio</p>
              <p className="text-sm font-medium text-gray-900">Envío Estándar</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mb-6">
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={generatePDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-white"
              onClick={() => navigate("/track")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver estado del envío
            </Button>
          </div>

          {/* Notificaciones */}
          <div className="text-center text-xs text-gray-600 mb-4">
            Recibirá notificaciones por email sobre el estado de su envío
          </div>
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>Email confirmación enviado</span>
            </div>
            <div className="flex items-center gap-1">
              <Bell className="w-4 h-4" />
              <span>SMS disponible</span>
            </div>
          </div>
        </div>

        {/* Crear nuevo envío */}
        <div className="text-center mt-6">
          <Button 
            variant="link" 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => navigate("/new-shipment")}
          >
            <Plus className="mr-1 h-4 w-4" />
            Crear nuevo envío
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentConfirmed;
