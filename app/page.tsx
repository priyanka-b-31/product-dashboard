import { connectDB } from "@/lib/db";

export default async function Home() {
  // connect to MongoDB (server-side)
  await connectDB();

  return (
    <main style={{ padding: "40px", fontSize: "20px" }}>
      <h1>SSR E-commerce Admin Dashboard</h1>
      <p>Project setup successful 🚀</p>
      <p style={{ color: "green", marginTop: "20px" }}>
        MongoDB connected successfully ✅
      </p>
    </main>
  );
}

