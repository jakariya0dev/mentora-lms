import { Outlet } from "react-router";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
