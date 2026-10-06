import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function CookieSetting() {
	const [notice, setNotice] = useState("");

	const openAdChoices = () => {
		if (!window.googlefc?.callbackQueue || typeof window.googlefc.showRevocationMessage !== "function") {
			setNotice("Ad consent choices are not available here yet. You can still manage personalized ads in Google My Ad Center.");
			return;
		}
		window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
	};

	return (
		<>
			<main className="max-w-3xl mx-auto px-6 pt-28 pb-16 text-gray-300 leading-7 space-y-5">
				<h1 className="text-3xl font-semibold text-white">Cookie Settings</h1>
				<p>The site loads a Google AdSense tag. Once approved for ads, Google and its advertising partners may use cookies or similar technologies to show and measure ads. Essential hosting or security technologies may also be used to keep the site working.</p>
				<p>For visitors in the EEA, UK and Switzerland, Google’s consent message provides advertising choices where applicable. You can revisit that message here after it becomes available for this site.</p>
				<button type="button" onClick={openAdChoices} className="rounded-lg bg-accent2 px-4 py-2 text-black font-semibold">Review ad consent choices</button>
				{notice && <p role="status">{notice}</p>}
				<p>You can also manage personalized advertising in{" "}<a className="text-accent2 underline" href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Google My Ad Center</a>. Read our{" "}<Link className="text-accent2 underline" to="/privacy-policies">Privacy Policy</Link> for more details about data use.</p>
			</main>
			<Footer />
		</>
	);
}

export default CookieSetting;
