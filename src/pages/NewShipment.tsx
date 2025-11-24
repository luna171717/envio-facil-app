import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
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
    description: "",
    value: "",
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
    { number: 1, title: "Paquete" },
    { number: 2, title: "Destinatario" },
    { number: 3, title: "Revisión" },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nuevo Envío</h1>
          <p className="text-muted-foreground mt-1">
            Completa la información para crear tu envío
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                </div>
                <span className="text-sm mt-2 text-muted-foreground">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-4 rounded transition-colors ${
                    step > s.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Información del Paquete</h2>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Largo (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="30"
                      value={packageInfo.length}
                      onChange={(e) =>
                        setPackageInfo({ ...packageInfo, length: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Ancho (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="20"
                      value={packageInfo.width}
                      onChange={(e) =>
                        setPackageInfo({ ...packageInfo, width: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Alto (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="10"
                      value={packageInfo.height}
                      onChange={(e) =>
                        setPackageInfo({ ...packageInfo, height: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="2.5"
                    value={packageInfo.weight}
                    onChange={(e) =>
                      setPackageInfo({ ...packageInfo, weight: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción del contenido</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente el contenido del paquete"
                    value={packageInfo.description}
                    onChange={(e) =>
                      setPackageInfo({ ...packageInfo, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Valor declarado (MXN)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="1000"
                    value={packageInfo.value}
                    onChange={(e) =>
                      setPackageInfo({ ...packageInfo, value: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fragile"
                    checked={packageInfo.fragile}
                    onCheckedChange={(checked) =>
                      setPackageInfo({ ...packageInfo, fragile: checked as boolean })
                    }
                  />
                  <label htmlFor="fragile" className="text-sm text-foreground cursor-pointer">
                    Objeto frágil - requiere manejo especial
                  </label>
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
                    <h3 className="font-semibold text-foreground mb-2">Información del Paquete</h3>
                    <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Dimensiones:</span>{" "}
                        {packageInfo.length} x {packageInfo.width} x {packageInfo.height} cm
                      </p>
                      <p>
                        <span className="text-muted-foreground">Peso:</span> {packageInfo.weight} kg
                      </p>
                      <p>
                        <span className="text-muted-foreground">Descripción:</span>{" "}
                        {packageInfo.description || "Sin descripción"}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Valor:</span> $
                        {packageInfo.value || "0"} MXN
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
                        <span className="text-muted-foreground">Nombre:</span> {receiverInfo.name}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Teléfono:</span>{" "}
                        {receiverInfo.phone}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span> {receiverInfo.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Dirección:</span>{" "}
                        {receiverInfo.address}, {receiverInfo.city}, {receiverInfo.state}{" "}
                        {receiverInfo.zipCode}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Tipo de entrega:</span>{" "}
                        {receiverInfo.deliveryPreference === "express" ? "Express" : "Estándar"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          )}
          <Button onClick={handleNext} className="ml-auto">
            {step === 3 ? "Calcular Costo" : "Siguiente"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewShipment;
