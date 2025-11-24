import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Package } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleConfirmReceipt = () => {
    toast({
      title: "Entrega confirmada",
      description: "El paquete fue entregado correctamente",
    });
    navigate(`/rate/${id}`);
  };

  const handleReportProblem = () => {
    toast({
      title: "Reporte enviado",
      description: "Nuestro equipo se pondrá en contacto contigo pronto",
    });
    navigate("/dashboard");
  };

  return (
    <Layout title="Confirmación de Entrega">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-pink-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">Confirmación de Entrega</h1>
          <p className="text-sm text-gray-600">
            Por favor confirme la recepción de su paquete o reporte cualquier problema
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Shipment Summary */}
          <Card className="bg-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Resumen del Envío</h2>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded">
                  Entregado
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 text-xs mb-1">Número de seguimiento:</p>
                  <p className="font-semibold">{id}</p>
                </div>

                <div className="border-t border-blue-200 pt-3 mt-3">
                  <p className="font-semibold mb-2">Información del Envío</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de envío:</span>
                      <span className="font-medium">15 Ene 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de entrega:</span>
                      <span className="font-medium">18 Ene 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportista:</span>
                      <span className="font-medium">Express Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="bg-blue-100">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Dirección de Entrega</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 text-xs mb-1">Entregado a</p>
                  <p className="font-semibold">María González</p>
                  <p className="text-gray-700 mt-1">Calle Alcalá 45, 2º 4B</p>
                  <p className="text-gray-700">28001 Madrid, España</p>
                  <p className="text-gray-700 mt-2">+34 606 123 456</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package Contents */}
        <Card className="bg-blue-100 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Contenido del Paquete</h2>
            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg">
              <Package className="h-6 w-6 text-gray-600" />
              <div className="text-sm">
                <p className="font-semibold">Laptop Dell Inspiron 15</p>
                <p className="text-gray-600">Cantidad: 1 | Peso: 2.1 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <Button
            onClick={handleConfirmReceipt}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            size="lg"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Confirmar Recepción
            <span className="ml-2 text-xs">El paquete fue entregado correctamente</span>
          </Button>

          <Button
            onClick={handleReportProblem}
            variant="outline"
            className="w-full bg-blue-100 hover:bg-blue-200 border-blue-300 py-6"
            size="lg"
          >
            <AlertTriangle className="mr-2 h-5 w-5" />
            Reportar Problema
            <span className="ml-2 text-xs">Hay un problema con la entrega</span>
          </Button>
        </div>

        {/* Help Link */}
        <div className="text-center text-sm text-gray-600">
          ¿Necesita ayuda?{" "}
          <button className="text-blue-600 hover:text-blue-700 underline">
            Contacte con soporte
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryConfirmation;
