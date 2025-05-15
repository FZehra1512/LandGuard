import { useState, useMemo, useEffect } from "react";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useContext } from "react";
import { UsersContext } from "../../index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="w-40 flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-1"
          >
            Username
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="w-56">Email</div>,
    cell: ({ row }) => <div className="w-56">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "userType",
    header: ({ column }) => {
      return (
        <div className="w-36 flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-1"
          >
            User Type
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="w-36 text-left capitalize">
        {row.getValue("userType")}
      </div>
    ),
  },
  {
    accessorKey: "joinedOn",
    header: () => <div className="w-32">Joined On</div>,
    cell: () => <div className="w-32">16-05-2025</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="w-8"></div>,
    cell: ({ row }) => {
      const handleDelete = () => {
        // Handle delete logic here
        // console.log("Deleting user:", row.original);
      };

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
            {row.original.userType === "admin" ? (
              <DropdownMenuItem>Edit</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>Promote to Admin</DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => row.toggleSelected(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ManageUsers = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { users, loading } = useContext(UsersContext);

  const data = useMemo(() => {
    return [...users];
  }, [users]);

  const handleDelete = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    // Handle delete logic here
    console.log("Deleting users:", selectedRows.map(row => row.original));
    setShowDeleteDialog(false);
    setRowSelection({});
  };

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
    initialState: {
      pagination: {
        pageSize: Math.max(10, Math.floor((window.innerHeight - 280) / 53)),
      },
    },
  });

  return (
    <div className="relative h-full w-full pt-6">
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {table.getSelectedRowModel().rows.length} selected user(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading && (
        <div className="absolute my-6 inset-0 bg-black/50 z-[2000] flex items-center justify-center rounded-[10px]">
          <Loader2 className="animate-spin w-10 h-10 text-accent" />
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-4">
        <Input
          placeholder="Filter users..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            disabled={table.getSelectedRowModel().rows.length < 1}
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
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

export default ManageUsers;
