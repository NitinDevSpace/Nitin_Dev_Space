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
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/projects" element={<Projects />} />
			</Routes>
			<Footer />
			<div className="h-12"></div>
		</>
	);
}

export default App;
