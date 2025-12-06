import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import NewParts from "./pages/newParts/NewParts";
import UsedParts from "./pages/usedParts/UsedParts";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Videos from "./pages/videos/Videos";
import BmwGroup from "./pages/bmwGroup/BmwGroup";
import VwGroup from "./pages/vwGroup/VwGroup";
import Articles from "./pages/articles/Articles";
import ArticleDetails from "./pages/articleDetails/ArticleDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/admin/Login";
import CarWashing from "./pages/washing/CarWashing";

// Import components
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-parts" element={<NewParts />} />
            <Route path="/used-parts" element={<UsedParts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/bmw-group" element={<BmwGroup />} />
            <Route path="/vw-group" element={<VwGroup />} />
            <Route path="/car-washing" element={<CarWashing />} />
            <Route path="/admin-login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
