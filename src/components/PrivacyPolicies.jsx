import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function PrivacyPolicies() {
	return (
		<>
			<main className="max-w-3xl mx-auto px-6 pt-28 pb-16 text-gray-300 leading-7 space-y-8">
				<h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
				<p>
					Nitin Dev Space is operated by Nitin Kumar. This policy covers
					nitindevspace.com and the Nitin Dev Space Android app, which displays
					the website in a WebView. Contact us at{" "}
					<a className="text-accent2 underline" href="mailto:nitindevspace@gmail.com">nitindevspace@gmail.com</a>
					{" "}with privacy questions or requests.
				</p>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Information we receive</h2>
					<ul className="list-disc pl-6 space-y-2">
						<li>When you contact us, we receive your name, email address, optional phone number, subject and message.</li>
						<li>When you leave feedback, we receive the rating, any feedback text and the submission date.</li>
						<li>Our hosting and database services may process technical information such as IP address, browser or device type, request time and error logs when the site or app is used.</li>
						<li>The Android app opens a system file picker when you choose a file to upload and uses the device download service when you download a file. Files you select are sent to the website or service you choose to use.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">How we use it</h2>
					<p>We use contact details to answer your enquiry, feedback to improve the site, and technical information to operate, secure and troubleshoot the service. We do not sell contact form or feedback submissions.</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Advertising and cookies</h2>
					<p>We have installed the Google AdSense tag and may show Google ads once the site is approved. Google and other advertising partners may use cookies or similar identifiers to show and measure ads, including ads based on visits to this and other sites. Ad availability and personalization depend on your region and privacy choices.</p>
					<p>Google explains how it uses information from partner sites in its{" "}
						<a className="text-accent2 underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">partner-sites policy</a>. You can manage personalized ads in{" "}
						<a className="text-accent2 underline" href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Google My Ad Center</a>, and eligible visitors can revisit the consent choices described on our{" "}
						<Link className="text-accent2 underline" to="/cookie-settings">Cookie Settings page</Link>.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Service providers and external links</h2>
					<p>We use hosting and database providers to run the site and store submissions. Google may process information when its advertising tag or ads are used. Links to GitHub, LinkedIn and other websites lead to services with their own privacy practices.</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Retention and your choices</h2>
					<p>Contact messages and feedback currently have no automatic deletion date. Email nitindevspace@gmail.com to ask what information we hold about you or to request correction or deletion. Include enough detail for us to find your submission; we may need to verify that the request is yours. Some information may need to be retained for security or legal reasons.</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Security and children</h2>
					<p>The website uses HTTPS to protect information in transit. No online service can guarantee complete security. The site and app are not designed for children, and we do not knowingly seek personal information from them.</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Updates</h2>
					<p>We will update this page when our data practices change. Last updated: 6 October 2026.</p>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default PrivacyPolicies;
