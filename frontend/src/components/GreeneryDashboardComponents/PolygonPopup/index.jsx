const PolygonPopup = ({ polygon, color }) => {
    return (
      <div className="p-4 min-w-[200px] max-w-[300px] font-[Gilroy] text-sm text-[--foreground] space-y-2">
        <h3 className="text-lg font-semibold" style={{ color }}>{polygon.name}</h3>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">NDVI:</span>
          <span className="font-bold" style={{ color }}>{polygon.ndvi}</span>
        </div>
  
        {/* Add more details here */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Area Type:</span>
            <span>{polygon.type || 'Unknown'}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Status:</span>
            <span>{polygon.status || 'Pending'}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default PolygonPopup;
  