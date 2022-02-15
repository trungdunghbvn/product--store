import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/product-listing/Home";
import Detail from "./components/product-detail/Detail";
import "./App.css";

function App() {
  return (
    <div id="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Detail />}>
            <Route path=":p" element={<Detail />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
