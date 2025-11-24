import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Zap, Check } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentCost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageInfo, receiverInfo } = location.state || {};

  const services = [
    {
      id: "fedex-standard",
      carrier: "FedEx",
      name: "Standard",
      icon: Package,
      time: "3-5 días hábiles",
      price: 285,
      features: ["Rastreo incluido", "Seguro básico", "Sin firma requerida"],
    },
    {
      id: "ups-express",
      carrier: "UPS",
      name: "Express",
      icon: Truck,
      time: "1-2 días hábiles",
      price: 420,
      features: ["Rastreo en tiempo real", "Seguro completo", "Firma requerida"],
      popular: true,
    },
    {
      id: "dhl-priority",
      carrier: "DHL",
      name: "Priority Overnight",
      icon: Zap,
      time: "Entrega al día siguiente",
      price: 650,
      features: [
        "Rastreo premium",
        "Seguro extendido",
        "Entrega garantizada",
        "Manejo prioritario",
      ],
    },
  ];

  const handleSelectService = (service: typeof services[0]) => {
    navigate("/confirm-shipment", {
      state: {
        packageInfo,
        receiverInfo,
        selectedService: service,
      },
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Opciones de Envío</h1>
          <p className="text-muted-foreground mt-1">
            Selecciona el servicio que mejor se adapte a tus necesidades
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles del Envío</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Origen</p>
                <p className="font-medium">Tu dirección registrada</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Destino</p>
                <p className="font-medium">
                  {receiverInfo?.city}, {receiverInfo?.state}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Dimensiones</p>
                <p className="font-medium">
                  {packageInfo?.length} x {packageInfo?.width} x {packageInfo?.height} cm
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Peso</p>
                <p className="font-medium">{packageInfo?.weight} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`border-border hover:shadow-lg transition-all cursor-pointer ${
                service.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {service.carrier} - {service.name}
                        </h3>
                        {service.popular && (
                          <Badge variant="default" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.time}</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-success" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-foreground">
                        ${service.price}
                      </p>
                      <p className="text-sm text-muted-foreground">MXN</p>
                    </div>
                    <Button
                      onClick={() => handleSelectService(service)}
                      className="w-full md:w-auto"
                      variant={service.popular ? "default" : "outline"}
                    >
                      Seleccionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentCost;
