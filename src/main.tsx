import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./app/layout/MainLayout";
import LoginPage from "./app/pages/LoginPage";
import Error404Page from "./app/pages/Error404Page";
import { Toaster } from "react-hot-toast";
import InitPollPage from "./app/pages/InitPollPage";
import PollPage from "./app/pages/PollPage";
import CategoryPage from "./app/pages/CategoryPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <Error404Page />
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/categories",
        element: <CategoryPage />
      },
      {
        path: "/p",
        element: <InitPollPage />,
      },
      {
        path: "/p/:id",
        element: <PollPage />,
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
