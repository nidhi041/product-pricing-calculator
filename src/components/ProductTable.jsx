import ProductRow from "./ProductRow";

export default function ProductTable({ products, onDelete, onUpdate  })  {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      {[
        "Product",
        "Qty",
        "Wholesale",
        "Retail",
        "2%",
        "4%",
        "5%",
        "8%",
        "10%",
        "Actions",
      ].map((h) => (
        <th key={h} className="border px-3 py-2 text-sm">
          {h}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {products.map((p) => (
      <ProductRow
        key={p.id}
        product={p}
        onDelete={onDelete}
         onUpdate={onUpdate}
      />
    ))}
  </tbody>
</table>

    </div>
  );
}
