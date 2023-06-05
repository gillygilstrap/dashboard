import Layout from "./Components/Layout";
import MainDashboard from "./Components/MainDashboard";
import Orders from "./Components/Orders";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainDashboard />} />
      <Route path="orders" element={<Orders />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
