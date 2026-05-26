import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root";
import "./index.css";
import Home from "./Pages/Home";
import { ThemeProvider } from "./Context/ThemeContext";
import AddModel from "./Pages/AddModel";
import AllModels from "./Pages/AllModels";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Components/PrivateRoute";
import ModelDetails from "./Pages/ModelDetails";
import Purchase from "./Pages/Purchase";
import MyModels from "./Pages/MyModels";

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
        path: "add-model",
        element: 
          <PrivateRoute><AddModel></AddModel></PrivateRoute>,
      },
      {
        path: "all-models",
        element: <AllModels></AllModels>,
      },
      {
        path: "model/:id",
        element:<PrivateRoute><ModelDetails></ModelDetails></PrivateRoute>  ,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
      {
        path: 'purchase',
        element: <PrivateRoute><Purchase></Purchase></PrivateRoute>,
      },
      {
        path: 'my-models',
        element: <PrivateRoute><MyModels></MyModels></PrivateRoute>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
