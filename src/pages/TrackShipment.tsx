import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Package,
  Truck,
  CheckCircle2,
  Share2,
  Download,
  Bell,
} from "lucide-react";
import Layout from "@/components/Layout";

const TrackShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(id || "");
  const [isTracking, setIsTracking] = useState(!!id);

  const handleTrack = () => {
    if (trackingId.trim()) {
      setIsTracking(true);
      navigate(`/track/${trackingId}`);
    }
  };

  const trackingHistory = [
    {
      status: "Entregado",
      location: "Ciudad de México, CDMX",
      date: "2024-11-23",
      time: "14:30",
      description: "Paquete entregado exitosamente",
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      status: "En ruta de entrega",
      location: "Ciudad de México, CDMX",
      date: "2024-11-23",
      time: "08:00",
      description: "El paquete está en camino a su destino final",
      icon: Truck,
      color: "text-primary",
    },
    {
      status: "En tránsito",
      location: "Querétaro, QRO",
      date: "2024-11-22",
      time: "16:45",
      description: "Paquete en tránsito hacia siguiente centro de distribución",
      icon: Package,
      color: "text-primary",
    },
    {
      status: "Procesando",
      location: "Monterrey, NL",
      date: "2024-11-21",
      time: "10:20",
      description: "Paquete procesado en centro de distribución",
      icon: Package,
      color: "text-muted-foreground",
    },
    {
      status: "Recogido",
      location: "Monterrey, NL",
      date: "2024-11-20",
      time: "15:00",
      description: "Paquete recogido del remitente",
      icon: MapPin,
      color: "text-muted-foreground",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seguimiento de Envío</h1>
          <p className="text-muted-foreground mt-1">
            Rastrea tu paquete en tiempo real
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa tu código de seguimiento"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                className="h-11"
              />
              <Button onClick={handleTrack} size="lg">
                <Search className="mr-2 h-4 w-4" />
                Rastrear
              </Button>
            </div>
          </CardContent>
        </Card>

        {isTracking && (
          <>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold">
                        Estado Actual
                      </h2>
                      <Badge variant="default">En tránsito</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Código de seguimiento: <span className="font-mono font-medium">{trackingId}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Etiqueta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Información del Envío</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transportista:</span>
                      <span className="font-medium">FedEx Express</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Origen:</span>
                      <span className="font-medium">Monterrey, NL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Destino:</span>
                      <span className="font-medium">Ciudad de México, CDMX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso:</span>
                      <span className="font-medium">2.5 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Servicio:</span>
                      <span className="font-medium">Express (1-2 días)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ubicación Actual</h3>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Última ubicación registrada
                      </p>
                      <p className="font-medium mt-1">Ciudad de México, CDMX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Historial de Seguimiento</h3>
                <div className="space-y-4">
                  {trackingHistory.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-success/10" : "bg-muted"
                          }`}
                        >
                          <event.icon className={`h-5 w-5 ${event.color}`} />
                        </div>
                        {index < trackingHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{event.status}</h4>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.description}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TrackShipment;
