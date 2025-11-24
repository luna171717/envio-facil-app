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

  const calculateEstimate = () => {
    const length = parseFloat(packageInfo.length) || 0;
    const width = parseFloat(packageInfo.width) || 0;
    const height = parseFloat(packageInfo.height) || 0;
    const weight = parseFloat(packageInfo.weight) || 0;

    if (length && width && height && weight) {
      const baseRate = 50;
      const weightCharge = weight * 5;
      const volumeCharge = (length * width * height) / 5000;
      const fragileCharge = packageInfo.fragile ? 15 : 0;
      return (baseRate + weightCharge + volumeCharge + fragileCharge).toFixed(2);
    }
    return "--";
  };

  const handleNext = () => {
    if (step === 1) {
      if (!packageInfo.length || !packageInfo.width || !packageInfo.height || !packageInfo.weight) {
        toast({
          title: "Error",
          description: "Por favor completa las dimensiones y peso del paquete",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (!receiverInfo.name || !receiverInfo.address || !receiverInfo.city) {
        toast({
          title: "Error",
          description: "Por favor completa la información del destinatario",
          variant: "destructive",
        });
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/shipment-cost", {
        state: { packageInfo, receiverInfo },
      });
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-gray-200">
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
                    <h2 className="text-xl font-semibold mb-4">Información del Destinatario</h2>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        placeholder="Juan Pérez"
                        value={receiverInfo.name}
                        onChange={(e) =>
                          setReceiverInfo({ ...receiverInfo, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="55 1234 5678"
                          value={receiverInfo.phone}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={receiverInfo.email}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        placeholder="Calle, número, colonia"
                        value={receiverInfo.address}
                        onChange={(e) =>
                          setReceiverInfo({ ...receiverInfo, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          placeholder="Ciudad de México"
                          value={receiverInfo.city}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          placeholder="CDMX"
                          value={receiverInfo.state}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, state: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Código Postal</Label>
                        <Input
                          id="zipCode"
                          placeholder="01000"
                          value={receiverInfo.zipCode}
                          onChange={(e) =>
                            setReceiverInfo({ ...receiverInfo, zipCode: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferencia de entrega</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="delivery"
                            value="standard"
                            checked={receiverInfo.deliveryPreference === "standard"}
                            onChange={(e) =>
                              setReceiverInfo({
                                ...receiverInfo,
                                deliveryPreference: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm">Entrega estándar (3-5 días)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="delivery"
                            value="express"
                            checked={receiverInfo.deliveryPreference === "express"}
                            onChange={(e) =>
                              setReceiverInfo({
                                ...receiverInfo,
                                deliveryPreference: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm">Entrega express (1-2 días)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Revisión del Envío</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Información del Paquete
                        </h3>
                        <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Dimensiones:</span>{" "}
                            {packageInfo.length} x {packageInfo.width} x {packageInfo.height} cm
                          </p>
                          <p>
                            <span className="text-muted-foreground">Peso:</span>{" "}
                            {packageInfo.weight} {packageInfo.weightUnit}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Descripción:</span>{" "}
                            {packageInfo.description || "Sin descripción"}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Valor:</span> $
                            {packageInfo.value || "0"} {packageInfo.currency}
                          </p>
                          {packageInfo.fragile && (
                            <p className="text-warning font-medium">⚠️ Objeto frágil</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Destinatario</h3>
                        <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Nombre:</span>{" "}
                            {receiverInfo.name}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Teléfono:</span>{" "}
                            {receiverInfo.phone}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Email:</span>{" "}
                            {receiverInfo.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Dirección:</span>{" "}
                            {receiverInfo.address}, {receiverInfo.city}, {receiverInfo.state}{" "}
                            {receiverInfo.zipCode}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Tipo de entrega:</span>{" "}
                            {receiverInfo.deliveryPreference === "express"
                              ? "Express"
                              : "Estándar"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-gray-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="ml-auto bg-[#2c5aa0] hover:bg-[#234a82]"
              >
                {step === 3 ? "Calcular Costo" : "Siguiente"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Cost Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200 sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen de costos
                </h3>

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
                          ? `$${(parseFloat(packageInfo.weight) * 5).toFixed(2)}`
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewShipment;
