import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/Editor/CodeEditor";
import Chat from "./components/Chat/Chat";
import LandingPage from "./components/Landing/LandingPage";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/editor" element={<CodeEditor />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
