import React from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import OrbitingCard from "./OrbitingCard";
import model from "../../assets/model.png";
import mongodbIcon from "../../assets/mongodb.svg";
import nodejsIcon from "../../assets/nodejs.svg";
import reactIcon from "../../assets/react.svg";
import reduxIcon from "../../assets/redux.svg";
import javaIcon from "../../assets/java.svg";
import javaScriptIcon from "../../assets/javascript.svg";
import tailwindIcon from "../../assets/tailwindcss.svg";
import nextjsIcon from "../../assets/nextjs.svg";
import springBootIcon from "../../assets/springboot.svg";
import threejsIcon from "../../assets/threejs.svg";

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
