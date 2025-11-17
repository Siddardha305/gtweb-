import Navbar from "./components/navbar/Navbar";
import Hero1 from "./components/home/hero1";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero1 />

      {/* Page content placeholder */}
      <main className="flex items-center justify-center min-h-[40vh] text-center">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Welcome to GT Web & Design 🚀
        </h1>
      </main>
    </div>
  );
}
