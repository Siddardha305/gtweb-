import Navbar from "./components/navbar/Navbar";
import Hero1 from "./components/home/hero1";
import Footer from "./components/Footer/page"; 

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans dark:bg-black flex flex-col">

      {/* Hero Section */}
      <Hero1 />

      {/* Page content */}
      {/* <main className="flex items-center justify-center min-h-[40vh] text-center flex-1">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Welcome to GT Web & Design 🚀
        </h1>
      </main> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
