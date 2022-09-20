import "./assets/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreditDrillDown from "./components/CreditDrillDown";
import DebitDrillDown from "./components/DebitDrillDown";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="credit-drill-down/:len" element={<CreditDrillDown />} />
          <Route path="Debit-drill-down" element={<DebitDrillDown />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
