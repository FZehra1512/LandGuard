import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Loader2,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatNDVIData } from "@/lib/utils";
import { useNdvi } from "@/hooks/use-ndvi";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { updateNDVIData } from "@/api/adminEndPoints";
import { toast } from "@/hooks/use-toast";
import { getNDVIData } from "@/api/mapDataEndpoints";

export const getMapUrl = (center) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${center[0]},${center[1]}`;
}

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: () => <div className="w-48">Location Name</div>,
    cell: ({ row }) => (
      <div className="w-48 capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <div className="w-36 flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Area
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="w-36 text-left capitalize">{row.getValue("area")}</div>
    ),
  },
  {
    accessorKey: "ndvi",
    header: () => <div className="w-20 text-right">Mean NDVI</div>,
    cell: ({ row }) => {
      const amount = row.getValue("ndvi");
      return <div className="w-20 text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "minndvi",
    header: () => <div className="w-16 text-right">Min NDVI</div>,
    cell: ({ row }) => {
      const amount = row.getValue("minndvi");
      return <div className="w-16 text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "maxndvi",
    header: () => <div className="w-20 text-right">Max NDVI</div>,
    cell: ({ row }) => {
      const amount = row.getValue("maxndvi");
      return <div className="w-20 text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "fromDate",
    header: () => <div className="w-[5.5rem] text-right">From Date</div>,
    cell: ({ row }) => {
      const fDate = formatDate(row.getValue("fromDate"));
      return <div className="w-[5.5rem] text-right font-medium">{fDate}</div>;
    },
  },
  {
    accessorKey: "toDate",
    header: () => <div className="w-[5.5rem] text-right">To Date</div>,
    cell: ({ row }) => {
      const tDate = formatDate(row.getValue("toDate"));
      return <div className="w-[5.5rem] text-right font-medium">{tDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="w-8"></div>,
    cell: ({ row }) => {
      const ndviPolygon = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <a
                href={getMapUrl(ndviPolygon.coordinates[0])}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Location
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ManageLocations = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ndviPolygons, loading, setNdviPolygons } = useNdvi();

  // Memoize the data to prevent unnecessary re-renders
  const data = useMemo(() => {
    // Force a new array reference when ndviPolygons changes
    return [...ndviPolygons];
  }, [ndviPolygons]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Set initial page size to 10 but allow it to grow based on container height
    initialState: {
      pagination: {
        pageSize: Math.max(10, Math.floor((window.innerHeight - 280) / 53)) // 53px is approx height of each row
      }
    }
  });
  console.log("ndviPolygons", ndviPolygons);

  const handleUpdateNDVI = async () => {
    try {
      setIsSubmitting(true);
      const selectedRows = table.getSelectedRowModel().rows;
      const selectedData = selectedRows.map((row) => row.original);
      if (selectedData.length > 10) {
        toast({
          variant: "warning",
          title: "Warning",
          description: "You can only select 10 rows at a time",
        });
        setIsSubmitting(false);
        return;
      }
      const payload = {
        locations: selectedData.map((item) => ({
          place_name: item.name,
          coordinates: item.coordinates,
        })),
      };
      const apiresponse = await updateNDVIData(payload);
      if (apiresponse.code === 200) {
        // Format the updated data first
        const formattedUpdates = formatNDVIData(apiresponse.data.results);
        console.log("formattedUpdates", formattedUpdates);
        
        setNdviPolygons((prevPolygons) => {
          const updatedPolygons = [...prevPolygons];
          
          // Create a map of existing polygons for faster lookup
          const polygonMap = new Map(
            prevPolygons.map(p => [`${p.name}-${p.area}`, p])
          );
          
          // Update only the changed polygons
          formattedUpdates.forEach(updated => {
            const key = `${updated.name}-${updated.area}`;
            const existingPolygon = polygonMap.get(key);
            
            if (existingPolygon) {
              const index = updatedPolygons.findIndex(
                p => p.name === updated.name && p.area === updated.area
              );
              if (index !== -1) {
                updatedPolygons[index] = {
                  ...updated,
                };
              }
            }
          });

          return updatedPolygons;
        });

        toast({
          variant: "success",
          title: "Success",
          description: `Locations updated successfully!`,
        });

        setRowSelection({});
        setIsSubmitting(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update locations. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full w-full pt-6">
      {(loading || isSubmitting) && (
        <div className="absolute my-6 inset-0 bg-black/50 z-[2000] flex items-center justify-center rounded-[10px]">
          <Loader2 className="animate-spin w-10 h-10 text-accent" />
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-4">
        <Input
          placeholder="Filter locations..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            disabled={table.getSelectedRowModel().rows.length < 1}
            onClick={handleUpdateNDVI}
          >
            Update NDVI
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollArea className="rounded-md border border-slate-300 ">
        <Table>
          <TableHeader className="border-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-unset border-slate-300"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <ScrollArea className="h-[calc(100dvh-338px)] md:h-[calc(100dvh-280px)]">
          <Table>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-slate-100 data-[state=selected]:bg-slate-100 border-slate-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageLocations;
