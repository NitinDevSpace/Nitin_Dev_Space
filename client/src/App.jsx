import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Projects from "./pages/Projects";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/blogs" element={<Blogs />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/feedback" element={<Feedback />} />
			<Route path="/projects" element={<Projects />} />
		</Routes>
	);
}

export default App;
