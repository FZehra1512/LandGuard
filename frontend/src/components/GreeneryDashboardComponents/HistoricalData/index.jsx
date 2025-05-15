import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate, getDateDifference } from "@/lib/utils";

const downloadExcel = (historicalData) => {
  if (!historicalData?.ndvi_stats) return;

  const worksheetData = historicalData.ndvi_stats.map((stat) => ({
    "From Date": formatDate(stat.from),
    "To Date": formatDate(stat.to),
    "Min NDVI": stat.stats.min.toFixed(3),
    "Mean NDVI": stat.stats.mean.toFixed(3),
    "Max NDVI": stat.stats.max.toFixed(3),
    "Std Deviation": stat.stats.stDev.toFixed(3),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "NDVI Stats");

  XLSX.writeFile(
    workbook,
    `${historicalData.place_name || "historical-data"}.xlsx`
  );
};

const HistoricalDataUI = ({ historicalData }) => {
  if (!historicalData || !historicalData.ndvi_stats?.length) {
    return (
      <p className="text-primary text-lg">No historical data available.</p>
    );
  }
  const isMobile = useIsMobile();

  const chartData = historicalData.ndvi_stats.map((entry) => ({
    from: formatDate(entry.from),
    mean: +entry.stats.mean.toFixed(3),
    min: +entry.stats.min.toFixed(3),
    max: +entry.stats.max.toFixed(3),
  }));

  const timePeriod = getDateDifference(
    historicalData.from_date,
    historicalData.to_date
  );
  return (
    <ScrollArea className="h-[65vh] md:h-[70vh] pr-4">
      <div className="space-y-6 md:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 w-full pt-6">
          <Card className="p-2 bg-primary text-background text-center shadow-md">
            <p className="font-medium">Date Range</p>
            <p className="text-sm">
              {formatDate(historicalData.from_date)} →{" "}
              {formatDate(historicalData.to_date)}
            </p>
          </Card>
          <Card className="p-2 bg-primary text-background text-center shadow-md">
            <p className="font-medium">Interval</p>
            <p className="text-sm">{historicalData.interval_days} days</p>
          </Card>
          <Card className="p-2 bg-primary text-background text-center shadow-md">
            <p className="font-medium">Sample Count</p>
            <p className="text-sm">
              {historicalData.ndvi_stats[0].stats.sampleCount}
            </p>
          </Card>
        </div>
        <div className="flex justify-center items-centerw-full">
          <Card className="w-full h-fit md:w-4/5 lg:w-1/2 p-2 bg-primary text-background text-center shadow-md">
            <p className="font-medium text-xl pb-4">Difference in NDVI over {timePeriod.years} years, {timePeriod.months} months and {timePeriod.days} days</p>
            <p className="font-medium text-lg">
              {historicalData.ndvi_stats[0].stats.mean.toFixed(3)} →{" "}
              {historicalData.ndvi_stats[
                historicalData.ndvi_stats.length - 1
              ].stats.mean.toFixed(3)}
            </p>
          </Card>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2">Mean NDVI Line Graph</h4>
          <Card className="shadow-md">
            <CardContent className="px-2 lg:px-6 pt-4">
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="from" />
                  <YAxis domain={["dataMin", "dataMax"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#22c55e"
                    name="NDVI"
                  />
                  {/* <Line type="monotone" dataKey="min" stroke="#3b82f6" name="Min" /> */}
                  {/* <Line type="monotone" dataKey="max" stroke="#f59e0b" name="Max" /> */}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {isMobile ? (
          <div className="flex w-full justify-center items-center">
            <Button onClick={() => downloadExcel(historicalData)}>
              Download Stats Excel
            </Button>
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <div className="flex justify-between">
              <h4 className="text-lg font-medium my-2">Tabular Statistics</h4>
              <Button onClick={() => downloadExcel(historicalData)}>
                Download Excel
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>From Date</TableHead>
                  <TableHead>To Date</TableHead>
                  <TableHead>Min NDVI</TableHead>
                  <TableHead>Mean NDVI</TableHead>
                  <TableHead>Max NDVI</TableHead>
                  <TableHead>Std Deviation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalData.ndvi_stats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-2">{index + 1}</TableCell>
                    <TableCell className="py-2">
                      {formatDate(stat.from)}
                    </TableCell>
                    <TableCell className="py-2">
                      {formatDate(stat.to)}
                    </TableCell>
                    <TableCell className="py-2">
                      {stat.stats.min.toFixed(3)}
                    </TableCell>
                    <TableCell className="py-2">
                      {stat.stats.mean.toFixed(3)}
                    </TableCell>
                    <TableCell className="py-2">
                      {stat.stats.max.toFixed(3)}
                    </TableCell>
                    <TableCell className="py-2">
                      {stat.stats.stDev.toFixed(3)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default HistoricalDataUI;
