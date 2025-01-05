import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";

import App from "./app";

import { mainSchema, MainValues } from "./schemas/main";
import { listSchema, ListValues } from "./schemas/flow.list";
import { condSchema, CondValues } from "./schemas/flow.cond";
import { loopSchema, LoopValues } from "./schemas/flow.loop";
import { switchSchema, SwitchValues } from "./schemas/flow.switch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App<MainValues> schema={mainSchema} />} />
        <Route
          path="/flow/list"
          element={<App<ListValues> schema={listSchema} />}
        />
        <Route
          path="/flow/cond"
          element={<App<CondValues> schema={condSchema} />}
        />
        <Route
          path="/flow/loop"
          element={<App<LoopValues> schema={loopSchema} />}
        />
        <Route
          path="/switch"
          element={<App<SwitchValues> schema={switchSchema} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
