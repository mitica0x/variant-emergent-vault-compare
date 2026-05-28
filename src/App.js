import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import FindMyExchange from "./pages/FindMyExchange";
import Cards from "./pages/Cards";
import News from "./pages/News";
import Article from "./pages/Article";
import Advertise from "./pages/Advertise";
import About from "./pages/About";

function App() {
  return (
    <div className="App min-h-screen bg-bg text-txt">
      <BrowserRouter>
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
