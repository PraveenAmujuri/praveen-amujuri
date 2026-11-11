"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ImpossiblePortalProps {
  progressRef: React.RefObject<number>;
}

export default function ImpossiblePortal({ progressRef }: ImpossiblePortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const portalCoreRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Materials with high architectural definition & metallic/matte contrast
  const materials = useMemo(() => {
    return {
      matteBlack: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0c0c0e"),
        roughness: 0.35,
        metalness: 0.8,
      }),
      darkSteel: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#16181d"),
        roughness: 0.2,
        metalness: 0.9,
      }),
      electricBlue: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0038ff"),
        emissive: new THREE.Color("#0024bb"),
        emissiveIntensity: 0.45,
        roughness: 0.15,
        metalness: 0.85,
      }),
      coreGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#0037ff"),
        wireframe: true,
      }),
    };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    const p = progressRef.current ?? 0;

    if (groupRef.current) {
      // Rotation choreographed with scroll progress + subtle organic idle sway
      const idleY = Math.sin(state.clock.elapsedTime * 0.4) * 0.05 * (1 - p);
      const idleX = Math.cos(state.clock.elapsedTime * 0.3) * 0.03 * (1 - p);

      // Multi-phase rotation as requested:
      // 0%: object distant
      // 20%: starts rotating
      // 55%: orientation changes
      // 70%: aligns with opening
      // 82% - 100%: opening fills viewport and camera enters
      const targetRotY = idleY + p * Math.PI * 1.8;
      const targetRotX = idleX + Math.sin(p * Math.PI) * 0.35;
      const targetRotZ = (p * 0.5) * (1 - p);

      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 8, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 8, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 8, delta);

      // Scale slight expansion near 70-80% before passage
      const scale = 1 + Math.sin(p * Math.PI) * 0.15;
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (portalCoreRef.current) {
      // Subtle counter rotation of interior ribbons
      portalCoreRef.current.rotation.z = state.clock.elapsedTime * 0.1 * (1 - p);
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2 + p * 6;
    }
  });

  /*
    Constructing the modular angular impossible triangular portal:
    Centered at [0, 0, 0] with central aperture opening.
    Composed of 3 primary architectural ribbon beams with interlocking steps and bevelled facets,
    resembling the Penrose impossible triangle geometry featured in the reference site mark.
  */
  const beamWidth = 0.52;
  const beamHeight = 0.52;
  const armLength = 3.2;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={portalCoreRef}>
        {/* Top/Horizontal Beam - Matte Black & Electric Blue accent cap */}
        <mesh
          position={[0, 1.45, 0]}
          material={materials.matteBlack}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[armLength, beamWidth, beamHeight]} />
        </mesh>
        <mesh
          position={[armLength / 2 - 0.25, 1.45, 0.05]}
          material={materials.electricBlue}
        >
          <boxGeometry args={[0.5, beamWidth * 1.02, beamHeight * 1.02]} />
        </mesh>

        {/* Right Slanted Beam descending */}
        <mesh
          position={[0.82, 0.05, 0]}
          rotation={[0, 0, -Math.PI / 3]}
          material={materials.darkSteel}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[armLength * 1.05, beamWidth, beamHeight]} />
        </mesh>
        <mesh
          position={[1.5, -1.1, 0.02]}
          material={materials.electricBlue}
        >
          <boxGeometry args={[0.45, beamWidth * 1.03, beamHeight * 1.03]} />
        </mesh>

        {/* Left Slanted Beam ascending & creating the impossible overlap */}
        <mesh
          position={[-0.82, 0.05, 0.28]}
          rotation={[0, 0, Math.PI / 3]}
          material={materials.matteBlack}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[armLength * 1.05, beamWidth, beamHeight]} />
        </mesh>
        <mesh
          position={[-0.1, 1.45, 0.28]}
          material={materials.electricBlue}
        >
          <boxGeometry args={[0.55, beamWidth * 1.04, beamHeight * 1.04]} />
        </mesh>

        {/* Interlocking corner connector cubes for Penrose illusion */}
        <mesh position={[-1.4, 1.45, 0.14]} material={materials.darkSteel}>
          <boxGeometry args={[beamWidth * 1.1, beamHeight * 1.1, beamHeight * 1.6]} />
        </mesh>
        <mesh position={[1.4, 1.45, -0.14]} material={materials.matteBlack}>
          <boxGeometry args={[beamWidth * 1.1, beamHeight * 1.1, beamHeight * 1.6]} />
        </mesh>
        <mesh position={[0, -1.35, 0.14]} material={materials.darkSteel}>
          <boxGeometry args={[beamWidth * 1.1, beamHeight * 1.1, beamHeight * 1.6]} />
        </mesh>

        {/* Inner geometric horizon ring inside the portal aperture */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.7, 0.03, 16, 4]} />
          <primitive object={materials.coreGlow} attach="material" />
        </mesh>

        {/* Floating geometric datum markers */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0]}>
            <octahedronGeometry args={[0.07, 0]} />
            <primitive object={materials.electricBlue} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Internal portal beacon light */}
      <pointLight ref={lightRef} position={[0, 0.2, 0]} color="#175cff" distance={6} decay={2} intensity={2.5} />
    </group>
  );
}
