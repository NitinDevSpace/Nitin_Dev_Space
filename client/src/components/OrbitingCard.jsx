import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const OrbitingCard = ({ index, total, radius = 3, speed = 0.01, imageUrl }) => {
  const ref = useRef();

  const angleOffset = (2 * Math.PI * index) / total;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const angle = t + angleOffset;
    const x = radius * Math.cos(angle);
    const y = 1;
    const z = radius * Math.sin(angle);
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y = -angle;
    }
  });

  return (
    <group ref={ref}>
      <Html center className="select-none pointer-events-auto">
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.8)",
            fontSize: "24px",
            transform: "rotateY(10deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="icon" style={{ width: 40, height: 40 }} />
          ) : (
            "🔥"
          )}
        </div>
      </Html>
    </group>
  );
};

export default OrbitingCard;