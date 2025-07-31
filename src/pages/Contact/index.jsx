import React from "react";
import Footer from "../../components/Footer";
import {
	Braces,
	Code,
	Github,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Send,
	UserCircle,
} from "lucide-react";

const Contact = () => {
	const openNewWindow = (url) => {
		const newWindow = window.open(url, "_blank", "noopener, noreferrer");
		if (newWindow) newWindow.focus();
	};

	const openEmailClient = () => {
		const email = "nitindevspace@gmail.com";
		const subject = "Let's Connect (From Portfolio)";
		const body = "Hi there,\n\nI'm reaching out to discuss...";

		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;

		window.open(mailtoLink, "_blank");
	};
	return (
		<>
			<section className="relative mx-auto h-full bg-primary flex  items-center justify-center">
				<div className="bg-primary2 w-5/6 h-full mt-80 p-6 shadow-2xl flex flex-col items-center justify-center">
					{/* Top heading */}
					<div className="flex flex-col gap-6 mb-12 text-center">
						<h1 className="text-5xl font-semibold">
							Get In <span className="text-accent1 opacity-90">Touch</span>
						</h1>
						<p className="font-thin text-xl opacity-70">
							Have a project in mind, a question, or just want to connect? I'm
							<br />
							here to listen. Drop me a line!
						</p>
					</div>
					{/* Below Section */}
					<div className="flex w-5/6 mt-12 h-full gap-12">
						{/* Left Section */}
						<div className="flex flex-col gap-12 rounded-lg border border-accent1/10 w-1/2 h-fit p-6  bg-primary shadow-xl">
							<div className="flex flex-col gap-4">
								<h1 className="flex gap-2 text-accent1">
									<UserCircle className="text-accent2" /> Contact Information
								</h1>
								<span className="opacity-70">
									Find me through these channels
								</span>
							</div>
							<div className="flex flex-col gap-4 border-b-2 border-white/70 pb-6">
								<h1 className="flex gap-2 text-white/80">
									<Mail className="text-accent2" /> nitindevspace@dmail.com
								</h1>
								<h1 className="flex gap-2 text-white/80">
									<MessageCircle className="text-accent2" /> +91 7404185860
									(Only Whatsapp)
								</h1>
								<h1 className="flex gap-2 text-white/80">
									<MapPin className="text-accent2" /> Gurugram, Haryana, India
								</h1>
							</div>
							<div>
								<h1 className="opacity-70 mb-12">Or on my Socials</h1>
								<div className=" items-center flex flex-col justify-center flex-wrap gap-6 left-1/2 ">
									<div className=" items-center flex justify-center flex-wrap gap-4 left-1/2 mb-6 opacity-70">
										<div className="relative group">
											<button
												onClick={() =>
													openNewWindow("https://github.com/NitinDevSpace")
												}
												className="bg-primary2 hover-scale text-accent1 rounded-full scale-125 p-2"
											>
												<Github />
											</button>

											<span className="opacity-0 mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary2 text-accent1 rounded absolute transition duration-200 pointer-events-none z-50">
												Github
											</span>
										</div>
										<div className="relative group">
											<button
												onClick={() =>
													openNewWindow(
														"https://www.linkedin.com/in/nitindevspace/"
													)
												}
												className="bg-primary2 hover-scale text-accent1 rounded-full scale-125 p-2"
											>
												<Linkedin />
											</button>
											<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary2 text-accent1 rounded absolute transition duration-200 pointer-events-none z-50">
												LinkedIn
											</span>
										</div>
										
										<div className="relative group">
											<button
												onClick={() =>
													openNewWindow(
														"https://www.instagram.com/creative_core_23/"
													)
												}
												className="bg-primary2 hover-scale text-accent1 rounded-full scale-125 p-2"
											>
												<Instagram />
											</button>
											<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary2 text-accent1 rounded absolute transition duration-200 pointer-events-none z-50">
												Instagram
											</span>
										</div>
										<div className="relative group">
											<button
												onClick={openEmailClient}
												className="bg-primary2 hover-scale text-accent1 rounded-full scale-125 p-2"
											>
												<Mail />
											</button>
											<span className="opacity-0  mt-6 top-1/2 left-1/2 -translate-x-1/2 px-1 group-hover:opacity-80 bg-primary2 text-accent1 rounded absolute transition duration-200 pointer-events-none z-50">
												Email
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Right Section */}
						<div className="rounded-lg border border-accent1/10 w-1/2 h-fit p-6 bg-primary shadow-xl">
							<h1 className="flex gap-2 text-accent1">
								<Send className="text-accent2" /> Send a Message
							</h1>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Contact;
