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
import { Truck, Circle } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentCost = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [serviceType, setServiceType] = useState("");

  return (
    <Layout title="Presupuesto de coste y entrega">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Shipment Summary */}
            <Card className="bg-blue-100 border-0">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Shipment Summary</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Desde</label>
                    <Input
                      placeholder="Escribe el lugar de emisión"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Hasta</label>
                    <Input
                      placeholder="Escribe el lugar de destino"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-white border-gray-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card className="bg-blue-100 border-0">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Detalles de paquete</h2>
                
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Paquete</label>
                  <Input
                    placeholder="Escribe los detalles del paquete"
                    value={packageDetails}
                    onChange={(e) => setPackageDetails(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card className="bg-blue-100 border-0">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Tipo de servicio</h2>
                
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="bg-white border-gray-200 mb-4">
                    <SelectValue placeholder="Selecciona el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="overnight">Nocturno</SelectItem>
                  </SelectContent>
                </Select>

                {/* Recommended Service */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded mb-2">
                        RECOMENDADO
                      </span>
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold text-sm">FedEx Ground</span>
                      </div>
                      <p className="text-xs text-gray-500">Envío terrestre confiable</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <p className="text-2xl font-bold">$24.99</p>
                      <p className="text-xs text-gray-500">Costo total</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">3-5 Days</p>
                      <p className="text-xs text-gray-500">Entrega estimada</p>
                      <p className="text-xs text-gray-400">Para el 18 de enero de 2025</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 text-sm">
                    <h3 className="font-semibold mb-3">Desglose de costos</h3>
                    <div className="flex justify-between text-gray-700">
                      <span>Tarifa base de envío</span>
                      <span>$19.99</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Recargo por combustible</span>
                      <span>$2.50</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Seguro (opcional)</span>
                      <span>$2.50</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$24.99</span>
                    </div>
                  </div>
                </div>

                {/* Other Options */}
                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-sm">Otras opciones disponibles</h3>
                  
                  {/* FedEx Express */}
                  <div className="bg-blue-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-gray-400 fill-transparent" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-3 w-3 text-gray-600" />
                          <span className="font-medium text-sm">FedEx Express</span>
                        </div>
                        <p className="text-xs text-gray-600">Sugerida día hábil</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$89.99</p>
                      <p className="text-xs text-gray-600">1 Day</p>
                      <p className="text-xs text-gray-500">Para el 16 de enero de 2025</p>
                    </div>
                  </div>

                  {/* UPS Ground */}
                  <div className="bg-blue-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-gray-400 fill-transparent" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-3 w-3 text-gray-600" />
                          <span className="font-medium text-sm">UPS Ground</span>
                        </div>
                        <p className="text-xs text-gray-600">Entrega terrestre estándar</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$22.50</p>
                      <p className="text-xs text-gray-600">4-6 Days</p>
                      <p className="text-xs text-gray-500">Para el 18 de enero de 2025</p>
                    </div>
                  </div>
                </div>

                {/* Create Order Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/new-shipment")}
                >
                  Crear Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentCost;
