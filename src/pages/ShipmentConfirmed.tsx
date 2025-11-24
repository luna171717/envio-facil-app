import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Eye, Home } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackingId, receiverInfo, selectedService } = location.state || {};

  if (!trackingId) {
    navigate("/dashboard");
    return null;
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">¡Envío Confirmado!</h1>
            <p className="text-muted-foreground">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Código de Seguimiento</p>
              <div className="inline-block bg-muted px-6 py-3 rounded-lg">
                <p className="text-2xl font-mono font-bold text-foreground">{trackingId}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Origen</p>
                <p className="font-medium">Monterrey, NL</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Destino</p>
                <p className="font-medium">
                  {receiverInfo?.city}, {receiverInfo?.state}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                <p className="font-medium">
                  {selectedService?.carrier} - {selectedService?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fecha Estimada de Entrega</p>
                <p className="font-medium">
                  {estimatedDate.toLocaleDateString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate(`/track/${trackingId}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver Estado
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/dashboard")}>
            <Home className="mr-2 h-4 w-4" />
            Ir al Inicio
          </Button>
        </div>

        <Card className="border-border bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">📱 Mantente informado</h3>
            <p className="text-sm text-muted-foreground">
              Recibirás actualizaciones por correo y SMS sobre el estado de tu envío. También
              puedes rastrear tu paquete en tiempo real usando el código de seguimiento.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShipmentConfirmed;
