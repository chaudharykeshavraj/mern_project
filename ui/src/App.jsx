import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./components/Login"; // Optional
import AddBookPage from "./pages/AddBookPage"; // ✅ Also import AddBookPage

function App() {
  return (
    <Router>
      <Routes>

        {/* Dashboard pages with layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="students" element={<Students />} />
        </Route>

        {/* Optional: Separate route for login (outside layout) */}
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
