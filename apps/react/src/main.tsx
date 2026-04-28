import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";

import App from "./app";

import { flow, Shape } from "./flow";
import { listFlow, ListShape } from "./flow.list";
import { conditionFlow, ConditionShape } from "./flow.condition";
import { loopFlow, LoopShape } from "./flow.loop";
import { switchFlow, SwitchShape } from "./flow.switch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App<Shape> flow={flow} />} />
        <Route path="/flow/list" element={<App<ListShape> flow={listFlow} />} />
        <Route
          path="/flow/cond"
          element={<App<ConditionShape> flow={conditionFlow} />}
        />
        <Route path="/flow/loop" element={<App<LoopShape> flow={loopFlow} />} />
        <Route
          path="/flow/switch"
          element={<App<SwitchShape> flow={switchFlow} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
