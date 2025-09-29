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

export default function ControlSidebar() {

  const context = useContext(ControlsContext)

  const repeatColors = context?.repeatColors
  const setRepeatColors = context?.setRepeatColors

  const count = context?.count
  const setCount = context?.setCount
  const maxCount = context?.maxCount

  const radius = context?.radius
  const setRadius = context?.setRadius
  const maxRadius = context?.maxRadius
  const minRadius = context?.minRadius

  const particleSize = context?.particleSize
  const setParticleSize = context?.setParticleSize
  const minParticleSize = context?.minParticleSize
  const maxParticleSize = context?.maxParticleSize

  return (
    <>
      <Sidebar className="font-[family-name:var(--font-orbitron)]">
        <SidebarHeader>
          <p className="text-xl font-bold text-center text-cyan-700 underline">Controls</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
            <form autoComplete="off" id="controlsForm">
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
            </form>

          </SidebarGroup>
        </SidebarContent>

        <SidebarRail title="Toggle Sidebar (CTRL+B)" />
      </Sidebar >

    </>
  )

}