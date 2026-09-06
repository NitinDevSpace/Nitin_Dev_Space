import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "../../services/projects.service";
import { useNavigate } from "react-router-dom";
import { CreationsSkeleton } from "../../components/Loading";
import CreationsCarousel from "../../components/3D/CreationsCarousel";

function MyCreations() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);

	const getData = async () => {
		setLoading(true);
		const allProjects = await getAllProjects();
		setProjects(allProjects?.data || []);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="relative pt-16 sm:pt-24 overflow-hidden p-3 sm:p-4 w-full sm:w-11/12 min-h-[100dvh] flex flex-col gap-2 items-center justify-center mx-auto ">
			<div className="text-center mb-6 sm:mb-8 px-2">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
					Built by the <span className="text-accent2">Brand</span>
				</h1>
				<p className="text-sm sm:text-base opacity-80">
					Software products and web apps created under Nitin Dev Space —
					the kind of freelance builds you can hire for your own idea.
				</p>
			</div>
			<div className="relative h-[22rem] xs:h-[26rem] sm:h-[30rem] md:h-[32rem] w-full max-w-7xl overflow-hidden drop-shadow-2xl flex justify-center items-center rounded-lg bg-primary3">
				{loading ? <CreationsSkeleton /> : <CreationsCarousel projects={projects} />}
			</div>
			<button
				onClick={() => {
					navigate("/projects");
				}}
				className="rounded-lg flex p-4 text-black mt-5 hover-scale bg-accent2"
			>
				See All Projects <ArrowRight className="animate-bounce-x" />
			</button>
		</div>
	);
}

export default MyCreations;
