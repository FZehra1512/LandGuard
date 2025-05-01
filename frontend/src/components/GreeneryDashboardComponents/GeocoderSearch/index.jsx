import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMap } from "react-leaflet";

const SearchBox = ({ setSearchLocation }) => {
  const map = useMap();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "pk" }, // 🇵🇰 optional
    },
    debounce: 300,
  });

  const handleInput = (e) => setValue(e.target.value);

  const handleSelect = useCallback(
    async (description) => {
      setValue(description, false);
      clearSuggestions();
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      setSearchLocation([lat, lng]);
      map.flyTo([lat, lng], 17, {
        animate: true,
        duration: 1.5,
      });
    },
    [setValue, clearSuggestions, setSearchLocation]
  );

  return (
    <div className="absolute z-[2000] top-3 left-4 right-4 w-3/4 md:w-[400px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        <Input
          className="pl-9 w-full md:w-full"
          disabled={!ready}
          value={value}
          onChange={handleInput}
          placeholder="Search places..."
        />
      </div>
      {status === "OK" && (
        <ScrollArea className="w-full h-60 mt-1 bg-white border rounded shadow">
          <ul>
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                className="text-primary text-sm px-3 py-2 hover:bg-slate-100 cursor-pointer"
                onClick={() => handleSelect(description)}
              >
                {description}
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
};

export default SearchBox;
