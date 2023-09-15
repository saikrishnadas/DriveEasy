import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Trips from "./components/Trips";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trip-history" element={<Trips />} />
        <Route path="/settings" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
