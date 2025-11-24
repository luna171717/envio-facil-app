import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Check, Circle } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentCost = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [serviceType, setServiceType] = useState("");

  const services = [
    {
      id: "fedex-ground",
      name: "FedEx Ground",
      subtitle: "Envío terrestre confiable",
      days: "3-5 Days",
      price: 24.99,
      recommended: true,
      deliveryDate: "Para el 18 de enero de 2025",
    },
    {
      id: "fedex-express",
      name: "FedEx Express",
      subtitle: "Sugerida día hábil",
      days: "1 Day",
      price: 89.99,
      deliveryDate: "Para el 16 de enero de 2025",
    },
    {
      id: "ups-ground",
      name: "UPS Ground",
      subtitle: "Entrega terrestre estándar",
      days: "4-6 Days",
      price: 22.50,
      deliveryDate: "Para el 18 de enero de 2025",
    },
  ];

  const baseFee = 19.99;
  const fuelSurcharge = 2.50;
  const insurance = 2.50;
  const total = 24.99;

  return (
    <Layout title="Presupuesto de coste y entrega">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Shipment Summary */}
          <div className="space-y-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4 text-blue-900">Shipment Summary</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Desde</label>
                    <Input
                      placeholder="Escribe el lugar de emisión"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Hasta</label>
                    <Input
                      placeholder="Escribe el lugar de destino"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4 text-blue-900">Detalles de paquete</h2>
                
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Paquete</label>
                  <Input
                    placeholder="Escribe los detalles del paquete"
                    value={packageDetails}
                    onChange={(e) => setPackageDetails(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Service Type and Options */}
          <div className="space-y-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4 text-blue-900">Tipo de servicio</h2>
                
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecciona el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="overnight">Nocturno</SelectItem>
                  </SelectContent>
                </Select>

                {/* Recommended Option */}
                <div className="mt-4 bg-white rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                          RECOMENDADO
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold text-sm">FedEx Ground</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Envío terrestre confiable</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-2xl">${total.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">Costo total</p>
                    </div>
                    <div>
                      <p className="font-semibold">3-5 Days</p>
                      <p className="text-xs text-gray-600">Entrega estimada</p>
                      <p className="text-xs text-gray-500">{services[0].deliveryDate}</p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mt-4 space-y-2 text-sm">
                  <h3 className="font-semibold">Desglose de costos</h3>
                  <div className="flex justify-between text-gray-700">
                    <span>Tarifa base de envío</span>
                    <span>${baseFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Recargo por combustible</span>
                    <span>${fuelSurcharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Seguro (opcional)</span>
                    <span>${insurance.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Other Options */}
                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold text-sm">Otras opciones disponibles</h3>
                  
                  {services.slice(1).map((service) => (
                    <div key={service.id} className="bg-blue-100 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-3 w-3 text-gray-600" />
                            <span className="font-medium text-sm">{service.name}</span>
                          </div>
                          <p className="text-xs text-gray-600">{service.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${service.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-600">{service.days}</p>
                        <p className="text-xs text-gray-500">{service.deliveryDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Order Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/new-shipment")}
            >
              <Check className="mr-2 h-4 w-4" />
              Crear Pedido
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentCost;
