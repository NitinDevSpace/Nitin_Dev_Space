import React from "react";
import Footer from "./Footer";

function CookieSetting() {
	return (
		<>
			<div className="max-w-3xl mx-auto px-6 pt-28 pb-12 text-gray-300 leading-7">
				<h2 className="text-3xl font-semibold mb-6 text-white">
					Cookie Settings
				</h2>
				<p style={{ marginBottom: "12px" }}>
					This website currently does <strong>not</strong> use any cookies or
					tracking technologies.
				</p>
				<p>
					If cookie usage is introduced in the future, users will be notified
					and given full control over their preferences.
				</p>
			</div>
			<Footer />
		</>
	);
}

export default CookieSetting;
