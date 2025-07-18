import React from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import OrbitingCard from "./OrbitingCard";
import model from "../assets/model.png";

function SceneContent() {
	const texture = useTexture(model);
	const NUM_ICONS = 10;
	const icons = [
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
	];
	return (
		<>
			<ambientLight intensity={1.5} />
			<directionalLight position={[2, 2, 5]} />
			<mesh position={[2, 0, 2]} scale={[5, 8, 1]} rotation={[-0.1, 0.8, 0.1]}>
				<planeGeometry args={[1, 1]} />
				<meshStandardMaterial map={texture} transparent={true} />
			</mesh>

			<group rotation={[0, 0, 0]}>
				{icons.map((icon, i) => (
					<OrbitingCard
						key={i}
						index={i}
						total={NUM_ICONS}
						radius={4.2}
						speed={0.5}
						imageUrl={icon}
					/>
				))}
				<OrbitControls enableZoom={false} />
			</group>
		</>
	);
}

export default SceneContent;
