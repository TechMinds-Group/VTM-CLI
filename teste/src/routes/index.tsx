import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export const browserRouter = createBrowserRouter(routes);
