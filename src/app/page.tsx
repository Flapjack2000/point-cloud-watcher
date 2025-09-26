"use client"

import PointCloud from "../components/pointCloud"
import { useEffect, useState, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

function Home() {
  const particlesCount = 1000;
  const particlePositions = new Float32Array(particlesCount * 3);
  const orbitControlsRef = useRef<OrbitControlsType | null>(null);


  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = ((Math.random() - 0.5) * 10); // x
    particlePositions[i3 + 1] = ((Math.random() - 0.5) * 10) // y
    particlePositions[i3 + 2] = ((Math.random() - 0.5) * 10); // z
  }

  return (
    <>
      <div className="h-[100%]">
        <Canvas
          style={{
            zIndex: 0,
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0, left: 0,
            userSelect: "none"
          }}
          onCreated={({ camera }) => {
            camera.up.set(0, 0, 1);
            camera.far = 99999;
            camera.position.x = 10;
            camera.position.z = 1;
            camera.updateProjectionMatrix();
            orbitControlsRef.current?.saveState(); // Records camera pos/rot for reset button
          }}>
          <PointCloud count={100000} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <axesHelper args={[5]} /> {/* The 'args' prop passes arguments to the AxesHelper constructor (size) */}
        </Canvas>
      </div>
    </>

  );
}
export default Home