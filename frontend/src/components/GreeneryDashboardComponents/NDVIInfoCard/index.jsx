import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NDVIInfoCard = ({ selectedPolygon }) => {
  const [activeTab, setActiveTab] = useState("current-data");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="mt-2 md:mt-3"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="current-data">Current Data</TabsTrigger>
        <TabsTrigger value="historical-data">Historical Data</TabsTrigger>
      </TabsList>
      <TabsContent value="current-data" className="space-y-4 mt-4 -mr-4">
        <ScrollArea className="h-[65vh] lg:h-[60vh] pr-4">
          <h1>{selectedPolygon.name}</h1>
          <div>
            <h4 className="font-medium">NDVI Score</h4>
            <p className="text-2xl font-bold">
              {selectedPolygon.ndvi.toFixed(2)}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Area Type</h4>
            <p>{selectedPolygon.type}</p>
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="historical-data" className="mt-4 -mr-4">
        <ScrollArea className="h-[65vh] lg:h-[60vh] pr-4">
          <HistoricalDataForm selectedPolygon={selectedPolygon} />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default NDVIInfoCard;



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getHistoricalData } from "@/api/mapDashboardApis";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import HistoricalDataUI from "@/components/GreeneryDashboardComponents/HistoricalData";

const formSchema = z
  .object({
    fromDate: z.string().min(1, "From date is required"),
    toDate: z.string().min(1, "To date is required"),
    interval: z
      .number({ required_error: "Interval is required" })
      .int("Interval must be an integer")
      .positive("Interval must be greater than 0"),
  })
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return to > from;
    },
    {
      message: "To date must be after From date",
      path: ["toDate"],
    }
  )
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      const daysDiff = Math.floor(
        (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
      );
      return data.interval < daysDiff;
    },
    {
      message:
        "Interval must be less than the number of days between From and To dates",
      path: ["interval"],
    }
  )
  .refine(
    (data) => {
      const today = new Date();
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return from < today && to < today;
    },
    {
      message: "Dates must be in the past",
      path: ["toDate"],
    }
  );

const HistoricalDataForm = ({ selectedPolygon }) => {
  const [historicalData, setHistoricalData] = useState();
  const [loadingHistoricalData, setLoadingHistoricalData] = useState(false);
  const [historicalDataModalOpen, setHistoricalDataModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromDate: "",
      toDate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // const payload = {
      //   "area": selectedPolygon.area,
      //   "place_name": selectedPolygon.place_name,
      //   "coordinates": selectedPolygon.coordinates,
      //   "from_date": data.fromDate,
      //   "to_date": data.toDate,
      //   "interval_days": data.interval
      // }
      const payload = {
        area: "Gulshan-e-Iqbal",
        place_name: "Khawateen Park",
        coordinates: [
          [
            [24.895465995900306, 67.0690704347966],
            [24.89587321906284, 67.06979676956388],
            [24.896260576434315, 67.06944637691234],
            [24.895846733044333, 67.06851199650819],
            [24.895465995900306, 67.0690704347966],
          ],
        ],
        from_date: data.fromDate,
        to_date: data.toDate,
        interval_days: data.interval,
      };
      setLoadingHistoricalData(true);
      const apiresponse = await getHistoricalData(payload);
      if (apiresponse.code === 200) {
        setHistoricalData(apiresponse.data);
        setHistoricalDataModalOpen(true);
        toast({
          variant: "success",
          title: "Success",
          description: `Data retrieved successfully ${data.toDate}`,
        });
      } else {
        console.log(apiresponse.code);
      }
    } catch (error) {
      console.error("Try block failed");
    } finally {
      form.reset();
      setLoadingHistoricalData(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
        <p className="text-sm text-center text-primary my-2">
          View historical NDVI data for this location by selecting a date range
          and interval.
        </p>

        <div className="grid gap-2">
          <Label htmlFor="fromDate">From Date</Label>
          <Input
            id="fromDate"
            type="date"
            placeholder="m@example.com"
            {...form.register("fromDate")}
          />
          {form.formState.errors.fromDate && (
            <p className="text-sm text-destructive">
              {form.formState.errors.fromDate.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="toDate">To Date</Label>
          <Input
            id="toDate"
            type="date"
            placeholder="m@example.com"
            {...form.register("toDate")}
          />
          {form.formState.errors.toDate && (
            <p className="text-sm text-destructive">
              {form.formState.errors.toDate.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="interval">Interval (days)</Label>
          <div className="flex gap-2">
            <Input
              id="interval"
              type="number"
              className="no-spinner"
              placeholder="e.g., 60"
              {...form.register("interval", {
                setValueAs: (value) => Number(value),
              })}
            />
            <Select
              onValueChange={(value) =>
                form.setValue("interval", Number(value), {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-[10%]"></SelectTrigger>
              <SelectContent side="bottom" align="end">
                <SelectItem value="15">15 days</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
                <SelectItem value="45">1.5 month</SelectItem>
                <SelectItem value="60">2 months</SelectItem>
                <SelectItem value="180">6 months</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.formState.errors.interval && (
            <p className="text-sm text-destructive">
              {form.formState.errors.interval.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full !mt-8 !mb-2">
          {loadingHistoricalData ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Get Data"
          )}
        </Button>
      </form>


      <Dialog
        open={historicalDataModalOpen}
        onOpenChange={setHistoricalDataModalOpen}
      >
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="h-[90vh] max-w-5xl w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-primary">
              Historical Data for {selectedPolygon.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Statistical data
            </DialogDescription>
          </DialogHeader>
          {historicalData && (
            <HistoricalDataUI historicalData={historicalData} />
          )}
        </DialogContent>
      </Dialog>
    </Form>
  );
};
