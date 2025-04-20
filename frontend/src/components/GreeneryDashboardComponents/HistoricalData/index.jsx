import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; 

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const HistoricalDataUI = ({ historicalData }) => {
  if (!historicalData || !historicalData.ndvi_stats?.length) {
    return <p className="text-primary text-lg">No historical data available.</p>;
  }

  const chartData = historicalData.ndvi_stats.map((entry) => ({
    from: formatDate(entry.from),
    mean: entry.stats.mean,
    min: entry.stats.min,
    max: entry.stats.max,
  }));

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-4 space-y-1">
            <p className="text-lg text-primary">Location</p>
            <p className="text-lg font-medium">
              {historicalData.place_name}, {historicalData.area}
            </p>

            <p className="text-lg text-primary">Date Range</p>
            <p className="text-base">
              {formatDate(historicalData.from_date)} → {formatDate(historicalData.to_date)}
            </p>

            <p className="text-lg text-primary">Interval</p>
            <p className="text-base">{historicalData.interval_days} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-lg font-medium mb-2">NDVI Stats</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="from" />
                <YAxis domain={["dataMin", "dataMax"]} />
                <Tooltip />
                <Line type="monotone" dataKey="mean" stroke="#22c55e" name="Mean" />
                <Line type="monotone" dataKey="min" stroke="#3b82f6" name="Min" />
                <Line type="monotone" dataKey="max" stroke="#f59e0b" name="Max" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default HistoricalDataUI;
