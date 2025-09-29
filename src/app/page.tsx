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

type ControlsContextType = {
  repeatColors: boolean;
  autoRotate: boolean;

  count: number;
  maxCount: number;
  minCount: number;

  particleSize: number;
  maxParticleSize: number,
  minParticleSize: number,

  radius: number;
  maxRadius: number;
  minRadius: number;

  setRepeatColors: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;

  setCount: React.Dispatch<React.SetStateAction<number>>;
  setParticleSize: React.Dispatch<React.SetStateAction<number>>;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
};

export const ControlsContext = createContext<ControlsContextType | undefined>(undefined);

function ControlsProvider({ children }: { children: React.ReactNode }) {

  const [repeatColors, setRepeatColors] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const [count, setCount] = useState(500000);
  const maxCount = 1000000;
  const minCount = 0;

  const [particleSize, setParticleSize] = useState(0.02);
  const maxParticleSize = 1;
  const minParticleSize = 0.001;

  const [radius, setRadius] = useState(4);
  const maxRadius = 1000;
  const minRadius = 1;

  const controlsProp = {
    repeatColors,
    setRepeatColors,

    autoRotate,
    setAutoRotate,

    count,
    setCount,
    minCount,
    maxCount,

    radius,
    setRadius,
    maxRadius,
    minRadius,

    particleSize,
    setParticleSize,
    maxParticleSize,
    minParticleSize,
  };

  return (
    <ControlsContext.Provider value={controlsProp}>
      {children}
    </ControlsContext.Provider>
  );
}

import { useContext } from "react";

function Home() {

  const orbitControlsRef = useRef<OrbitControlsType | null>(null);

  const [showAxes, setShowAxes] = useState(true);
  const toggleAxes = () => { setShowAxes(!showAxes) }

  const controls = useContext(ControlsContext);
  const radius = controls?.radius;

  function resetCamera() {
    if (orbitControlsRef.current) {
      const damp = orbitControlsRef.current.enableDamping;
      orbitControlsRef.current.enableDamping = false;
      orbitControlsRef.current.reset();
      orbitControlsRef.current.reset();
      orbitControlsRef.current.reset();
      if (damp) { orbitControlsRef.current.enableDamping = true; }
    }
  }

  return (
    <>
      <ControlsProvider>
        <SidebarProvider>
          <ControlSidebar />
        </SidebarProvider>

        <ViewportOverlay toggleAxes={toggleAxes} resetCamera={resetCamera} />

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
              camera.position.z = 0
              camera.updateProjectionMatrix();
              orbitControlsRef.current?.saveState(); // Records camera pos/rot for reset button
            }}>

            <PCSphere />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls minDistance={.5} maxDistance={2000} ref={orbitControlsRef} />
            <axesHelper visible={showAxes} args={[10]} />

          </Canvas>
        </div>
      </ControlsProvider>
    </>

  );
}
export default Home