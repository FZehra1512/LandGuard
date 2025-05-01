const PolygonPopup = ({ polygon, color }) => {
  return (
    <div className="min-w-[200px] max-w-[300px] flex flex-col space-y-1 text-left">
      <span className="text-xl font-bold !font-Gilroy">{polygon.name}</span>
      <span className="text-sm text-primary font-semibold !font-Gilroy">
        {polygon.area}
      </span>
      <div className="pt-3 flex justify-between w-full items-end">
        <span className="text-sm">NDVI</span>
        <div className="flex-1 mb-1 border border-b border-dashed mx-2" />
        <span className="text-primary font-semibold">
          ~{polygon.ndvi}
        </span>
      </div>
    </div>
  );
};

export default PolygonPopup;
