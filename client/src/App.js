import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Transactions from "./components/Transactions";
import Welcome from "./components/Welcome";

function App() {
  return (
    <>
      <div className="gradient-bg-welcome py-3 px-10 sm:px-20 lg:px-40 text-white">
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
        <Footer />
      </div>
    </>
  );
}

export default App;
