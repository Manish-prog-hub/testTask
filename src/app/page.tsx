import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Navbar />
      <Table />
    </main>
  );
}
