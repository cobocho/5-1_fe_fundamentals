import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "@/App";
import "@/styles/reset.css";
import { AsyncBoundary, DefaultError } from "@/components";

async function enableMocking() {
  const { worker } = await import("@/mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AsyncBoundary errorFallback={DefaultError}>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </AsyncBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
