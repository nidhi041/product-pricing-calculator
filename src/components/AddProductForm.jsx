import { useState } from "react";

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    wholesale: "",
    retail: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.wholesale || !form.quantity) return;

    onAdd(form);

    setForm({
      name: "",
      quantity: "",
      unit: "kg",
      wholesale: "",
      retail: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6 flex-wrap"
    >
      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-40"
      />

      <input
        name="quantity"
        type="number"
        placeholder="Qty"
        value={form.quantity}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-24"
      />

      <select
        name="unit"
        value={form.unit}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      >
        <option>kg</option>
        <option>gm</option>
        <option>ml</option>
      </select>

      <input
        name="wholesale"
        type="number"
        placeholder="Wholesale ₹"
        value={form.wholesale}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-32"
      />

      <input
        name="retail"
        type="number"
        placeholder="Retail ₹"
        value={form.retail}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-32"
      />

      <button className="bg-blue-600 text-white px-5 py-2 rounded">
        + Add
      </button>
    </form>
  );
}
