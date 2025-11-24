import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleConfirmReceipt = () => {
    toast({
      title: "Entrega confirmada",
      description: "Has confirmado la recepción del paquete correctamente",
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

  const shipmentDetails = {
    trackingId: id || "ENV-2024-001234",
    deliveryDate: "23 de noviembre, 2024",
    deliveryTime: "14:30",
    recipient: "Juan Pérez",
    address: "Av. Insurgentes 123, Col. Centro, Ciudad de México, CDMX",
    contents: [
      { item: "Documentos importantes", quantity: 1 },
      { item: "Material de oficina", quantity: 3 },
    ],
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Confirmación de Entrega</h1>
          <p className="text-muted-foreground mt-1">
            Verifica y confirma la recepción de tu envío
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Paquete Entregado</h2>
                <p className="text-sm text-muted-foreground">
                  {shipmentDetails.deliveryDate} a las {shipmentDetails.deliveryTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Detalles del Envío</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Código de seguimiento</p>
                <p className="font-mono font-medium">{shipmentDetails.trackingId}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Destinatario</p>
                <p className="font-medium">{shipmentDetails.recipient}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Dirección de entrega</p>
                <p className="font-medium">{shipmentDetails.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contenido del Paquete</h3>
            <div className="space-y-2">
              {shipmentDetails.contents.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg"
                >
                  <span className="text-sm">{item.item}</span>
                  <span className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-primary/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">¿Todo está en orden?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Por favor verifica que el contenido del paquete esté completo y en buen estado
              antes de confirmar la recepción.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <Button onClick={handleConfirmReceipt} className="w-full" size="lg">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirmar Recepción
              </Button>
              <Button
                onClick={handleReportProblem}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Reportar Problema
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border border-warning/50 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Importante</h3>
                <p className="text-sm text-muted-foreground">
                  Si encuentras algún problema con tu envío (daños, contenido faltante, etc.),
                  repórtalo de inmediato para que podamos ayudarte a resolverlo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DeliveryConfirmation;
