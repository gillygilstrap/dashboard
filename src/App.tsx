import Layout from "./Components/pages/Layout";
import MainDashboard from "./Components/pages/MainDashboard";
import Orders from "./Components/pages/Orders";
import Users from "./Components/pages/Users";
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
      <Route path="users" element={<Users />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
