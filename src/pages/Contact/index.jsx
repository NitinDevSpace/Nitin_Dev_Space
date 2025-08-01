import React, { useState } from "react";
import Footer from "../../components/Footer";
import {
	Github,
	Instagram,
	Linkedin,
	Mail,
	MailCheck,
	MapPin,
	MessageCircle,
	Send,
	UserCircle,
} from "lucide-react";
import { sendMessage } from "../../services/contect.service";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
	const navigate = useNavigate();

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

	const [inputs, setInputs] = useState({});
	const [sent, setSent] = useState(false);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await sendMessage(inputs);
			console.log(res.message);
			if (res.success) {
				setSent(true);
			}
			setInputs({});
		} catch (error) {
			console.log(error);
		}
	};

	return ( 
		<>
			<section className="relative mx-auto  bg-primary flex  items-center justify-center">
				<div className="bg-primary2 md:w-5/6 h-full mt-36 md:p-6 py-24 shadow-2xl flex flex-col items-center justify-center">
					{/* Top heading */}
					<div className="flex flex-col gap-6 p-4 mb-12 text-center">
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
					<div className="flex flex-col lg:flex-row w-5/6 mt-12 justify-center h-full gap-12">
						{/* Left Section */}
						<div className="flex flex-col gap-12 rounded-lg border border-accent1/10 min-w-[40%]  h-fit p-6  bg-primary shadow-xl">
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
									<MessageCircle className="text-accent2" /> +91 74041-85860 (
									Whatsapp Only )
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
						<div className="rounded-lg text-white/80 border border-accent1/10 min-w-[40%] h-fit p-6 bg-primary shadow-xl">
							<h1 className="flex gap-2 text-accent1 mb-6">
								<Send className="text-accent2" /> Send a Message
							</h1>
							{sent ? (
								<motion.div layout  className="text-center text-lg  mt-12 flex flex-col gap-4 justify-center items-center pb-12">
									<MailCheck className="text-accent2" />
									<h1>
										Thank you for reaching out!
										<br /> Your message has been successfully received. I'll get <br />
										back to you as soon as possible.
									</h1>
									<button
										onClick={() => {
											navigate("/");
										}}
										className="bg-accent1 rounded p-2 text-black"
									>
										Go to Homepage
									</button>
								</motion.div>
							) : (
								<motion.div layout>
									<form onSubmit={handleSubmit} className="flex flex-col gap-4">
										<div>
											<label htmlFor="fullname" className="flex flex-col gap-2">
												Full Name
												<input
													type="text"
													id="fullname"
													name="fullName"
													value={inputs.fullName || ""}
													onChange={handleChange}
													className="rounded bg-black p-2 border border-white/40"
													placeholder="Your Name "
													required={true}
												/>
											</label>
										</div>
										<div>
											<label htmlFor="email" className="flex flex-col gap-2">
												Email Address
												<input
													type="email"
													id="email"
													name="email"
													value={inputs.email || ""}
													onChange={handleChange}
													className="rounded bg-black p-2 border border-white/40"
													placeholder="your.email@example.com"
													required={true}
												/>
											</label>
										</div>
										<div>
											<label
												htmlFor="phoneNumber"
												className="flex flex-col gap-2"
											>
												Phone Number (Optional)
												<input
													type="number"
													id="phoneNumber"
													name="phoneNumber"
													value={inputs.phoneNumber || ""}
													onChange={handleChange}
													className="rounded bg-black p-2 border border-white/40"
													placeholder="+91 12345-67890 "
												/>
											</label>
										</div>
										<div>
											<label htmlFor="subject" className="flex flex-col gap-2">
												Subject
												<input
													type="text"
													id="subject"
													name="subject"
													value={inputs.subject || ""}
													onChange={handleChange}
													className="rounded bg-black p-2 border border-white/40"
													placeholder="Project Enquiry "
													required={true}
												/>
											</label>
										</div>
										<div>
											<label htmlFor="message" className="flex flex-col gap-2">
												Message
												<textarea
													type="text"
													id="message"
													name="message"
													value={inputs.message || ""}
													onChange={handleChange}
													rows={4}
													className="rounded bg-black p-2 border border-white/40"
													placeholder="Your message here... "
													required={true}
												/>
											</label>
										</div>
										<button
											type="submit"
											className="flex gap-4 cursor-pointer w-full justify-center bg-accent1 p-3  rounded text-black"
										>
											<Send /> Send Message
										</button>
									</form>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Contact;
