import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Package,
  Truck,
  CheckCircle2,
  Share2,
  Download,
  Bell,
  Clock,
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
      status: "Paquete Recogido",
      location: "Madrid, España",
      date: "15 Enero 2025, 09:30",
      time: "Centro de Recogida, Madrid",
      completed: true,
    },
    {
      status: "En Tránsito",
      location: "Santa Iria, Barcelona",
      date: "15 Enero 2025, 14:20",
      time: "Santa Iria, Barcelona",
      completed: true,
    },
    {
      status: "En Reparto",
      location: "Centro de Distribución Barcelona",
      date: "16 Enero 2025, 08:15",
      time: "Centro de Distribución Barcelona",
      completed: false,
      current: true,
    },
    {
      status: "Entregado",
      location: "Residencia de Entrega",
      date: "Estimado: 16 Enero 2025",
      time: "Residencia de Entrega",
      completed: false,
    },
  ];

  return (
    <Layout title="Seguimiento de Envíos">
      <div className="space-y-4">
        {/* Search Bar */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa tu código de seguimiento (ej: TRK123456789)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                className="flex-1"
              />
              <Button onClick={handleTrack} className="bg-blue-600 hover:bg-blue-700">
                Rastrear
              </Button>
            </div>
          </CardContent>
        </Card>

        {isTracking && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Left Column - Main Info */}
            <Card className="md:col-span-2 bg-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Información del Envío</h2>
                  <span className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded">
                    En Tránsito
                  </span>
                </div>

                {/* Shipment Details Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Código de Seguimiento</p>
                    <p className="font-semibold">TRK123456789</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Fecha de Envío</p>
                    <p className="font-semibold">15 Enero 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Origen</p>
                    <p className="font-semibold">Madrid, España</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Destino</p>
                    <p className="font-semibold">Barcelona, España</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Estado del Envío</h3>
                  <div className="space-y-0">
                    {trackingHistory.map((event, index) => (
                      <div key={index} className="flex gap-3 relative">
                        {/* Icon */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              event.completed
                                ? "bg-orange-500"
                                : event.current
                                ? "bg-gray-400"
                                : "bg-gray-300"
                            }`}
                          >
                            {event.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            ) : event.current ? (
                              <Clock className="h-4 w-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          {index < trackingHistory.length - 1 && (
                            <div className={`w-0.5 h-12 ${event.completed ? 'bg-orange-500' : 'bg-gray-300'}`} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-3">
                          <h4 className="font-semibold text-sm">{event.status}</h4>
                          <p className="text-xs text-gray-600">{event.date}</p>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Map */}
              <Card className="bg-blue-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-sm">Ubicación Actual</h3>
                  <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Mapa de Seguimiento</p>
                      <p className="text-xs text-gray-600 font-medium">Barcelona, España</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Details */}
              <Card className="bg-blue-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-sm">Detalles de Entrega</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiempo Estimado:</span>
                      <span className="font-medium">2-4 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportista:</span>
                      <span className="font-medium">Express Delivery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="font-medium">Estándar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-blue-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-sm">Acciones</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-white" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificar Entrega
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Etiqueta
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir Seguimiento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackShipment;
