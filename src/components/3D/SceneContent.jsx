import React from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import OrbitingCard from "./OrbitingCard";
import model from "../../assets/model.png";
import mongodbIcon from "../../assets/mongodb.png";
import nodejsIcon from "../../assets/nodejs.png";
import reactIcon from "../../assets/react.png";
import reduxIcon from "../../assets/redux.png";
import javaIcon from "../../assets/java.png";
import javaScriptIcon from "../../assets/javascript.png";
import tailwindIcon from "../../assets/tailwindcss.png";
import nextjsIcon from "../../assets/nextjs.png";
import springBootIcon from "../../assets/springboot.png";
import threejsIcon from "../../assets/threejs.png";

function SceneContent() {
	const texture = useTexture(model);
	const NUM_ICONS = 10;
	const icons = [
		mongodbIcon,
		nodejsIcon,
		reactIcon,
		reduxIcon,
		javaIcon,
		javaScriptIcon,
		tailwindIcon,
		nextjsIcon,
		springBootIcon,
		threejsIcon,
	];
	return (
		<>
			<ambientLight intensity={1.5} />
			<directionalLight position={[2, 2, 5]} />
			<mesh position={[2, -1, 2]} scale={[5, 8.3, 1]} rotation={[-0.1, 0.8, 0.1]}>
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
			</group>
		</>
	);
}

export default SceneContent;
