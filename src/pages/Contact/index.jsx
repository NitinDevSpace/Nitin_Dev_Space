import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Feedback from "../Feedback";
import {
	Github,
	Instagram,
	Linkedin,
	Mail,
	MailCheck,
	MapPin,
	MessageCircle,
	Send,
	Star,
	UserCircle,
} from "lucide-react";
import { sendMessage } from "../../services/contact.service";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const socials = [
	{
		label: "GitHub",
		icon: Github,
		action: "link",
		href: "https://github.com/NitinDevSpace",
	},
	{
		label: "LinkedIn",
		icon: Linkedin,
		action: "link",
		href: "https://www.linkedin.com/in/nitindevspace/",
	},
	{
		label: "Instagram",
		icon: Instagram,
		action: "link",
		href: "https://www.instagram.com/creative_core_23/",
	},
	{
		label: "Email",
		icon: Mail,
		action: "email",
	},
];

const fieldClass =
	"w-full rounded-lg bg-primary border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent2/60 transition-colors";

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
	const [clicked, setClicked] = useState(false);
	const [error, setError] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setClicked(true);
		setError("");

		try {
			const res = await sendMessage(inputs);
			if (res?.success) {
				setSent(true);
				setInputs({});
			} else {
				setError(res?.message || "Could not send message. Please try again.");
				setClicked(false);
			}
		} catch (err) {
			console.log(err);
			setError("Could not send message. Please try again.");
			setClicked(false);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<>
			<section className="relative bg-primary w-full flex justify-center items-start px-3 sm:px-4 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14">
				<div className="w-full max-w-5xl bg-primary2 border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
					<div className="text-center mb-6 sm:mb-8">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
							Get In <span className="text-accent2">Touch</span>
						</h1>
						<p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed px-1">
							Have a project in mind, a question, or just want to connect? Drop
							me a line — I usually reply within a day or two.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 sm:gap-5 lg:gap-6">
						{/* Contact info */}
						<aside className="rounded-xl border border-white/10 bg-primary/70 p-5 sm:p-6 flex flex-col gap-6">
							<div>
								<h2 className="flex items-center gap-2 text-accent2 text-sm font-medium">
									<UserCircle size={18} className="text-accent1" />
									Contact Information
								</h2>
								<p className="text-xs text-white/45 mt-1.5">
									Find me through these channels
								</p>
							</div>

							<ul className="space-y-3 text-sm">
								<li className="flex items-center gap-3 text-white/80">
									<span className="shrink-0 w-9 h-9 rounded-lg bg-primary2 border border-white/10 flex items-center justify-center">
										<Mail size={16} className="text-accent1" />
									</span>
									<span className="break-all">NitinDevSpace@gmail.com</span>
								</li>
								<li className="flex items-center gap-3 text-white/80">
									<span className="shrink-0 w-9 h-9 rounded-lg bg-primary2 border border-white/10 flex items-center justify-center">
										<MessageCircle size={16} className="text-accent1" />
									</span>
									+91 74041-85860
								</li>
								<li className="flex items-center gap-3 text-white/80">
									<span className="shrink-0 w-9 h-9 rounded-lg bg-primary2 border border-white/10 flex items-center justify-center">
										<MapPin size={16} className="text-accent1" />
									</span>
									Gurugram, Haryana, India
								</li>
							</ul>

							<div className="border-t border-white/10 pt-5">
								<p className="text-xs text-white/45 mb-3">Or on my socials</p>
								<div className="flex flex-wrap gap-2.5">
									{socials.map((item) => {
										const Icon = item.icon;
										return (
											<button
												key={item.label}
												type="button"
												title={item.label}
												onClick={() =>
													item.action === "email"
														? openEmailClient()
														: openNewWindow(item.href)
												}
												className="w-10 h-10 rounded-full bg-primary2 border border-white/10 text-accent2 hover:border-accent2/50 hover:scale-105 transition-all flex items-center justify-center"
											>
												<Icon size={18} />
											</button>
										);
									})}
								</div>
							</div>

							<button
								type="button"
								onClick={() => setShowFeedback(true)}
								className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-accent2/40 bg-accent2/10 text-accent2 px-4 py-2.5 text-sm font-medium hover:bg-accent2 hover:text-black transition-colors"
							>
								<Star size={15} /> Leave Feedback
							</button>
						</aside>

						{/* Message form */}
						<div className="rounded-xl border border-white/10 bg-primary/70 p-5 sm:p-6">
							<h2 className="flex items-center gap-2 text-accent2 text-sm font-medium mb-5">
								<Send size={16} className="text-accent1" />
								Send a Message
							</h2>

							{sent ? (
								<motion.div
									layout
									className="text-center py-10 flex flex-col gap-3 justify-center items-center"
								>
									<div className="w-14 h-14 rounded-full bg-accent1/15 border border-accent1/30 flex items-center justify-center mb-1">
										<MailCheck className="text-accent1" size={26} />
									</div>
									<h3 className="text-lg font-medium">Message received</h3>
									<p className="text-sm text-white/60 max-w-sm leading-relaxed">
										Thanks for reaching out. I&apos;ll get back to you as soon
										as possible.
									</p>
									<button
										type="button"
										onClick={() => navigate("/")}
										className="mt-2 bg-accent2 rounded-lg px-4 py-2 text-sm text-black font-semibold"
									>
										Go to Homepage
									</button>
								</motion.div>
							) : (
								<motion.div layout>
									<form
										onSubmit={handleSubmit}
										className="grid sm:grid-cols-2 gap-3.5"
									>
										<label className="flex flex-col gap-1.5 text-xs text-white/70 sm:col-span-2">
											Full Name
											<input
												type="text"
												name="fullName"
												value={inputs.fullName || ""}
												onChange={handleChange}
												className={fieldClass}
												placeholder="Your name"
												required
											/>
										</label>
										<label className="flex flex-col gap-1.5 text-xs text-white/70">
											Email Address
											<input
												type="email"
												name="email"
												value={inputs.email || ""}
												onChange={handleChange}
												className={fieldClass}
												placeholder="you@example.com"
												required
											/>
										</label>
										<label className="flex flex-col gap-1.5 text-xs text-white/70">
											Phone (optional)
											<input
												type="tel"
												name="phoneNumber"
												value={inputs.phoneNumber || ""}
												onChange={handleChange}
												className={fieldClass}
												placeholder="+91 12345-67890"
											/>
										</label>
										<label className="flex flex-col gap-1.5 text-xs text-white/70 sm:col-span-2">
											Subject
											<input
												type="text"
												name="subject"
												value={inputs.subject || ""}
												onChange={handleChange}
												className={fieldClass}
												placeholder="Project enquiry"
												required
											/>
										</label>
										<label className="flex flex-col gap-1.5 text-xs text-white/70 sm:col-span-2">
											Message
											<textarea
												name="message"
												value={inputs.message || ""}
												onChange={handleChange}
												rows={4}
												className={`${fieldClass} resize-y min-h-[96px]`}
												placeholder="Your message here..."
												required
											/>
										</label>

										{error && (
											<p className="sm:col-span-2 text-sm text-red-400">
												{error}
											</p>
										)}

										<button
											disabled={clicked}
											type="submit"
											className="sm:col-span-2 inline-flex items-center justify-center gap-2 cursor-pointer w-full bg-accent2 py-2.5 rounded-lg text-black text-sm font-semibold hover:brightness-105 disabled:opacity-60 transition"
										>
											<Send size={16} />
											{clicked ? "Sending..." : "Send Message"}
										</button>
									</form>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>
			{showFeedback && <Feedback onClose={() => setShowFeedback(false)} />}
			<Footer />
		</>
	);
};

export default Contact;
