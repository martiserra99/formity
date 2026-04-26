import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";

import App from "./app";

import { flow, Definition } from "./flow";
import { listFlow, ListDefinition } from "./flow.list";
import { conditionFlow, ConditionDefinition } from "./flow.condition";
import { loopFlow, LoopDefinition } from "./flow.loop";
import { switchFlow, SwitchDefinition } from "./flow.switch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App<Definition> flow={flow} />} />
        <Route
          path="/flow/list"
          element={<App<ListDefinition> flow={listFlow} />}
        />
        <Route
          path="/flow/cond"
          element={<App<ConditionDefinition> flow={conditionFlow} />}
        />
        <Route
          path="/flow/loop"
          element={<App<LoopDefinition> flow={loopFlow} />}
        />
        <Route
          path="/flow/switch"
          element={<App<SwitchDefinition> flow={switchFlow} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
