import { flexRender, Row, HeaderGroup } from "@tanstack/react-table";
import { Button, Tooltip } from "@mui/material";
import { Share01 } from "@untitled-ui/icons-react";
import { useState, useEffect } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import ReusableTable from "@/common/Table/ReuseableTable";
import { Pagination } from "@/common/Table/Pagination";
import Search from "@/common/Table/Search";

import Filter from "@/common/Table/Filter";

import { generatePath, useNavigate } from "react-router-dom";
import { routeEnum } from "@/constants/RouteConstants";
import TableText from "@/common/Table/TableText";
import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import { TABLE_ROW_TYPE } from "@/constants/enums";
import { useQuery } from "@/hooks/useQuery";
import TableSkeletonLoader from "@/common/Table/TableSkeletonLoader";
import TableEmpty from "@/common/Table/TableEmpty";
import { User } from "@/types/user";
import LoadingContent from "@/common/LoadingContent/LoadingContent";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import TableError from "@/common/Table/TableError";
import { exportToCSV } from "@/helpers/exportToCSV";
import { PAGINATION_DEFAULT } from "@/constants/AppConstants";

const ProductTable = () => {
  const query = useQuery();
  const { showErrorSnackbar } = useExtendedSnackbar();
  const navigate = useNavigate();

  const handleGotoProfile = (id: string) => {
    const route = generatePath(routeEnum.PRODUCT_DETAILS, {
      id,
    });
    navigate(route);
  };

  const columns: ColumnDef<any, any>[] = [
    // { accessorKey: "id", header: "Product ID" },
    { accessorKey: "name", header: "Product's Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "price", header: "Cost" },
    { accessorKey: "stock", header: "In-Stock" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "subcategory", header: "Sub Category" },
  ];

  // Custom renderHeader function
  const renderHeader = (headerGroup: HeaderGroup<User>) => (
    <>
      {headerGroup.headers.map((header) => (
        <th key={header.id} className="py-3 font-medium p-6">
          <div
            {...{
              onClick: header.column.getToggleSortingHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted()
              ? header.column.getIsSorted() === "desc"
                ? " ▼"
                : " ▲"
              : null}
          </div>
        </th>
      ))}
    </>
  );

  // Custom renderRow function
  const renderRow = (row: Row<User>) => (
    <tr
      key={row.id}
      className="py-5 border-b-1 border-[#EAECF0] hover:bg-[#F3F4F7] cursor-pointer"
    >
      {row.getVisibleCells().map((cell) => {
        // Name
        if (cell.column.id === "name") {
          return (
            <td
              key={cell.id}
              onClick={() => handleGotoProfile(cell.row.original.id)}
              className="py-4 p-6"
            >
              <TableText
                value={cell.row.original}
                type={TABLE_ROW_TYPE.PRODUCT_NAME}
              />
            </td>
          );
        }

        // Cost
        if (cell.column.id === "price") {
          return (
            <td
              key={cell.id}
              onClick={() => handleGotoProfile(cell.row.original.id)}
              className="py-4 p-6"
            >
              <TableText
                value={cell.row.original}
                type={TABLE_ROW_TYPE.PRICE}
              />
            </td>
          );
        }

        // In Stock
        if (cell.column.id === "stock") {
          return (
            <td
              key={cell.id}
              onClick={() => handleGotoProfile(cell.row.original.id)}
              className="py-4 p-6"
            >
              <TableText
                value={cell.row.original}
                type={TABLE_ROW_TYPE.STOCK}
              />
            </td>
          );
        }

        // Category
        if (cell.column.id === "category") {
          return (
            <td
              key={cell.id}
              onClick={() => handleGotoProfile(cell.row.original.id)}
              className="py-4 p-6"
            >
              <TableText
                value={cell.row.original}
                type={TABLE_ROW_TYPE.CATEGORY}
              />
            </td>
          );
        }
        
        // Sub Category
        if (cell.column.id === "subcategory") {
          return (
            <td
              key={cell.id}
              onClick={() => handleGotoProfile(cell.row.original.id)}
              className="py-4 p-6"
            >
              <TableText
                value={cell.row.original}
                type={TABLE_ROW_TYPE.SUB_CATEGORY}
              />
            </td>
          );
        }
        // Default
        return (
          <td
            key={cell.id}
            onClick={() => handleGotoProfile(cell.row.original.id)}
            className={`py-4 p-6 ${
              cell.column.id === "action" ? "action-column" : ""
            }`}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );

  const [pageIndex, setPageIndex] = useState(PAGINATION_DEFAULT.page);
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT.limit);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const productStatus = query.get("tab") || "";

  // State for filters
  const [isDeleted, setIsDeleted] = useState<boolean | undefined>(false);
  const [isRequestDelete, setIsRequestDelete] = useState<boolean | undefined>(
    false
  );

  // Fetch the products using your actual API
  const {
    data: productsResponse, // Fetch the response which contains the result and other meta info
    isLoading,
    isError,
    refetch,
    error,
  } = ApiProductStoreSlice.useGetProductsQuery({
    pageIndex,
    pageSize,
    sorting,
    globalFilter,
    isDeleted, // Pass isDeleted filter
    isRequestDelete, // Pass isRequestDelete filter
    productStatus,
  });

  const products = productsResponse?.data?.results || [];

  // Transform data based on filter logic
  const filteredProducts = products.filter((product: any) => {
    const isDeletedMatch = isDeleted
      ? product.accountEnabled === isDeleted
      : true;
    const requestDeleteMatch = isRequestDelete
      ? product.approval === isRequestDelete
      : true;

    if (isDeleted || !isRequestDelete) return product;

    return isDeletedMatch && requestDeleteMatch;
  });

  const pageCount = productsResponse?.data?.pageCount;

  const fetchData = (
    pageIndex: number,
    pageSize: number,
    sorting: SortingState,
    globalFilter: string
  ) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSorting(sorting);
    setGlobalFilter(globalFilter);
    setIsDeleted(isDeleted);
    setIsRequestDelete(isRequestDelete);
  };

  useEffect(() => {
    fetchData(pageIndex, pageSize, sorting, globalFilter);
  }, [pageIndex, pageSize, sorting, globalFilter, isDeleted, isRequestDelete]);

  if (isError) {
    showErrorSnackbar(error?.message || "Error occured");
  }

  const handleExportCSV = () => {
    exportToCSV(filteredProducts, "table_data");
  };

  return (
    <>
      {filteredProducts.length <= 0 ? (
        <div className="flex items-center gap-3 mt-4">
          <Search
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          <Filter
            isDeleted={isDeleted}
            setIsDeleted={setIsDeleted}
            isRequestDelete={isRequestDelete}
            setIsRequestDelete={setIsRequestDelete}
          />

          <Button
            variant="outlined"
            startIcon={<Share01 width={20} height={20} />}
            className="capitalize font-bold font-inter flex items-center justify-center"
            size="medium"
            onClick={handleExportCSV}
          >
            <Tooltip title="Download CSV">
              <p>Export</p>
            </Tooltip>
          </Button>
        </div>
      ) : null}

      <LoadingContent
        loading={isLoading}
        error={isError}
        onReload={refetch}
        loadingContent={<TableSkeletonLoader />}
        errorContent={<TableError onReload={() => refetch()} />}
        emptyContent={<TableEmpty />}
        data={filteredProducts}
      >
        <ReusableTable
          columns={columns}
          data={filteredProducts}
          pageCount={pageCount}
          fetchData={fetchData}
          PaginationComponent={Pagination}
          SearchComponent={Search}
          FilterComponent={
            <Filter
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
              isRequestDelete={isRequestDelete}
              setIsRequestDelete={setIsRequestDelete}
            />
          }
          ExportComponent={
            <Button
              variant="outlined"
              startIcon={<Share01 width={20} height={20} />}
              className="capitalize font-bold font-inter flex items-center justify-center"
              size="medium"
              onClick={handleExportCSV}
            >
              <Tooltip title="Download CSV">
                <p>Export</p>
              </Tooltip>
            </Button>
          }
          renderHeader={renderHeader}
          renderRow={renderRow}
        />
      </LoadingContent>
    </>
  );
};

export default ProductTable;