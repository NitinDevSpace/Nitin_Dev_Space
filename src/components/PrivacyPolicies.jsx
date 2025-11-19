import React from "react";
import Footer from "./Footer";

function PrivacyPolicies() {
	return (
		<>
			<div className="max-w-3xl mx-auto px-6 pt-28 pb-16 text-gray-300 leading-7 space-y-10">
				<h2 className="text-3xl font-semibold mb-6 text-white">
					Privacy Policy
				</h2>
				<p>
					This Privacy Policy applies to both the website and the associated
					Android/mobile applications (“Platform”). By using the Platform, you
					consent to the practices described below.
				</p>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					1. Information Collected
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						Essential technical data such as IP address, browser type, device
						type, timestamps, and basic cookies may be collected automatically.
					</li>
					<li>
						User-submitted data such as comments, likes, form submissions, and
						messages may be stored indefinitely.
					</li>
					<li>
						Future integrations may include analytics tools (Google Analytics,
						Firebase Analytics), ad networks (Google AdSense), and SDKs that may
						collect anonymous behavioral or device data.
					</li>
					<li>
						The Platform may use cookies, local storage, and tracking
						technologies for personalization, analytics, and functionality.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					2. How Your Data Is Used
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						To improve website/app performance, security, and user experience.
					</li>
					<li>
						To moderate, store, display, or manage user-generated content.
					</li>
					<li>To analyze traffic, usage patterns, and platform trends.</li>
					<li>To comply with Indian legal or regulatory requirements.</li>
					<li>
						Future advertising tools may use data for personalized or
						non-personalized ads.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					3. Third-Party Services
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						The Platform may integrate services such as Google Analytics, Google
						AdSense, YouTube embeds, cloud hosting, or advertising networks.
					</li>
					<li>
						These services may independently collect and process user data based
						on their own privacy policies.
					</li>
					<li>The owner is not responsible for third-party data practices.</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					4. App Permissions (Android/Mobile)
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						The app may require permissions such as internet access, storage
						read/write, network information, or device identifiers for
						analytics.
					</li>
					<li>
						Future updates may add additional permissions based on app features.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					5. Data Retention
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						User-generated data may be stored indefinitely unless deletion is
						requested and approved at the owner's discretion.
					</li>
					<li>
						Analytics or technical logs may be retained for operational and
						diagnostic purposes.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					6. Data Security
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						Reasonable security measures will be implemented as per IT Act 2000
						and DPDP Act 2023 guidelines.
					</li>
					<li>
						No digital platform is 100% secure, and the owner is not liable for
						breaches beyond reasonable control.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					7. User Rights
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						You may request deletion of your comments or messages, subject to
						the owner's discretion and technical limitations.
					</li>
					<li>
						By using the Platform, you consent to data storage, processing,
						analytics, and future integrations.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					8. Children's Privacy
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>The Platform is not intended for children under 13.</li>
					<li>No known data is intentionally collected from minors.</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					9. Legal Compliance
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>This Privacy Policy is governed by Indian law.</li>
					<li>
						All disputes shall fall strictly under the jurisdiction of the
						courts in the owner's home state/region.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-10 mb-4 text-white">
					10. Future Updates
				</h3>
				<ul className="list-disc list-inside space-y-2">
					<li>
						The owner may update this Privacy Policy at any time without prior
						notice.
					</li>
					<li>
						Your continued use of the Platform constitutes acceptance of updated
						terms.
					</li>
				</ul>

				<p>
					If you have any questions or concerns about this Privacy Policy,
					please contact the owner through the provided contact methods on the
					Platform.
				</p>
				<p>Last updated: Nov 2025</p>
			</div>
			<Footer />
		</>
	);
}

export default PrivacyPolicies;
