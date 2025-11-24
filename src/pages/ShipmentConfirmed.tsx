import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Eye, Mail, Bell, Plus } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageInfo, receiverInfo } = location.state || {};

  // Generar un código de seguimiento aleatorio
  const trackingId = `ESP-2025-${Math.floor(Math.random() * 1000000000)}`;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);

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
              onClick={() => {
                // Funcionalidad para descargar PDF
              }}
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
