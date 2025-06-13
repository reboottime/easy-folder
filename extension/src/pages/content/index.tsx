import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";

import "./style.css";

import Sidebar from "./components/Sidebar";
import queryClient from "./queryClient";

function init() {
  const container = document.querySelector('._7780f2e') ?? document.body;
  container.classList.add('flexg');
  container.classList.add('gap-6');
  const div = document.createElement("div");
  div.id = "deepseekHelper";
  container.appendChild(div);

  const rootContainer = document.querySelector("#deepseekHelper");
  if (!rootContainer) throw new Error("Can't find Content root element");

  const root = createRoot(rootContainer);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <Toaster />
    </QueryClientProvider>,
  );
}

init();
