import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const RateExperience = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ratings, setRatings] = useState({
    overall: 0,
    speed: 0,
    communication: 0,
    packaging: 0,
  });

  const [comment, setComment] = useState("");

  const handleRating = (category: keyof typeof ratings, value: number) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = () => {
    if (ratings.overall === 0) {
      toast({
        title: "Calificación requerida",
        description: "Por favor califica tu experiencia general",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Gracias por tu feedback!",
      description: "Tu calificación nos ayuda a mejorar nuestro servicio",
    });

    navigate("/dashboard");
  };

  const RatingStars = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (val: number) => void;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const shipmentSummary = {
    trackingId: id || "ENV-2024-001234",
    deliveryDate: "23 de noviembre, 2024",
    origin: "Monterrey, NL",
    destination: "Ciudad de México, CDMX",
    service: "FedEx Express",
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Califica tu Experiencia</h1>
          <p className="text-muted-foreground mt-1">
            Tu opinión nos ayuda a mejorar nuestro servicio
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Resumen del Envío</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Código de seguimiento</p>
                <p className="font-mono font-medium">{shipmentSummary.trackingId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fecha de entrega</p>
                <p className="font-medium">{shipmentSummary.deliveryDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Origen</p>
                <p className="font-medium">{shipmentSummary.origin}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Destino</p>
                <p className="font-medium">{shipmentSummary.destination}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Servicio</p>
                <p className="font-medium">{shipmentSummary.service}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Calificación General</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿Cómo calificarías tu experiencia general?
              </p>
              <RatingStars
                value={ratings.overall}
                onChange={(val) => handleRating("overall", val)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Velocidad de Entrega</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿El paquete llegó en el tiempo esperado?
              </p>
              <RatingStars
                value={ratings.speed}
                onChange={(val) => handleRating("speed", val)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Comunicación</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿Recibiste actualizaciones oportunas sobre tu envío?
              </p>
              <RatingStars
                value={ratings.communication}
                onChange={(val) => handleRating("communication", val)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cuidado del Paquete</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿El paquete llegó en buenas condiciones?
              </p>
              <RatingStars
                value={ratings.packaging}
                onChange={(val) => handleRating("packaging", val)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Comentarios Adicionales</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cuéntanos más sobre tu experiencia (opcional)
            </p>
            <Textarea
              placeholder="Escribe tus comentarios aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="flex-1">
            Omitir
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Enviar Calificación
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RateExperience;
