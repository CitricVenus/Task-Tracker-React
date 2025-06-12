import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 bg-light py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-2">
        <div className="container">
          <small>Task Tracker &copy; {new Date().getFullYear()}</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
