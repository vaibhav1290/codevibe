import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import CodeEditor from "./components/Editor/CodeEditor";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/editor" element={<CodeEditor />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
