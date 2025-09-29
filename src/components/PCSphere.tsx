import React, { useRef, useMemo, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useState } from 'react';

import { ControlsContext } from '@/app/page';

interface PointCloudProps {
  count?: number;
}

const PCSphere: React.FC<PointCloudProps> = () => {
  const context = useContext(ControlsContext);
  const count = context?.count ?? 0;
  const particleSize = context?.particleSize ?? 0.01
  const sphereRadius = context?.radius ?? 2

  const repeatColors = context?.repeatColors
  const autoRotate = context?.autoRotate

  const mesh = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Generate points in a sphere using spherical coordinates
      const pos = {
        radius: Math.random() * sphereRadius,
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(Math.random() * 2 - 1)
      }

      const x = pos.radius * Math.sin(pos.phi) * Math.cos(pos.theta);
      const y = pos.radius * Math.sin(pos.phi) * Math.sin(pos.theta);
      const z = pos.radius * Math.cos(pos.phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color based on position
      if (repeatColors) {
        color.setHSL(
          ((pos.radius / 2 * 0.7) + 0.1), // Hue based on distance from center
          1, // Full saturation
          0.5 // Lightness variation
        );
      }
      else {
        color.setHSL(
          ((pos.radius / sphereRadius * 0.7) + 0.1), // Hue based on distance from center
          1, // Full saturation
          0.5 // Lightness variation
        );
      }


      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, sphereRadius, repeatColors]);

  // Animate the point cloud
  useFrame((state) => {
    if (mesh.current && autoRotate) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        premultipliedAlpha={true}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export default PCSphere;