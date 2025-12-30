import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export default async function DashboardPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Product Dashboard
      </h1>

      <table
  style={{
    borderCollapse: "collapse",
    width: "60%",
    marginTop: "20px",
  }}
>
  <thead>
    <tr>
      <th style={{ border: "1px solid white", padding: "10px" }}>Name</th>
      <th style={{ border: "1px solid white", padding: "10px" }}>Price</th>
      <th style={{ border: "1px solid white", padding: "10px" }}>Category</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product: any) => (
      <tr key={product._id.toString()}>
        <td style={{ border: "1px solid white", padding: "10px" }}>
          {product.name}
        </td>
        <td style={{ border: "1px solid white", padding: "10px" }}>
          ₹{product.price}
        </td>
        <td style={{ border: "1px solid white", padding: "10px" }}>
          {product.category}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </main>
  );
}