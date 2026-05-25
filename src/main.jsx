import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root";
import "./index.css";
import Home from "./Pages/Home";
import { ThemeProvider } from "./Context/ThemeContext";
import AllModel from "./Pages/AllModels";
import AddModel from "./Pages/AddModel";
import AllModels from "./Pages/AllModels";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'add-model',
        element: <AddModel></AddModel>
      },
      {
        path: 'all-models',
        element: <AllModels></AllModels>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Registration></Registration>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
