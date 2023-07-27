import React from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ExpansePage from "./pages/ExpansePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/income" element={<IncomePage/>}/>
          <Route path="/expanse" element={<ExpansePage/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    
    </div>
  );
};

export default App;
