import React from 'react'

function MessageBox(data) {
    const mes = data.data;
    
  return (
		<div className="p-6 m-4 rounded-xl bg-[#0f0f0f]/80 border border-white/10 shadow-xl backdrop-blur-md text-white transition-all hover:scale-[1.01]">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-lg font-semibold tracking-wide text-white/90">
					{mes?.fullName || "Unknown Sender"}
				</h1>
				<span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white/70">
					{mes?.subject || "No Subject"}
				</span>
			</div>

			<div className="space-y-1 mb-3 text-sm text-white/70">
				<p>
					<span className="font-semibold text-white/80">Email:</span>{" "}
					{mes?.email || "N/A"}
				</p>
				<p>
					<span className="font-semibold text-white/80">Phone:</span>{" "}
					{mes?.phoneNumber || "N/A"}
				</p>
			</div>

			<div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/10 text-white/80 leading-relaxed">
				{mes?.message ? mes.message : "No message provided."}
			</div>
		</div>
	);
}

export default MessageBox