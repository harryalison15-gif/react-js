import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = document.getElementById("root");
const queryClient = new QueryClient();
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
