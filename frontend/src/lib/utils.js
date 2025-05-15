import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getDateDifference = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  let startYear = startDate.getUTCFullYear();
  let startMonth = startDate.getUTCMonth();
  let startDay = startDate.getUTCDate();

  let endYear = endDate.getUTCFullYear();
  let endMonth = endDate.getUTCMonth();
  let endDay = endDate.getUTCDate();

  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  // Adjust for negative days
  if (days < 0) {
    months -= 1;
    // Get days in previous month of endDate
    const previousMonth = (endMonth - 1 + 12) % 12;
    const previousMonthYear = previousMonth === 11 ? endYear - 1 : endYear;
    const daysInPreviousMonth = new Date(previousMonthYear, previousMonth + 1, 0).getUTCDate();
    days += daysInPreviousMonth;
  }

  // Adjust for negative months
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatNDVIData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    // Handle coordinates normalization
    let normalizedCoordinates = [];
    if (item?.coordinates) {
      // If coordinates is an array of arrays
      if (Array.isArray(item.coordinates)) {
        // If it's the first format (nested array)
        if (Array.isArray(item.coordinates[0]) && Array.isArray(item.coordinates[0][0])) {
          normalizedCoordinates = item.coordinates[0];
        } 
        // If it's the second format (single level array)
        else if (Array.isArray(item.coordinates[0]) && typeof item.coordinates[0][0] === 'number') {
          normalizedCoordinates = item.coordinates;
        }
      }
    }

    return {
      name: item.place_name,
      fromDate: item.from_date,
      toDate: item.to_date,
      interval: item.interval_days,
      ndvi: Number(item?.ndvi_stats?.mean || item?.ndvi_stats?.[0]?.stats?.mean).toFixed(3),
      minndvi: Number(item?.ndvi_stats?.min || item?.ndvi_stats?.[0]?.stats?.min).toFixed(3),
      maxndvi: Number(item?.ndvi_stats?.max || item?.ndvi_stats?.[0]?.stats?.max).toFixed(3),
      sampleCount: item?.ndvi_stats?.sampleCount || item?.ndvi_stats?.[0]?.stats?.sampleCount,
      type: "Polygon",
      coordinates: normalizedCoordinates,
      area: item?.area || "",
    };
  });
};