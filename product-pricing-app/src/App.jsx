import { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductTable from "./components/ProductTable";
import { calculateProfit } from "./utils/calculateProfit";
import { exportToExcel } from "./utils/exportToExcel";



export default function App() {
  // -------------------- STATE --------------------
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [summaryPercent, setSummaryPercent] = useState(5);

  // -------------------- LOAD FROM LOCALSTORAGE --------------------
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // -------------------- SAVE TO LOCALSTORAGE --------------------
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // -------------------- ADD PRODUCT --------------------
  function addProduct(data) {
    const newProduct = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      quantity: Number(data.quantity),
      unit: data.unit,
      wholesale: Number(data.wholesale),
      retail: data.retail ? Number(data.retail) : "",
      profits: calculateProfit(Number(data.wholesale)),
    };

    setProducts((prev) =>
      [...prev, newProduct].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    );
  }

  // -------------------- DELETE PRODUCT --------------------
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // -------------------- UPDATE PRODUCT (FOR EDIT MODE) --------------------
  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev
        .map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  // -------------------- SEARCH FILTER --------------------
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // -------------------- SUMMARY CALCULATIONS --------------------
  const totalWholesale = filteredProducts.reduce(
    (sum, p) => sum + p.wholesale,
    0
  );

  const totalSelling = filteredProducts.reduce(
    (sum, p) => sum + p.profits[summaryPercent].sellingPrice,
    0
  );

  const totalProfit = totalSelling - totalWholesale;
 <div className="flex justify-end mb-4">
  <button
    onClick={() => exportToExcel(filteredProducts)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
  >
    Export to Excel
  </button>
</div>


  // -------------------- UI --------------------
 return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">
        Product Pricing & Profit Calculator
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-64"
      />

      {/* Summary selector */}
      <div className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded">
        <span className="font-medium">Summary Profit %:</span>
        <select
          value={summaryPercent}
          onChange={(e) =>
            setSummaryPercent(Number(e.target.value))
          }
          className="border px-3 py-2 rounded"
        >
          <option value={2}>2%</option>
          <option value={4}>4%</option>
          <option value={5}>5%</option>
          <option value={8}>8%</option>
          <option value={10}>10%</option>
        </select>
      </div>

      {/* ✅ EXPORT BUTTON — THIS WILL SHOW */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => exportToExcel(filteredProducts)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
        >
          Export to Excel
        </button>
      </div>

      {/* Add Product */}
      <AddProductForm onAdd={addProduct} />

      {/* Table */}
      <ProductTable
        products={filteredProducts}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
      />

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Wholesale</p>
          <p className="text-xl font-bold">
            ₹{totalWholesale.toFixed(2)}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">
            Total Selling ({summaryPercent}%)
          </p>
          <p className="text-xl font-bold">
            ₹{totalSelling.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Profit</p>
          <p className="text-xl font-bold text-green-700">
            ₹{totalProfit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  </div>
);
}