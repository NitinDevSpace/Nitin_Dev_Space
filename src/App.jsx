import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import NavBar from "./components/NavBar";
import NotFound from "./components/404NotFound";
import PrivacyPolicies from "./components/PrivacyPolicies";
import TermsConditions from "./components/TermsConditions";
import CookieSetting from "./components/CookieSetting";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/privacy-policies" element={<PrivacyPolicies />} />
				<Route path="/terms-conditions" element={<TermsConditions />} />
				<Route path="/cookie-settings" element={<CookieSetting />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
