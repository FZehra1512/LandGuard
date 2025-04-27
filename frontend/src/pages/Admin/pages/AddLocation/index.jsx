import PolygonLayer from "@/components/GreeneryDashboardComponents/PolygonLayer";
import { useNdvi } from "@/hooks/use-ndvi";
import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import "./addLocation.css";
import { addLocation } from "@/api/adminEndPoints";
import { getNDVIData } from "@/api/mapDataEndpoints";
import { formatNDVIData } from "@/lib/utils";

const AddLocation = () => {
  const { ndviPolygons, setNdviPolygons, loading } = useNdvi();
  const [drawMode, setDrawMode] = useState(false);
  const [newLocations, setNewLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempPolygon, setTempPolygon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const featureGroupRef = useRef();
  const layerRefs = useRef({}); // Store layer references to identify polygons
  const polygonDataRef = useRef({}); // Store polygon data directly in the layer object

  // Update polygonDataRef when newLocations changes
  useEffect(() => {
    newLocations.forEach((loc) => {
      polygonDataRef.current[loc.id] = loc;
    });
  }, [newLocations]);

  const onSubmit = useCallback(async () => {
    if (newLocations.length === 0) return;

    try {
      setIsSubmitting(true);
      // TODO: Add Multiple locations
      const payload = {
        area: newLocations[0].area,
        place_name: newLocations[0].placeName,
        coordinates: [newLocations[0].coordinates],
      };

      const apiResponse = await addLocation(payload);
      if (apiResponse.code === 201) {
        const { code, data } = await getNDVIData();
        if (code === 200 && data?.length) {
          const formatted = formatNDVIData(data);
          setNdviPolygons(formatted);
          toast({
            variant: "success",
            title: "Success",
            description: `Locations saved successfully!`,
          });

          featureGroupRef.current.clearLayers();
          setNewLocations([]);
          setDrawMode(false);
          layerRefs.current = {};
          polygonDataRef.current = {};
        }
      }
    } catch (error) {
      console.error("Error saving locations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error saving locations",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [newLocations]);

  const handleModalSubmit = useCallback(() => {
    if (!tempPolygon) return;

    // Validate inputs
    if (!tempPolygon.placeName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a place name",
      });
      return;
    }

    if (!tempPolygon.area.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an area name",
      });
      return;
    }

    setNewLocations((prev) =>
      prev.some((loc) => loc.id === tempPolygon.id)
        ? prev.map((loc) =>
            loc.id === tempPolygon.id
              ? {
                  ...loc,
                  placeName: tempPolygon.placeName,
                  area: tempPolygon.area,
                }
              : loc
          )
        : [...prev, { ...tempPolygon }]
    );

    // Update the polygon data in the ref
    polygonDataRef.current[tempPolygon.id] = {
      ...tempPolygon,
      placeName: tempPolygon.placeName,
      area: tempPolygon.area,
    };

    setIsModalOpen(false);
    setTempPolygon(null);
  }, [tempPolygon]);

  const handleCreated = useCallback((e) => {
    const layer = e.layer;
    let coordinates = layer.getLatLngs()[0];
    coordinates.push(coordinates[0]);

    const polygonData = {
      id: Date.now().toString(),
      placeName: "",
      area: "",
      coordinates: coordinates.map((coord) => [coord.lat, coord.lng]),
    };

    // Store the layer reference with the polygon ID
    layerRefs.current[polygonData.id] = layer;

    // Store the polygon data in the ref
    polygonDataRef.current[polygonData.id] = polygonData;

    // Set the temporary polygon and open the modal
    setTempPolygon(polygonData);
    setIsModalOpen(true);

    // Attach click event
    layer.on("contextmenu", () => {
      // Find which polygon was clicked by comparing layer references
      let clickedPolygonId = null;

      for (const [id, ref] of Object.entries(layerRefs.current)) {
        if (ref === layer) {
          clickedPolygonId = id;
          break;
        }
      }

      if (clickedPolygonId) {
        // Get the polygon data directly from the ref
        const existingPolygon = polygonDataRef.current[clickedPolygonId];

        if (existingPolygon) {
          setTempPolygon(existingPolygon);
          setIsModalOpen(true);
        }
      }
    });
  }, []);

  const handleDeleted = useCallback((e) => {
    const layers = e.layers;
    const deletedIds = [];

    // Find which polygons were deleted
    layers.eachLayer((layer) => {
      for (const [id, ref] of Object.entries(layerRefs.current)) {
        if (ref === layer) {
          deletedIds.push(id);
          // Remove the layer reference
          delete layerRefs.current[id];
          // Remove the polygon data
          delete polygonDataRef.current[id];
        }
      }
    });

    // Remove deleted polygons from newLocations
    if (deletedIds.length > 0) {
      setNewLocations((prev) =>
        prev.filter((loc) => !deletedIds.includes(loc.id))
      );
    }

    // console.log("Deleted polygons:", deletedIds);
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setTempPolygon((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const toggleDrawMode = useCallback(() => {
    setDrawMode((prev) => !prev);
  }, []);

  return (
    <div className="relative h-full w-full py-6">
      {(loading || isSubmitting) && (
        <div className="absolute my-6 inset-0 bg-black/50 z-[2000] flex items-center justify-center rounded-[10px]">
          <Loader2 className="animate-spin w-10 h-10 text-accent" />
        </div>
      )}
      <div className="absolute right-4 md:right-[45%] bottom-14 z-[1000]">
        {!drawMode ? (
          <Button onClick={toggleDrawMode} variant="outline">
            Enable Drawing
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            variant="outline"
            disabled={newLocations.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>

      <Dialog open={isModalOpen && tempPolygon} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Location Details</DialogTitle>
            <DialogDescription className="sr-only">
              Location Details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="placeName">Place Name</Label>
              <Input
                id="placeName"
                value={tempPolygon?.placeName || ""}
                onChange={(e) => handleInputChange("placeName", e.target.value)}
                placeholder="Enter place name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="areaName">Area Name</Label>
              <Input
                id="areaName"
                value={tempPolygon?.area || ""}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="Enter area name"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleModalSubmit}>Add Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MapContainer
        center={[24.93167048902523, 67.11313160770239]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <ScaleControl position="topright" />
        <ZoomControl position="topright" />

        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        <PolygonLayer polygons={ndviPolygons} showInfoDialog={false} />

        <FeatureGroup ref={featureGroupRef}>
          {drawMode && (
            <EditControl
              position="topright"
              onCreated={handleCreated}
              onDeleted={handleDeleted}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
                polygon: {
                  allowIntersection: false,
                  drawError: {
                    color: "#e1e100",
                    message: "<strong>Error:</strong> Invalid polygon!",
                  },
                  shapeOptions: {
                    color: "#97009c",
                  },
                },
              }}
              edit={{
                edit: false,
                remove: true,
              }}
            />
          )}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default AddLocation;
