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
import { Truck, Check } from "lucide-react";
import Layout from "@/components/Layout";

const ShipmentCost = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [selectedService, setSelectedService] = useState("fedex-ground");

  const services = {
    "fedex-ground": {
      name: "FedEx Ground",
      subtitle: "Envío terrestre confiable",
      days: "3-5 Days",
      baseFee: 19.99,
      fuelSurcharge: 2.50,
      insurance: 2.50,
      deliveryDate: "Para el 18 de enero de 2025",
    },
    "fedex-express": {
      name: "FedEx Express",
      subtitle: "Sugerida día hábil",
      days: "1 Day",
      baseFee: 85.00,
      fuelSurcharge: 3.99,
      insurance: 1.00,
      deliveryDate: "Para el 16 de enero de 2025",
    },
    "ups-ground": {
      name: "UPS Ground",
      subtitle: "Entrega terrestre estándar",
      days: "4-6 Days",
      baseFee: 18.00,
      fuelSurcharge: 2.50,
      insurance: 2.00,
      deliveryDate: "Para el 18 de enero de 2025",
    },
  };

  const currentService = services[selectedService as keyof typeof services];
  const total = currentService.baseFee + currentService.fuelSurcharge + currentService.insurance;

  return (
    <Layout title="Presupuesto de coste y entrega">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Top Row - Summary and Package Details */}
        <div className="grid md:grid-cols-2 gap-4">
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

        {/* Service Type Section - Full Width */}
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

            {/* Recommended Service - FedEx Ground */}
            <div 
              className={`bg-white rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                selectedService === 'fedex-ground' ? 'ring-2 ring-orange-400' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedService('fedex-ground')}
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  {selectedService === 'fedex-ground' ? (
                    <Check className="w-3 h-3 text-orange-600" />
                  ) : (
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
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

              {selectedService === 'fedex-ground' && (
                <>
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Costo total</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">3-5 Days</p>
                      <p className="text-xs text-gray-500">Entrega estimada</p>
                      <p className="text-xs text-gray-400">{currentService.deliveryDate}</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 text-sm">
                    <h3 className="font-semibold mb-3">Desglose de costos</h3>
                    <div className="flex justify-between text-gray-700">
                      <span>Tarifa base de envío</span>
                      <span>${currentService.baseFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Recargo por combustible</span>
                      <span>${currentService.fuelSurcharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Seguro (opcional)</span>
                      <span>${currentService.insurance.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Other Options */}
            <div className="space-y-2 mb-4">
              <h3 className="font-semibold text-sm">Otras opciones disponibles</h3>
              
              {/* FedEx Express */}
              <div 
                className={`bg-blue-200 rounded-lg p-3 cursor-pointer transition-all ${
                  selectedService === 'fedex-express' ? 'ring-2 ring-blue-500' : 'hover:bg-blue-300'
                }`}
                onClick={() => setSelectedService('fedex-express')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {selectedService === 'fedex-express' ? (
                        <Check className="w-4 h-4 text-blue-700" />
                      ) : (
                        <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-3 w-3 text-gray-600" />
                        <span className="font-medium text-sm">FedEx Express</span>
                      </div>
                      <p className="text-xs text-gray-600">Sugerida día hábil</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(services['fedex-express'].baseFee + services['fedex-express'].fuelSurcharge + services['fedex-express'].insurance).toFixed(2)}</p>
                    <p className="text-xs text-gray-600">1 Day</p>
                    <p className="text-xs text-gray-500">Para el 16 de enero de 2025</p>
                  </div>
                </div>

                {selectedService === 'fedex-express' && (
                  <div className="mt-3 pt-3 border-t space-y-2 text-sm">
                    <h3 className="font-semibold mb-3">Desglose de costos</h3>
                    <div className="flex justify-between text-gray-700">
                      <span>Tarifa base de envío</span>
                      <span>${services['fedex-express'].baseFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Recargo por combustible</span>
                      <span>${services['fedex-express'].fuelSurcharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Seguro (opcional)</span>
                      <span>${services['fedex-express'].insurance.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(services['fedex-express'].baseFee + services['fedex-express'].fuelSurcharge + services['fedex-express'].insurance).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* UPS Ground */}
              <div 
                className={`bg-blue-200 rounded-lg p-3 cursor-pointer transition-all ${
                  selectedService === 'ups-ground' ? 'ring-2 ring-blue-500' : 'hover:bg-blue-300'
                }`}
                onClick={() => setSelectedService('ups-ground')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {selectedService === 'ups-ground' ? (
                        <Check className="w-4 h-4 text-blue-700" />
                      ) : (
                        <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-3 w-3 text-gray-600" />
                        <span className="font-medium text-sm">UPS Ground</span>
                      </div>
                      <p className="text-xs text-gray-600">Entrega terrestre estándar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(services['ups-ground'].baseFee + services['ups-ground'].fuelSurcharge + services['ups-ground'].insurance).toFixed(2)}</p>
                    <p className="text-xs text-gray-600">4-6 Days</p>
                    <p className="text-xs text-gray-500">Para el 18 de enero de 2025</p>
                  </div>
                </div>

                {selectedService === 'ups-ground' && (
                  <div className="mt-3 pt-3 border-t space-y-2 text-sm">
                    <h3 className="font-semibold mb-3">Desglose de costos</h3>
                    <div className="flex justify-between text-gray-700">
                      <span>Tarifa base de envío</span>
                      <span>${services['ups-ground'].baseFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Recargo por combustible</span>
                      <span>${services['ups-ground'].fuelSurcharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Seguro (opcional)</span>
                      <span>${services['ups-ground'].insurance.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(services['ups-ground'].baseFee + services['ups-ground'].fuelSurcharge + services['ups-ground'].insurance).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Create Order Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/new-shipment")}
            >
              <Check className="mr-2 h-4 w-4" />
              Crear Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShipmentCost;
