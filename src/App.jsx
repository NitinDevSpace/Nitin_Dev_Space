import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Projects from "./pages/Projects";
import NavBar from "./components/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/Nitin_Dev_Space" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/projects" element={<Projects />} />
			</Routes>
		</>
	);
}

export default App;
