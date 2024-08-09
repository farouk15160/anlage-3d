import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
// import "./App.css"; // Make sure to import your CSS

function Model({ onClick }) {
  const { scene } = useGLTF("/TopDrive.glb");

  // Predefined color palette
  const colors = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff),
    new THREE.Color(0xffff00),
    new THREE.Color(0xff00ff),
    new THREE.Color(0x00ffff),
  ];

  // Traverse the scene and add click handlers
  let colorIndex = 0;
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: colors[colorIndex % colors.length],
      });
      child.userData = { ...child.userData, name: child.name }; // Store the name or any identifier
      colorIndex++;
    }
  });

  return <primitive object={scene} onPointerDown={onClick} />;
}

// Preload the GLTF model
useGLTF.preload("/TopDrive.glb");

export default function ThreeDModel() {
  const handleClick = (event) => {
    // Get the object that was clicked
    const object = event.object;
    alert(`You clicked on: ${object.userData.name}`);
  };

  return (
    <>
      <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }} linear>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model onClick={handleClick} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
