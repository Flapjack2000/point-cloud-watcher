import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";

import { ControlsContext } from '@/app/page';
import { useContext } from "react";
import { useThree } from "@react-three/fiber";
import type { Camera } from "three";
import * as THREE from "three";

export default function ControlSidebar() {

  const context = useContext(ControlsContext);
  const materialRef = context?.materialRef;

  function applyTexture(path: string) {
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(path);
    if (materialRef && materialRef.current) {
      materialRef.current.map = particleTexture;
      materialRef.current.needsUpdate = true;
    }
  }

  const count = context?.count;
  const setCount = context?.setCount;
  const maxCount = context?.maxCount;

  const radius = context?.radius;
  const setRadius = context?.setRadius;
  const maxRadius = context?.maxRadius;
  const minRadius = context?.minRadius;

  const particleSize = context?.particleSize;
  const setParticleSize = context?.setParticleSize;
  const minParticleSize = context?.minParticleSize;
  const maxParticleSize = context?.maxParticleSize;

  const repeatColors = context?.repeatColors;
  const setRepeatColors = context?.setRepeatColors;

  const autoRotate = context?.autoRotate;
  const setAutoRotate = context?.setAutoRotate;

  // Find a way to get camera reference:
  //    Add a different type of camera (ortho, persp) to Canvas and make ref for it?
  // const camera = useThree((state): Camera => state.camera);

  return (
    <>
      <Sidebar className="font-[family-name:var(--font-orbitron)]">
        <SidebarHeader>
          <p className="text-xl font-bold text-center text-cyan-700 underline">Controls</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
            <form autoComplete="off" id="controlsForm"
              className="flex flex-col">
              <p className="p-2 pl-0">
                <span
                  title={`[${0}, ${maxCount}]`}
                  className="font-bold">
                  Particle Count:
                </span>
              </p>
              <input
                className="w-1/2 border-2 border-cyan-700 p-[.5] pl-0"
                type="number"
                step={1000}
                min={0}
                max={maxCount}
                value={count}
                onChange={(e) => {
                  if (setCount) {
                    if ((typeof maxCount === "number") && (Number(e.target.value) >= 0) && (Number(e.target.value) <= maxCount)) {
                      setCount(Number(e.target.value))
                    }
                  };
                }}
              />

              <p className="p-2 pl-0">
                <span
                  title={`[${minRadius}, ${maxRadius}]`}
                  className="font-bold">
                  Radius:

                </span>
              </p>
              <input
                className="w-1/2 border-2 border-cyan-700 p-[.5] pl-0"
                type="number"
                step={1}
                min={minRadius}
                max={maxRadius}
                value={radius}
                onChange={(e) => {
                  if (setRadius) {
                    if ((typeof maxRadius === "number" && typeof minRadius === "number") &&
                      (Number(e.target.value) >= minRadius) &&
                      (Number(e.target.value) <= maxRadius)) {
                      setRadius(Number(e.target.value));
                    }
                  };
                }}
              />

              <p className="p-2 pl-0">
                <span
                  // title={"Max: " + String(maxParticleSize)}
                  title={`[${minParticleSize}, ${maxParticleSize}]`}
                  className="font-bold">
                  Particle Size:
                </span>
              </p>
              <input
                className="w-1/2 border-2 border-cyan-700 p-[.5] pl-0"
                type="number"
                step={0.001}
                min={minParticleSize}
                max={maxParticleSize}
                value={particleSize}
                onChange={(e) => {
                  if (setParticleSize) {
                    if ((typeof maxParticleSize === "number" && typeof minParticleSize === "number") &&
                      (Number(e.target.value) >= minParticleSize) &&
                      (Number(e.target.value) <= maxParticleSize)) {
                      setParticleSize(Number(e.target.value));
                    }
                  };
                }}
              />

              <p className="p-2 pl-0">
                <span
                  title="Whether hues should be spread over the cloud's radius or repeat."
                  className="pr-2 font-bold">
                  Banded Colors:
                </span>
                <input
                  type="checkbox"
                  checked={repeatColors}
                  onChange={() => {
                    if (setRepeatColors) { setRepeatColors(!repeatColors); }
                  }}
                />
              </p>

              <p className="p-2 pl-0">
                <span
                  title="Whether the point cloud should automatically rotate."
                  className="pr-2 font-bold">
                  Auto Rotate:
                </span>
                <input
                  type="checkbox"
                  checked={autoRotate}
                  onChange={() => {
                    if (setAutoRotate) { setAutoRotate(!autoRotate); }
                  }}
                />
              </p>

              <button
                className="w-3/4 border-2 border-cyan-700 cursor-pointer p-[.5] pl-0 font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  applyTexture(`https://picsum.photos/200/200?random=${Date.now()}`);
                }}
              >
                Random Texture
              </button>


            </form>

          </SidebarGroup>
        </SidebarContent>

        <SidebarRail title="Toggle Sidebar (CTRL+B)" />
      </Sidebar >

    </>
  )

}