import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import FindMyExchange from "./pages/FindMyExchange";
import Cards from "./pages/Cards";
import News from "./pages/News";
import Article from "./pages/Article";
import Advertise from "./pages/Advertise";
import About from "./pages/About";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <div className="App min-h-screen bg-bg text-txt">
      <LoadingScreen isVisible={loading} onComplete={() => setLoading(false)} />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/find-my-exchange" element={<FindMyExchange />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<Article />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
