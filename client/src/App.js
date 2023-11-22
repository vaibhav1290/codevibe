import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import Dashboard from "./components/Dashboard/Dashboard";
import ExportEditor from "./components/Editor/ExportEditor";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/editor" element={<ExportEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
