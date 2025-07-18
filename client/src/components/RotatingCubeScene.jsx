import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SceneContent from "./SceneContent";

const RotatingCubeScene = () => {
	return (
		<div className="w-full h-full">
			<Canvas camera={{ position: [5, 3, 5] }}>
				<SceneContent />
			</Canvas>
		</div>
	);
};

export default RotatingCubeScene;
