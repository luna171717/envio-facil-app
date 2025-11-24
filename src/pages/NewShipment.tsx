import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Package, AlertCircle, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const NewShipment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Paso 1: Información del paquete
  const [packageInfo, setPackageInfo] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    weightUnit: "kg",
    description: "",
    value: "",
    currency: "USD",
    fragile: false,
  });

  // Paso 2: Información del receptor
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryPreference: "standard",
  });

  const getDeliveryCost = () => {
    switch (receiverInfo.deliveryPreference) {
      case "express":
        return 20.00;
      case "overnight":
        return 30.00;
      default: // standard
        return 10.00;
    }
  };

  const calculateEstimate = () => {
    const weight = parseFloat(packageInfo.weight) || 0;

    if (weight) {
      const baseRate = 50;
      const WEIGHT_THRESHOLD = 15; // kg
      const EXCESS_WEIGHT_RATE = 8.00; // costo por cada kg adicional después de 15kg
      const weightCharge = weight > WEIGHT_THRESHOLD ? (weight - WEIGHT_THRESHOLD) * EXCESS_WEIGHT_RATE : 0;
      const shippingCost = baseRate + weightCharge;
      const insurance = 15.00;
      const fragileCharge = packageInfo.fragile ? 10.00 : 0;
      const deliveryCost = getDeliveryCost();
      const subtotal = shippingCost + insurance + fragileCharge + deliveryCost;
      const iva = subtotal * 0.16;
      const total = subtotal + iva;
      return total.toFixed(2);
    }
    return "--";
  };

  const handleNext = () => {
    // Paso 1: Información del paquete
    if (step === 1) {
      if (!packageInfo.length || !packageInfo.width || !packageInfo.height || !packageInfo.weight) {
        toast({
          title: "Error",
          description: "Por favor completa las dimensiones y peso del paquete",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }

    // Paso 2: Opciones de envío (Información del receptor)
    if (step === 2) {
      if (!receiverInfo.name || !receiverInfo.address || !receiverInfo.city) {
        toast({
          title: "Error",
          description: "Por favor completa la información del destinatario",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
      return;
    }

    // Paso 3: Revisar y confirmar - Finalizar
    if (step === 3) {
      navigate("/shipment-confirmed", {
        state: { packageInfo, receiverInfo },
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const steps = [
    { number: 1, title: "Detalles del paquete", subtitle: "Información del paquete" },
    { number: 2, title: "Opciones de envío", subtitle: "Opciones de envío" },
    { number: 3, title: "Revisar y confirmar", subtitle: "Revisar y confirmar" },
  ];

  const estimate = calculateEstimate();

  return (
    <Layout title="Crear nuevo envío">
      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Paso {step} de 3</span>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`h-1 flex-1 rounded ${
                    step >= s.number ? "bg-[#2c5aa0]" : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`text-xs ${
                  step >= s.number ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {s.subtitle}
              </div>
            ))}
          </div>
        </div>

        <div className={`grid gap-6 ${step === 3 ? '' : 'lg:grid-cols-3'}`}>
          {/* Left Column - Form */}
          <div className={step === 3 ? '' : 'lg:col-span-2'}>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Información del paquete
                    </h2>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Dimensiones del paquete
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="length" className="text-xs text-gray-500 mb-1 block">
                            Longitud (cm)
                          </Label>
                          <Input
                            id="length"
                            type="number"
                            placeholder="0"
                            value={packageInfo.length}
                            onChange={(e) =>
                              setPackageInfo({ ...packageInfo, length: e.target.value })
                            }
                            className="h-10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="width" className="text-xs text-gray-500 mb-1 block">
                            Ancho (cm)
                          </Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder="0"
                            value={packageInfo.width}
                            onChange={(e) =>
                              setPackageInfo({ ...packageInfo, width: e.target.value })
                            }
                            className="h-10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height" className="text-xs text-gray-500 mb-1 block">
                            Altura (cm)
                          </Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder="0"
                            value={packageInfo.height}
                            onChange={(e) =>
                              setPackageInfo({ ...packageInfo, height: e.target.value })
                            }
                            className="h-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="weight" className="text-sm font-medium text-gray-700 mb-2 block">
                        Peso
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="weight"
                          type="number"
                          placeholder="0"
                          value={packageInfo.weight}
                          onChange={(e) =>
                            setPackageInfo({ ...packageInfo, weight: e.target.value })
                          }
                          className="h-10 flex-1"
                        />
                        <Select
                          value={packageInfo.weightUnit}
                          onValueChange={(value) =>
                            setPackageInfo({ ...packageInfo, weightUnit: value })
                          }
                        >
                          <SelectTrigger className="w-24 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="lb">lb</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                        Descripción del contenido
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe el contenido de tu paquete..."
                        value={packageInfo.description}
                        onChange={(e) =>
                          setPackageInfo({ ...packageInfo, description: e.target.value })
                        }
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="value" className="text-sm font-medium text-gray-700 mb-2 block">
                        Valor
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={packageInfo.currency}
                          onValueChange={(value) =>
                            setPackageInfo({ ...packageInfo, currency: value })
                          }
                        >
                          <SelectTrigger className="w-24 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="MXN">MXN</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="value"
                          type="number"
                          placeholder="0.00"
                          value={packageInfo.value}
                          onChange={(e) =>
                            setPackageInfo({ ...packageInfo, value: e.target.value })
                          }
                          className="h-10 flex-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Artículo frágil</p>
                        <p className="text-xs text-gray-500">Requiere manipulación especial</p>
                      </div>
                      <Switch
                        checked={packageInfo.fragile}
                        onCheckedChange={(checked) =>
                          setPackageInfo({ ...packageInfo, fragile: checked })
                        }
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Información del receptor</h2>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                        Nombre completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="escribe el nombre completo"
                        value={receiverInfo.name}
                        onChange={(e) =>
                          setReceiverInfo({ ...receiverInfo, name: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                          Número de teléfono
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={receiverInfo.phone}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, phone: e.target.value })
                          }
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                          Correo electrónico
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="receptor@ejemplo.com"
                          value={receiverInfo.email}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, email: e.target.value })
                          }
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street, Apt 4B"
                        value={receiverInfo.address}
                        onChange={(e) =>
                          setReceiverInfo({ ...receiverInfo, address: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                          Ciudad
                        </Label>
                        <Input
                          id="city"
                          placeholder="escribe la ciudad"
                          value={receiverInfo.city}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, city: e.target.value })
                          }
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
                          Estado/Provincia
                        </Label>
                        <Select
                          value={receiverInfo.state}
                          onValueChange={(value) =>
                            setReceiverInfo({ ...receiverInfo, state: value })
                          }
                        >
                          <SelectTrigger className="h-10 bg-white">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="CDMX">Ciudad de México</SelectItem>
                            <SelectItem value="JAL">Jalisco</SelectItem>
                            <SelectItem value="NL">Nuevo León</SelectItem>
                            <SelectItem value="PUE">Puebla</SelectItem>
                            <SelectItem value="QRO">Querétaro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-2 block">
                          Código postal
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          value={receiverInfo.zipCode}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, zipCode: e.target.value })
                          }
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 block">
                          País
                        </Label>
                        <Select defaultValue="MX">
                          <SelectTrigger className="h-10 bg-white">
                            <SelectValue placeholder="Seleccionar país" />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="MX">México</SelectItem>
                            <SelectItem value="US">Estados Unidos</SelectItem>
                            <SelectItem value="CA">Canadá</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-sm font-semibold text-gray-900">Preferencias de entrega</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="deliverySpeed" className="text-xs text-gray-500 mb-1 block">
                            Velocidad de entrega
                          </Label>
                          <Select
                            value={receiverInfo.deliveryPreference}
                            onValueChange={(value) =>
                              setReceiverInfo({ ...receiverInfo, deliveryPreference: value })
                            }
                          >
                            <SelectTrigger className="h-10 bg-white">
                              <SelectValue placeholder="Selecciona la velocidad de entrega" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="standard">Estándar (3-5 días) - $10.00</SelectItem>
                              <SelectItem value="express">Express (1-2 días) - $20.00</SelectItem>
                              <SelectItem value="overnight">Siguiente día - $30.00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="deliveryTime" className="text-xs text-gray-500 mb-1 block">
                            Hora de entrega preferida
                          </Label>
                          <Select defaultValue="anytime">
                            <SelectTrigger className="h-10 bg-white">
                              <SelectValue placeholder="En cualquier momento" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="anytime">En cualquier momento</SelectItem>
                              <SelectItem value="morning">Mañana (8am-12pm)</SelectItem>
                              <SelectItem value="afternoon">Tarde (12pm-6pm)</SelectItem>
                              <SelectItem value="evening">Noche (6pm-9pm)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="instructions" className="text-sm font-medium text-gray-700 mb-2 block">
                        Instrucciones especiales
                      </Label>
                      <Textarea
                        id="instructions"
                        placeholder="¿Alguna instrucción especial de entrega?"
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Opciones de Envío</h2>
                    <p className="text-gray-600">Selecciona las opciones de envío para tu paquete.</p>
                    {/* Aquí irá el contenido del paso 2 según tu diseño */}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">Confirmación de Envío</h2>
                      <p className="text-sm text-gray-600">
                        Revisa los detalles de tu envío antes de confirmar y generar la guía
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Columna Izquierda */}
                      <div className="space-y-6">
                        {/* Resumen del Envío */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Resumen del Envío</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => setStep(1)}
                            >
                              Editar
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            {/* Origen */}
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Origen</p>
                              <p className="text-sm font-medium text-blue-600 mb-1">Juan Pérez</p>
                              <p className="text-xs text-gray-600">Av. Reforma 123, Col. Centro</p>
                              <p className="text-xs text-gray-600">Ciudad de México, CDMX 06000</p>
                              <p className="text-xs text-gray-600">Tel: +52 55 1234 5678</p>
                            </div>

                            {/* Destino */}
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Destino</p>
                              <p className="text-sm font-medium text-blue-600 mb-1">{receiverInfo.name || "María López"}</p>
                              <p className="text-xs text-gray-600">{receiverInfo.address || "Calle 5 de Mayo 456, Col. Zona Rosa"}</p>
                              <p className="text-xs text-gray-600">
                                {receiverInfo.city || "Guadalajara"}, {receiverInfo.state || "JAL"} {receiverInfo.zipCode || "44100"}
                              </p>
                              <p className="text-xs text-gray-600">Tel: {receiverInfo.phone || "+52 33 9876 5432"}</p>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 mt-4 pt-4">
                            <p className="text-xs font-semibold text-gray-500 mb-2">Detalles del Paquete</p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-gray-500">Peso:</span>
                                <span className="ml-2 font-medium">{packageInfo.weight} kg</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Dimensiones:</span>
                                <span className="ml-2 font-medium">{packageInfo.length}x{packageInfo.width}x{packageInfo.height} cm</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Tipo:</span>
                                <span className="ml-2 font-medium">{packageInfo.fragile ? "Frágil" : "Estándar"}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Valor:</span>
                                <span className="ml-2 font-medium">${packageInfo.value || "500.00"} {packageInfo.currency}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desglose de Costos */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">Desglose de Costos</h3>
                          
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-medium text-gray-700">Concepto</th>
                                <th className="text-center py-2 font-medium text-gray-700">Cantidad</th>
                                <th className="text-right py-2 font-medium text-gray-700">Precio</th>
                                <th className="text-right py-2 font-medium text-gray-700">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const weight = parseFloat(packageInfo.weight) || 0;
                                const baseRate = 50;
                                const WEIGHT_THRESHOLD = 15;
                                const EXCESS_WEIGHT_RATE = 8.00;
                                const weightCharge = weight > WEIGHT_THRESHOLD ? (weight - WEIGHT_THRESHOLD) * EXCESS_WEIGHT_RATE : 0;
                                const shippingCost = baseRate + weightCharge;
                                const insurance = 15.00;
                                const fragileCharge = packageInfo.fragile ? 10.00 : 0;
                                const deliveryCost = getDeliveryCost();
                                const subtotal = shippingCost + insurance + fragileCharge + deliveryCost;
                                const iva = subtotal * 0.16;
                                const total = subtotal + iva;

                                return (
                                  <>
                                    <tr className="border-b border-gray-100">
                                      <td className="py-3 text-gray-600">Envío estándar</td>
                                      <td className="py-3 text-center text-gray-600">1</td>
                                      <td className="py-3 text-right text-gray-600">${shippingCost.toFixed(2)}</td>
                                      <td className="py-3 text-right text-gray-900 font-medium">${shippingCost.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                      <td className="py-3 text-gray-600">Seguro de mercancía</td>
                                      <td className="py-3 text-center text-gray-600">1</td>
                                      <td className="py-3 text-right text-gray-600">${insurance.toFixed(2)}</td>
                                      <td className="py-3 text-right text-gray-900 font-medium">${insurance.toFixed(2)}</td>
                                    </tr>
                                    {packageInfo.fragile && (
                                      <tr className="border-b border-gray-100">
                                        <td className="py-3 text-gray-600">Manejo especial</td>
                                        <td className="py-3 text-center text-gray-600">1</td>
                                        <td className="py-3 text-right text-gray-600">${fragileCharge.toFixed(2)}</td>
                                        <td className="py-3 text-right text-gray-900 font-medium">${fragileCharge.toFixed(2)}</td>
                                      </tr>
                                    )}
                                    <tr className="border-b border-gray-100">
                                      <td className="py-3 text-gray-600">Velocidad de entrega ({
                                        receiverInfo.deliveryPreference === "express" 
                                          ? "Express" 
                                          : receiverInfo.deliveryPreference === "overnight"
                                          ? "Siguiente día"
                                          : "Estándar"
                                      })</td>
                                      <td className="py-3 text-center text-gray-600">1</td>
                                      <td className="py-3 text-right text-gray-600">${deliveryCost.toFixed(2)}</td>
                                      <td className="py-3 text-right text-gray-900 font-medium">${deliveryCost.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                      <td className="py-3 text-gray-600 font-medium">Subtotal</td>
                                      <td className="py-3"></td>
                                      <td className="py-3"></td>
                                      <td className="py-3 text-right text-gray-900 font-medium">${subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                      <td className="py-3 text-gray-600">IVA (16%)</td>
                                      <td className="py-3"></td>
                                      <td className="py-3"></td>
                                      <td className="py-3 text-right text-gray-900 font-medium">${iva.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                      <td className="py-3 text-gray-900 font-bold text-base">Total</td>
                                      <td className="py-3"></td>
                                      <td className="py-3"></td>
                                      <td className="py-3 text-right text-gray-900 font-bold text-base">${total.toFixed(2)}</td>
                                    </tr>
                                  </>
                                );
                              })()}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Columna Derecha */}
                      <div className="space-y-6">
                        {/* Método de Pago */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">Método de Pago</h3>
                          
                          <div className="mb-4">
                            <Label className="text-sm text-gray-700 mb-2 block">Seleccionar método de pago</Label>
                            <Select defaultValue="origin">
                              <SelectTrigger className="bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="origin">Pago en origen</SelectItem>
                                <SelectItem value="destination">Pago en destino</SelectItem>
                                <SelectItem value="card">Tarjeta de crédito</SelectItem>
                                <SelectItem value="transfer">Transferencia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="text-xs text-blue-900">
                              <p className="font-semibold mb-1">Pago en origen seleccionado</p>
                              <p>El pago se realizará antes del envío. Se requiere comprobante de pago para proceder.</p>
                            </div>
                          </div>
                        </div>

                        {/* Tiempo de Entrega */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">Tiempo de Entrega</h3>
                          
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <p className="text-gray-500">Fecha de envío:</p>
                              <p className="font-medium text-gray-900">15 Ene 2025</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-500">Fecha estimada:</p>
                              <p className="font-medium text-gray-900">17 Ene 2025</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-500">Tiempo estimado:</p>
                              <p className="font-medium text-gray-900">
                                {receiverInfo.deliveryPreference === "express" 
                                  ? "2-3 días hábiles" 
                                  : receiverInfo.deliveryPreference === "overnight"
                                  ? "1 día hábil"
                                  : "3-5 días hábiles"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="space-y-3">
                          <Button
                            onClick={handleNext}
                            className="w-full bg-[#2c5aa0] hover:bg-[#234a82]"
                          >
                            Confirmar Envío
                          </Button>
                          <Button
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="w-full"
                          >
                            Editar información
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons - Solo para pasos 1 y 2 */}
            {step !== 3 && (
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="ghost" onClick={handleBack} className="text-gray-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="ml-auto bg-[#2c5aa0] hover:bg-[#234a82]"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            )}
          </div>

          {/* Right Column - Summary (hidden on step 3) */}
          {step !== 3 && (
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200 sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {step === 1 ? "Resumen de costos" : "Resumen de envío"}
                </h3>

                {step === 1 ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[100px]">
                      <Package className="h-8 w-8 text-orange-600 mb-2" />
                      <p className="text-xs text-gray-600">
                        Las dimensiones del paquete aparecerán aquí
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tarifa básica</span>
                        <span className="text-gray-900">
                          {packageInfo.weight ? "$50.00" : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Recargo por peso</span>
                        <span className="text-gray-900">
                          {packageInfo.weight
                            ? parseFloat(packageInfo.weight) > 15
                              ? `$${((parseFloat(packageInfo.weight) - 15) * 8).toFixed(2)}`
                              : "$0.00"
                            : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Manipulación de objetos frágiles</span>
                        <span className="text-gray-900">
                          {packageInfo.fragile ? "$15.00" : "--"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total estimado:</span>
                        <span className="text-xl font-bold text-gray-900">${estimate}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-amber-900 mb-1">
                          Entrega estimada
                        </p>
                        <p className="text-xs text-amber-700">
                          Consulta los detalles completos del paquete para ver la fecha estimada de
                          entrega.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-900 mb-1">
                          ¿Necesitas ayuda con el embalaje?
                        </p>
                        <p className="text-xs text-blue-700">Ver guías de embalaje</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tipo de servicio</span>
                        <span className="text-gray-900">
                          {receiverInfo.deliveryPreference === "express" 
                            ? "Express" 
                            : receiverInfo.deliveryPreference === "overnight"
                            ? "Siguiente día"
                            : "Estándar"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Peso estimado</span>
                        <span className="text-gray-900">
                          {packageInfo.weight ? `${packageInfo.weight} ${packageInfo.weightUnit}` : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Distancia</span>
                        <span className="text-gray-900">
                          {receiverInfo.city ? "~850 km" : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tiempo de entrega</span>
                        <span className="text-gray-900">
                          {receiverInfo.deliveryPreference === "express" 
                            ? "1-2 días" 
                            : receiverInfo.deliveryPreference === "overnight"
                            ? "1 día"
                            : "3-5 días"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">Costo estimado</span>
                        <span className="text-xl font-bold text-gray-900">
                          {packageInfo.weight && packageInfo.length ? `$${estimate}` : "--"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        El precio final se calcula al finalizar la compra.
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900 mb-2">
                        ¿Necesitas ayuda?
                      </p>
                      <p className="text-xs text-blue-700 mb-3">
                        Contacta con nuestros expertos en envíos para obtener ayuda
                      </p>
                      <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                        📞 Llamar a experto
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewShipment;
