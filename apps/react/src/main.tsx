import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";

import App from "./app";

import { flow, Schema } from "./flow";
import { listFlow, ListSchema } from "./flow.list";
import { conditionFlow, ConditionSchema } from "./flow.condition";
import { loopFlow, LoopSchema } from "./flow.loop";
import { switchFlow, SwitchSchema } from "./flow.switch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App<Schema> flow={flow} />} />
        <Route
          path="/flow/list"
          element={<App<ListSchema> flow={listFlow} />}
        />
        <Route
          path="/flow/cond"
          element={<App<ConditionSchema> flow={conditionFlow} />}
        />
        <Route
          path="/flow/loop"
          element={<App<LoopSchema> flow={loopFlow} />}
        />
        <Route
          path="/flow/switch"
          element={<App<SwitchSchema> flow={switchFlow} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
