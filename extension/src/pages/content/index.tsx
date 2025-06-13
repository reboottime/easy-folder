import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import "./style.css";

import Sidebar from "./components/Sidebar";
import queryClient from "./queryClient";

function init() {
  const div = document.createElement("div");
  div.id = "__root";
  document.body.appendChild(div);

  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Content root element");

  const root = createRoot(rootContainer);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Sidebar />
    </QueryClientProvider>,
  );

  try {
    console.log("content script loaded");
  } catch (e) {
    console.error(e);
  }
}

init();
