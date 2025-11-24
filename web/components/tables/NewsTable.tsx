import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { INews } from "@/types/news.types";
import { AlertDialogComponent } from "../dialog/ConfirmDialog";
import { Button } from "../ui/button";
import { useDeleteNewsById } from "@/services/newsService";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper<INews>();
const column = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => [
  columnHelper.accessor("_id", {
    header: "ID",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("publishedAt", {
    header: "Published At",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original; // contains full object (_id, title, etc.)
      return (
        <div className="flex items-center gap-3">
          <Button variant={"outline"} onClick={() => onEdit(item._id)}>
            Edit
          </Button>

          <AlertDialogComponent handleContinueClick={() => onDelete(item._id)}>
            <Button variant={"destructive"}>Delete</Button>
          </AlertDialogComponent>
        </div>
      );
    },
  }),
];

const NewsTable = ({ data }: { data: INews[] }) => {
  const deleteNews = useDeleteNewsById();
  const router = useRouter();

  const handleEdit = (item: string) => {
    router.push(`/admin/news/edit/${item}`);
  };

  const handleDelete = (id: string) => {
    deleteNews.mutate(id);
  };
  const table = useReactTable<INews>({
    data,
    columns: column({ onEdit: handleEdit, onDelete: handleDelete }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {table?.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
