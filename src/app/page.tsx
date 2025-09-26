"use client"

import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

import PCSphere from "../components/PCSphere"
import ControlSidebar from "../components/controlSidebar"

import { useEffect, useState, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

function Home() {
  // use for resetting camera
  const orbitControlsRef = useRef<OrbitControlsType | null>(null);




  return (
    <>
      <SidebarProvider>
        <ControlSidebar />

      </SidebarProvider>



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


          <PCSphere count={3000000} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <axesHelper args={[10]} />

        </Canvas>
      </div>
    </>

  );
}
export default Home