"use client"

import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Shapes } from "lucide-react";

import PCSphere from "../components/PCSphere"
import ControlSidebar from "../components/controlSidebar"
import ViewportOverlay from "../components/ViewportOverlay";

import { useEffect, useState, useRef, createContext } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

type ParticleCountContextType = {
  count: number;
  particleSize: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setParticleSize: React.Dispatch<React.SetStateAction<number>>;
};

export const ParticleCountContext = createContext<ParticleCountContextType | undefined>(undefined);

function ParticleCountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(1000000);
  const [particleSize, setParticleSize] = useState(0.01)
  const [radius, setRadius] = useState(10);



  const prop = { count, setCount, particleSize, setParticleSize };

  return (
    <ParticleCountContext.Provider value={prop}>
      {children}
    </ParticleCountContext.Provider>
  );
}

function Home() {

  const orbitControlsRef = useRef<OrbitControlsType | null>(null);

  function resetCamera() {
    if (orbitControlsRef.current) {
      const damp = orbitControlsRef.current.enableDamping;
      orbitControlsRef.current.enableDamping = false;

      // Reset must be called multiple times. If it's only called once, it'll only get close to the reset position for some reason.
      // Using two calls works, but I'm using three just in case.
      orbitControlsRef.current.reset();
      orbitControlsRef.current.reset();
      orbitControlsRef.current.reset();

      if (damp) { orbitControlsRef.current.enableDamping = true; }
    }
  }

  return (
    <>
      <ParticleCountProvider>
        <SidebarProvider>
          <ControlSidebar />
        </SidebarProvider>

        <ViewportOverlay resetCamera={resetCamera} />

        <div className="h-[100%] fixed">
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

            <PCSphere />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls ref={orbitControlsRef} />
            <axesHelper args={[10]} />

          </Canvas>
        </div>
      </ParticleCountProvider>
    </>

  );
}
export default Home