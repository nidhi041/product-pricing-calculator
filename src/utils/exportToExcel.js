import * as XLSX from "xlsx";

export function exportToExcel(products) {
  const data = products.map((p) => ({
    Product: p.name,
    Quantity: `${p.quantity} ${p.unit}`,
    "Wholesale (₹)": p.wholesale,
    "Retail (₹)": p.retail || "",
    "Selling @2%": p.profits[2].sellingPrice,
    "Profit @2%": p.profits[2].profit,
    "Selling @4%": p.profits[4].sellingPrice,
    "Profit @4%": p.profits[4].profit,
    "Selling @5%": p.profits[5].sellingPrice,
    "Profit @5%": p.profits[5].profit,
    "Selling @8%": p.profits[8].sellingPrice,
    "Profit @8%": p.profits[8].profit,
    "Selling @10%": p.profits[10].sellingPrice,
    "Profit @10%": p.profits[10].profit,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Products"
  );

  XLSX.writeFile(workbook, "product-pricing.xlsx");
}
