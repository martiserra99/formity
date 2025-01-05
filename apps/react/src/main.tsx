import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./routes/app";
import Form from "./routes/item.form";
import Yield from "./routes/item.yield";
import Return from "./routes/item.return";
import Variables from "./routes/item.variables";
import Cond from "./routes/item.cond";
import Loop from "./routes/item.loop";
import Switch from "./routes/item.switch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<Form />} />
        <Route path="/yield" element={<Yield />} />
        <Route path="/return" element={<Return />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/cond" element={<Cond />} />
        <Route path="/loop" element={<Loop />} />
        <Route path="/switch" element={<Switch />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
