import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OrbitingCard from "./OrbitingCard";

const RotatingCube = () => {
	const cubeRef = useRef();

	// Rotate the cube on each frame
	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.y += 0.01;
		}
	});

	return (
		<mesh ref={cubeRef} position={[0, 0, 0]}>
			<boxGeometry args={[1.5, 1.0, 1.5]} />
			<meshStandardMaterial color="skyblue" />
		</mesh>
	);
};

const RotatingCubeScene = () => {
	const NUM_ICONS = 6;
	const icons = [
		"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
		"https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp",
		"https://burst.shopifycdn.com/photos/person-stands-on-rocks-poking-out-of-the-ocean-shoreline.jpg?width=1000&format=pjpg&exif=0&iptc=0",
		"https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
		"https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
		"https://raw.githubusercontent.com/devicons/devicon/master/icons/aws/aws-original.svg",
	];

	return (
		<div className="w-full h-full">
			<Canvas camera={{ position: [5, 0, 5] }}>
				<ambientLight intensity={0.5} />
				<directionalLight position={[2, 2, 5]} />
				<RotatingCube />
				{icons.map((icon, i) => (
					<OrbitingCard key={i} index={i} total={NUM_ICONS} radius={3.5} speed={0.5} imageUrl={icon} />
				))}
				<OrbitControls enableZoom={false} />
			</Canvas>
		</div>
	);
};

export default RotatingCubeScene;
