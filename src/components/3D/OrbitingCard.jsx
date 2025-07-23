import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const OrbitingCard = ({ index, total, radius, speed = 0.01, imageUrl }) => {
	const ref = useRef();
	const texture = useTexture(imageUrl);

	const angleOffset = (2 * Math.PI * index) / total;

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime() * speed;
		const angle = -t + angleOffset;
		const x = radius * Math.cos(angle);
		const y = 2;
		const z = radius * Math.sin(angle);
		if (ref.current) {
			ref.current.position.set(x, y, z);
			const scaleFactor = (Math.cos(angle) + 1) / 2; // 0 (back) → 1 (front)
			const scaled = 0.6 + scaleFactor * 0.6; // scale from 0.6 to 0.8
			ref.current.scale.set(scaled, scaled, scaled);
			ref.current.rotation.y = angle;
		}
	});

	return (
		<group ref={ref}>
			<mesh>
				<boxGeometry args={[0.8, 0.8, 0.1]} />
			</mesh>
			<mesh>
				<boxGeometry args={[0.8, 0.8, 0.1]} /> {/* width, height, depth */}
				<meshStandardMaterial
					map={texture}
					roughness={0.4}
					metalness={0.1}
					color="white"
					transparent={true}
				/>
			</mesh>
		</group>
	);
};

export default OrbitingCard;
