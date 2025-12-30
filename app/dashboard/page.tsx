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

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={th}>Name</th>
            <th style={th}>Price</th>
            <th style={th}>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={td}>{p.name}</td>
              <td style={td}>₹{p.price}</td>
              <td style={td}>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left" as const,
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
};
