-- Crear función para obtener métricas globales de envíos
-- Esta función usa SECURITY DEFINER para acceder a todos los envíos
-- pero solo devuelve estadísticas agregadas, no datos individuales

CREATE OR REPLACE FUNCTION public.get_global_shipment_metrics()
RETURNS TABLE (
  total_shipments bigint,
  in_transit bigint,
  pending bigint,
  delivered bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COUNT(*) as total_shipments,
    COUNT(*) FILTER (WHERE status = 'En tránsito') as in_transit,
    COUNT(*) FILTER (WHERE status = 'Pendiente') as pending,
    COUNT(*) FILTER (WHERE status = 'Entregado') as delivered
  FROM public.shipments;
$$;