import React, { useEffect, useState } from "react";
import { getMessages } from "../../services/contact.service";
import MessageBox from "../../components/MessageBox";
import { ArrowDown, ArrowUp } from "lucide-react";

function MessagesAdmin() {
	const [messages, setMessages] = useState([]);
	const [open, setOpen] = useState(false);

	const getData = async () => {
		const allMessages = await getMessages();
		console.log(allMessages);
		console.log(allMessages.data);

		setMessages(allMessages.data);
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="bg-primary2 relative flex flex-col justify-center rounded-lg h-fit m-4 p-4">
			{/* Heading Intro */}
			<div
				onClick={() => {
					setOpen(!open);
				}}
				className="flex"
			>
				<h1 className="pb-2 text-2xl border-b-2">Messages</h1>
			</div>
			{/* Messages */}
			<div>
				{open &&
					messages.map((data, i) => {
						return <MessageBox key={i} data={data} />;
					})}
			</div>
			<button
				onClick={() => {
					setOpen(!open);
				}}
				className="absolute top-4 right-5"
			>
				{open ? <ArrowUp /> : <ArrowDown />}
			</button>
		</div>
	);
}

export default MessagesAdmin;
