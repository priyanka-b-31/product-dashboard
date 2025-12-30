"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    setName("");
    setPrice("");
    setStock("");
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading...</p>;
  }

  return (
    <main style={container}>
      <h1 style={title}>Admin Dashboard</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} style={form}>
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={input}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={input}
        />

        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          style={input}
        />

        <button type="submit" style={addBtn}>
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Product Name</th>
            <th style={th}>Price (₹)</th>
            <th style={th}>Stock</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr
              key={p._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
              }}
            >
              <td style={td}>{p.name}</td>
              <td style={td}>₹{p.price}</td>
              <td
                style={{
                  ...td,
                  color: p.stock > 0 ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {p.stock}
              </td>
              <td style={td}>
                <button
                  onClick={() => deleteProduct(p._id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

/* ---------- Styles ---------- */

const container = {

  padding: "40px",
  backgroundColor: "#f1f5f9",
  minHeight: "100vh",
  color: "#000000",   // 👈 force black text
};

 

const title = {
  fontSize: "28px",
  marginBottom: "20px",
  color: "#1e293b",
};

const form = {
  display: "flex",
  gap: "10px",
  marginBottom: "25px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  color: "#000000",        // 👈 text black
  backgroundColor: "#fff" // 👈 input background white
};

const addBtn = {
  backgroundColor: "#22c55e",
  color: "white",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const th = {
  padding: "14px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  textAlign: "left" as const,
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  color: "#000000",
};


const deleteBtn = {
  backgroundColor: "#ef4444",
  color: "#ffffff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

