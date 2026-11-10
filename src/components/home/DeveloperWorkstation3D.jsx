import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DeveloperWorkstation3D = ({ mousePos }) => {
  const groupRef = useRef();
  const avatarRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();
  const screenLightRef = useRef();

  // Create Canvas Texture for Monitor Screen (Code/IDE display)
  const monitorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');

    // Dark IDE background
    ctx.fillStyle = '#090d1a';
    ctx.fillRect(0, 0, 512, 280);

    // Window controls
    ctx.fillStyle = '#ff5f56'; ctx.beginPath(); ctx.arc(18, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffbd2e'; ctx.beginPath(); ctx.arc(34, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#27c93f'; ctx.beginPath(); ctx.arc(50, 16, 5, 0, Math.PI * 2); ctx.fill();

    // Editor tab title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Courier, monospace';
    ctx.fillText('subhankar_ml_pipeline.py  [Python 3.11]', 70, 19);

    // Code lines
    ctx.font = '13px Courier, monospace';
    const lines = [
      { text: 'import pandas as pd', color: '#ff007f' },
      { text: 'import numpy as np', color: '#ff007f' },
      { text: 'from sklearn.ensemble import RandomForestClassifier', color: '#9d4edd' },
      { text: '', color: '' },
      { text: '# Load and validate telemetry data', color: '#64748b' },
      { text: 'df = pd.read_parquet("telemetry_stream.parquet")', color: '#00f0ff' },
      { text: 'model = RandomForestClassifier(n_estimators=200)', color: '#38bdf8' },
      { text: 'model.fit(X_train, y_train)', color: '#a78bfa' },
      { text: 'accuracy = model.score(X_test, y_test)  # 98.4%', color: '#34d399' },
      { text: 'print(">> STATUS: PRODUCTION READY")', color: '#fbbf24' }
    ];

    let y = 48;
    lines.forEach((line) => {
      if (line.text) {
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 20, y);
      }
      y += 21;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Frame animation loop: subtle typing, breathing & mouse parallax
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle parallax tilt based on mouse position
    if (groupRef.current) {
      const targetRotY = (mousePos.current.x * 0.18) - 0.25;
      const targetRotX = (mousePos.current.y * 0.12) + 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Avatar natural micro-movements (breathing + posture)
    if (avatarRef.current) {
      avatarRef.current.position.y = -0.05 + Math.sin(t * 1.8) * 0.015;
      avatarRef.current.rotation.x = Math.sin(t * 1.2) * 0.01;
    }

    // Hand typing animation
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = 0.58 + Math.sin(t * 12) * 0.005;
      rightHandRef.current.position.y = 0.58 + Math.cos(t * 10) * 0.005;
    }

    // Monitor screen subtle pulsing glow
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.4 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0.2, -0.6, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* ================= DESK SETUP ================= */}
      {/* Desk Surface */}
      <mesh position={[0, 0.5, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.4]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.4, -0.25, -0.7]} castShadow>
        <boxGeometry args={[0.08, 1.4, 0.08]} />
        <meshStandardMaterial color="#1a1c36" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[1.4, -0.25, -0.7]} castShadow>
        <boxGeometry args={[0.08, 1.4, 0.08]} />
        <meshStandardMaterial color="#1a1c36" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[-1.4, -0.25, 0.3]} castShadow>
        <boxGeometry args={[0.08, 1.4, 0.08]} />
        <meshStandardMaterial color="#1a1c36" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[1.4, -0.25, 0.3]} castShadow>
        <boxGeometry args={[0.08, 1.4, 0.08]} />
        <meshStandardMaterial color="#1a1c36" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Desk LED Edge Light (Neon Cyan) */}
      <mesh position={[0, 0.46, 0.49]}>
        <boxGeometry args={[3.18, 0.02, 0.02]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* ================= MONITORS ================= */}
      {/* Main Center Curved Monitor Stand */}
      <mesh position={[0, 0.75, -0.6]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial color="#1f2347" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.54, -0.6]} receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
        <meshStandardMaterial color="#1f2347" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main Center Monitor Frame */}
      <mesh position={[0, 1.15, -0.58]} castShadow>
        <boxGeometry args={[1.8, 1.0, 0.05]} />
        <meshStandardMaterial color="#0b0d1b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Main Monitor Display with Live Canvas Code Texture */}
      <mesh position={[0, 1.15, -0.55]}>
        <planeGeometry args={[1.72, 0.92]} />
        <meshBasicMaterial map={monitorTexture} toneMapped={false} />
      </mesh>

      {/* Secondary Vertical Monitor (Left side) */}
      <group position={[-1.15, 1.15, -0.42]} rotation={[0, 0.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 1.05, 0.04]} />
          <meshStandardMaterial color="#0b0d1b" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.6, 0.98]} />
          <meshStandardMaterial
            color="#070a18"
            emissive="#ff007f"
            emissiveIntensity={0.25}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Monitor Light Source onto Workspace */}
      <pointLight
        ref={screenLightRef}
        position={[0, 1.2, -0.3]}
        color="#00f0ff"
        intensity={1.5}
        distance={2.5}
      />

      {/* ================= KEYBOARD & MOUSE ================= */}
      {/* Desk Mat */}
      <mesh position={[0, 0.545, 0.05]} receiveShadow>
        <boxGeometry args={[1.6, 0.01, 0.65]} />
        <meshStandardMaterial color="#080a18" roughness={0.8} />
      </mesh>

      {/* Mechanical Keyboard Base */}
      <mesh position={[-0.15, 0.56, 0.1]} castShadow>
        <boxGeometry args={[0.75, 0.025, 0.26]} />
        <meshStandardMaterial color="#141730" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Keyboard Keys Glow */}
      <mesh position={[-0.15, 0.575, 0.1]}>
        <boxGeometry args={[0.7, 0.01, 0.22]} />
        <meshBasicMaterial color="#00f0ff" opacity={0.75} transparent />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.45, 0.565, 0.12]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.16]} />
        <meshStandardMaterial color="#1a1d3b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ================= LAPTOP (Right side) ================= */}
      <group position={[1.1, 0.545, -0.05]} rotation={[0, -0.35, 0]}>
        {/* Base */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.02, 0.4]} />
          <meshStandardMaterial color="#1e2246" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.22, -0.19]} rotation={[-0.25, 0, 0]} castShadow>
          <boxGeometry args={[0.55, 0.4, 0.02]} />
          <meshStandardMaterial color="#151730" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Screen Glow */}
        <mesh position={[0, 0.22, -0.175]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* ================= DESK ACCESSORIES ================= */}
      {/* Desk Lamp */}
      <group position={[-1.25, 0.54, -0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
          <meshStandardMaterial color="#1f2347" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial color="#1f2347" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.48, 0]} rotation={[0, 0, 0.6]} castShadow>
          <coneGeometry args={[0.09, 0.15, 16]} />
          <meshStandardMaterial color="#ff007f" roughness={0.3} metalness={0.5} />
        </mesh>
        <pointLight position={[0.12, 0.44, 0]} color="#ffe0b2" intensity={1.2} distance={1.8} />
      </group>

      {/* Coffee Cup */}
      <mesh position={[0.7, 0.58, 0.25]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
      </mesh>

      {/* Small Desk Plant */}
      <group position={[-1.28, 0.54, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.04, 0.09, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#10b981" roughness={0.7} />
        </mesh>
      </group>

      {/* ================= ERGONOMIC CHAIR & SUBHANKAR AVATAR ================= */}
      {/* Ergonomic Chair */}
      <group position={[0, -0.05, 0.72]}>
        {/* Base & Wheels */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 5]} />
          <meshStandardMaterial color="#16182e" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
          <meshStandardMaterial color="#2a2e57" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Seat Cushion */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.62, 0.1, 0.58]} />
          <meshStandardMaterial color="#111326" roughness={0.7} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.85, 0.26]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.56, 0.8, 0.08]} />
          <meshStandardMaterial color="#111326" roughness={0.7} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 1.32, 0.33]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.32, 0.16, 0.08]} />
          <meshStandardMaterial color="#1c2042" roughness={0.6} />
        </mesh>
      </group>

      {/* 3D Developer Avatar (Subhankar Giri) */}
      <group ref={avatarRef} position={[0, 0, 0.7]}>
        {/* Torso / Modern Professional Hoodie */}
        <mesh position={[0, 0.82, 0.02]} castShadow>
          <boxGeometry args={[0.48, 0.65, 0.34]} />
          <meshStandardMaterial color="#0d1124" roughness={0.8} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.18, 0.02]}>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 16]} />
          <meshStandardMaterial color="#f0b892" roughness={0.5} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.34, 0.04]} castShadow>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#f0b892" roughness={0.5} />
        </mesh>

        {/* Hair (Professional modern style) */}
        <mesh position={[0, 1.45, 0.02]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#1c1917" roughness={0.9} />
        </mesh>

        {/* Developer Glasses */}
        <mesh position={[0, 1.35, 0.2]}>
          <boxGeometry args={[0.24, 0.05, 0.03]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Left Arm & Forearm reaching towards keyboard */}
        <mesh position={[-0.3, 0.76, 0.08]} rotation={[0.4, 0, 0.2]}>
          <cylinderGeometry args={[0.065, 0.06, 0.38, 12]} />
          <meshStandardMaterial color="#0d1124" roughness={0.8} />
        </mesh>
        <mesh position={[-0.24, 0.64, 0.28]} rotation={[-0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.055, 0.05, 0.36, 12]} />
          <meshStandardMaterial color="#0d1124" roughness={0.8} />
        </mesh>
        {/* Left Hand on Keyboard */}
        <mesh ref={leftHandRef} position={[-0.16, 0.58, 0.42]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#f0b892" roughness={0.5} />
        </mesh>

        {/* Right Arm & Forearm reaching towards mouse */}
        <mesh position={[0.3, 0.76, 0.08]} rotation={[0.4, 0, -0.2]}>
          <cylinderGeometry args={[0.065, 0.06, 0.38, 12]} />
          <meshStandardMaterial color="#0d1124" roughness={0.8} />
        </mesh>
        <mesh position={[0.34, 0.64, 0.28]} rotation={[-0.5, -0.2, 0]}>
          <cylinderGeometry args={[0.055, 0.05, 0.36, 12]} />
          <meshStandardMaterial color="#0d1124" roughness={0.8} />
        </mesh>
        {/* Right Hand on Mouse */}
        <mesh ref={rightHandRef} position={[0.38, 0.58, 0.44]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#f0b892" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

export default DeveloperWorkstation3D;
