import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatNDVIData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    name: item.place_name,
    fromDate: item.from_date,
    toDate: item.to_date,
    interval: item.interval_days,
    ndvi: Number(item?.ndvi_stats?.mean || item?.ndvi_stats?.[0]?.stats?.mean).toFixed(3),
    minndvi: Number(item?.ndvi_stats?.min || item?.ndvi_stats?.[0]?.stats?.min).toFixed(3),
    maxndvi: Number(item?.ndvi_stats?.max || item?.ndvi_stats?.[0]?.stats?.max).toFixed(3),
    sampleCount: item?.ndvi_stats?.sampleCount || item?.ndvi_stats?.[0]?.stats?.sampleCount,
    type: "Polygon",
    coordinates: item?.coordinates?.[0] || [],
    area: item?.area || "",
  }));
};