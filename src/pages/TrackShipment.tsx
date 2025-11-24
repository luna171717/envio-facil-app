import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";

const TrackShipment = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = () => {
    if (trackingId.trim()) {
      navigate(`/track/${trackingId}`);
    }
  };

  return (
    <Layout title="Seguimiento de Envíos">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Rastrear envío</h2>
              <p className="text-sm text-gray-600">
                Ingresa tu código de seguimiento para ver el estado de tu envío
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa tu código de seguimiento (ej: TRK123456789)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                className="flex-1"
              />
              <Button 
                onClick={handleTrack} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!trackingId.trim()}
              >
                Rastrear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TrackShipment;
