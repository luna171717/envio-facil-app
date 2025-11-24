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
  const maxChars = 500;

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
              className={`h-6 w-6 ${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Layout title="Calificar Experiencia">
      <div className="max-w-xl mx-auto">
        <Card className="bg-blue-50">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold mb-2">Califica tu experiencia de envío</h1>
              <p className="text-sm text-gray-600">
                Tu opinión nos ayuda a mejorar nuestro servicio
              </p>
            </div>

            {/* Shipment Info */}
            <div className="bg-white rounded-lg p-4 mb-6 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Número de seguimiento:</span>
                <span className="font-semibold">#{id || "ENV-2025-001234"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entregado el:</span>
                <span className="font-semibold">15 de Enero, 2025</span>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-center">Calificación general</h3>
              <div className="flex justify-center mb-2">
                <RatingStars
                  value={ratings.overall}
                  onChange={(val) => handleRating("overall", val)}
                />
              </div>
              <p className="text-center text-sm text-gray-600">
                {ratings.overall > 0 ? `${ratings.overall} de 5 estrellas` : "Selecciona una calificación"}
              </p>
            </div>

            {/* Individual Ratings */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Velocidad de entrega</span>
                <RatingStars
                  value={ratings.speed}
                  onChange={(val) => handleRating("speed", val)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Comunicación</span>
                <RatingStars
                  value={ratings.communication}
                  onChange={(val) => handleRating("communication", val)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cuidado del paquete</span>
                <RatingStars
                  value={ratings.packaging}
                  onChange={(val) => handleRating("packaging", val)}
                />
              </div>
            </div>

            {/* Comments */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Comentarios adicionales</h3>
              <Textarea
                placeholder="Comparte más detalles sobre tu experiencia (opcional)"
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setComment(e.target.value);
                  }
                }}
                rows={4}
                className="bg-white resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {comment.length}/{maxChars} caracteres
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-white"
              >
                Omitir por ahora
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Enviar calificación
              </Button>
            </div>

            {/* Help Link */}
            <div className="text-center text-sm text-gray-600">
              ¿Tienes algún problema con tu envío?{" "}
              <button className="text-blue-600 hover:text-blue-700 underline">
                Contáctanos
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RateExperience;
