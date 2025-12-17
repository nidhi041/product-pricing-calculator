import { useState } from "react";
import { calculateProfit } from "../utils/calculateProfit";

export default function ProductRow({ product, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...product });

  function handleChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    const updatedProduct = {
      ...product,
      name: editData.name.trim(),
      quantity: Number(editData.quantity),
      unit: editData.unit,
      wholesale: Number(editData.wholesale),
      retail: editData.retail ? Number(editData.retail) : "",
      profits: calculateProfit(Number(editData.wholesale)),
    };

    onUpdate(updatedProduct);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditData({ ...product });
    setIsEditing(false);
  }

  return (
    <tr className="hover:bg-gray-50">
      {/* Product Name */}
      <td className="border px-3 py-2">
        {isEditing ? (
          <input
            name="name"
            value={editData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        ) : (
          product.name
        )}
      </td>

      {/* Quantity */}
      <td className="border px-3 py-2">
        {isEditing ? (
          <div className="flex gap-1">
            <input
              type="number"
              name="quantity"
              value={editData.quantity}
              onChange={handleChange}
              className="border px-2 py-1 w-16"
            />
            <select
              name="unit"
              value={editData.unit}
              onChange={handleChange}
              className="border px-2 py-1"
            >
              <option>kg</option>
              <option>gm</option>
              <option>ml</option>
            </select>
          </div>
        ) : (
          `${product.quantity} ${product.unit}`
        )}
      </td>

      {/* Wholesale */}
      <td className="border px-3 py-2">
        {isEditing ? (
          <input
            type="number"
            name="wholesale"
            value={editData.wholesale}
            onChange={handleChange}
            className="border px-2 py-1 w-24"
          />
        ) : (
          `₹${product.wholesale}`
        )}
      </td>

      {/* Retail */}
      <td className="border px-3 py-2">
        {isEditing ? (
          <input
            type="number"
            name="retail"
            value={editData.retail}
            onChange={handleChange}
            className="border px-2 py-1 w-24"
          />
        ) : (
          product.retail ? `₹${product.retail}` : "-"
        )}
      </td>

      {/* Profit columns */}
      {[2, 4, 5, 8, 10].map((p) => {
        const profits = isEditing
          ? calculateProfit(Number(editData.wholesale))[p]
          : product.profits[p];

        return (
          <td key={p} className="border px-3 py-2 text-xs">
            <div className="font-semibold">₹{profits.sellingPrice}</div>
            <div className="text-green-600">+₹{profits.profit}</div>
          </td>
        );
      })}

      {/* Actions */}
      <td className="border px-3 py-2 text-center">
        {isEditing ? (
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleSave}
              className="text-green-600 font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
