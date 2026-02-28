import { useDeleteNewsById, useGetAllNews } from "@/services/newsService";
import { INews } from "@/types/news.types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDialogComponent } from "../dialog/ConfirmDialog";
import Spinner from "../spinner/Spinner";
import { Button } from "../ui/button";

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

const NewsTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useGetAllNews({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const newsData = data?.data;
  const paginationData = data?.pagination;

  const deleteNews = useDeleteNewsById();
  const router = useRouter();
  const handleEdit = (item: string) => {
    router.push(`/admin/news/edit/${item}`);
  };

  const handleDelete = (id: string) => {
    deleteNews.mutate(id);
  };

  const table = useReactTable<INews>({
    data: newsData || [],
    columns: column({ onEdit: handleEdit, onDelete: handleDelete }),
    pageCount: paginationData?.totalPages || 0,

    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    manualPagination: true,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-linear-to-r from-gray-50 to-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="font-medium">No data available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-medium">
              Showing {paginationData?.startIndex || 0} to{" "}
              {paginationData?.endIndex || 0} of {paginationData?.total || 0}{" "}
              results
            </span>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-9 px-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 px-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                (pageIndex) => {
                  const currentPage = table.getState().pagination.pageIndex;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageIndex === 0 ||
                    pageIndex === table.getPageCount() - 1 ||
                    Math.abs(pageIndex - currentPage) <= 1
                  ) {
                    return (
                      <Button
                        key={pageIndex}
                        variant={
                          currentPage === pageIndex ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => table.setPageIndex(pageIndex)}
                        className={`h-9 w-9 ${
                          currentPage === pageIndex
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            : ""
                        }`}
                      >
                        {pageIndex + 1}
                      </Button>
                    );
                  } else if (
                    pageIndex === currentPage - 2 ||
                    pageIndex === currentPage + 2
                  ) {
                    return (
                      <span key={pageIndex} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 px-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-9 px-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>

          {/* Page Size Selector */}
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewsTable;
