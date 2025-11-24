import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const ConfirmShipment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageInfo, receiverInfo, selectedService } = location.state || {};

  const subtotal = selectedService?.price || 0;
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleConfirm = () => {
    const trackingId = `ENV-2024-${Math.floor(Math.random() * 900000 + 100000)}`;
    
    toast({
      title: "¡Envío confirmado!",
      description: `Tu envío ha sido procesado correctamente`,
    });

    navigate("/shipment-confirmed", {
      state: {
        trackingId,
        packageInfo,
        receiverInfo,
        selectedService,
        total,
      },
    });
  };

  if (!selectedService) {
    navigate("/dashboard");
    return null;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Confirmar Envío</h1>
          <p className="text-muted-foreground mt-1">
            Revisa los detalles antes de confirmar tu pedido
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Información del Remitente</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Nombre:</span> Tu Empresa S.A.
                  </p>
                  <p>
                    <span className="text-muted-foreground">Dirección:</span> Av. Principal 123,
                    Col. Centro
                  </p>
                  <p>
                    <span className="text-muted-foreground">Ciudad:</span> Monterrey, NL 64000
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Información del Destinatario</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Nombre:</span> {receiverInfo?.name}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Teléfono:</span> {receiverInfo?.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span> {receiverInfo?.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Dirección:</span>{" "}
                    {receiverInfo?.address}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Ciudad:</span> {receiverInfo?.city},{" "}
                    {receiverInfo?.state} {receiverInfo?.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Detalles del Paquete</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Dimensiones:</span>{" "}
                    {packageInfo?.length} x {packageInfo?.width} x {packageInfo?.height} cm
                  </p>
                  <p>
                    <span className="text-muted-foreground">Peso:</span> {packageInfo?.weight} kg
                  </p>
                  <p>
                    <span className="text-muted-foreground">Valor declarado:</span> $
                    {packageInfo?.value} MXN
                  </p>
                  {packageInfo?.fragile && (
                    <p className="text-warning font-medium">⚠️ Objeto frágil</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Servicio Seleccionado</h2>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">
                      {selectedService.carrier} - {selectedService.name}
                    </p>
                    <p className="text-lg font-bold">${selectedService.price}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedService.time}</p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (16%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)} MXN</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Método de Pago</h2>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tarjeta terminada en 4242</p>
                    <p className="text-xs text-muted-foreground">Visa - Vence 12/26</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/50">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Tiempo Estimado</h2>
                <p className="text-sm text-muted-foreground">
                  Tu paquete llegará en: <span className="font-semibold text-foreground">{selectedService.time}</span>
                </p>
              </CardContent>
            </Card>

            <Button onClick={handleConfirm} className="w-full" size="lg">
              Confirmar Envío
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmShipment;
