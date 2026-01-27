import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import "antd/dist/reset.css";

import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 8,
          fontFamily: "Inter, system-ui, sans-serif",
        },
        components: {
          Card: {
            boxShadowTertiary: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          Button: {
            controlHeightLG: 48,
          }
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);

