// src/components/ThreeElements.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * RotatingCard Component
 */
export const RotatingCard = ({ color = "#6366f1", label, value, change }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Card Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.6, 0.4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Text Overlay */}
      <Html center>
        <div className="text-center bg-gray-900/50 px-3 py-2 rounded-xl backdrop-blur-sm shadow-md border border-gray-700/50">
          <div className="text-xs text-gray-300 font-medium">{label}</div>
          <div className="text-2xl font-bold text-white tracking-wide">{value}</div>
          <div
            className={`text-xs font-semibold ${
              (change || "").startsWith("-") ? "text-red-400" : "text-green-400"
            }`}
          >
            {change}
          </div>
        </div>
      </Html>
    </group>
  );
};

/**
 * OccupancyBar3D Component
 */
export const OccupancyBar3D = ({ percent = 75 }) => {
  const filled = Math.max(0, Math.min(100, percent)) / 100;
  const ref = useRef();

  // Gentle breathing animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.scale.y = 1 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Background bar */}
      <mesh receiveShadow>
        <boxGeometry args={[3, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>

      {/* Filled bar */}
      <mesh position={[(-1.5 + 3 * filled) / 2, 0, 0.02]} ref={ref}>
        <boxGeometry args={[3 * filled, 0.4, 0.34]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Label */}
      <Html position={[0, 0.7, 0]}>
        <div className="text-center bg-gray-900/50 px-3 py-1 rounded-lg shadow border border-gray-700/60 backdrop-blur-sm">
          <div className="text-xs text-gray-300">Occupancy Rate</div>
          <div className="text-lg font-bold text-indigo-300">{percent}%</div>
        </div>
      </Html>
    </group>
  );
};

/**
 * PieSlice Component
 */
const PieSlice = ({ startAngle, endAngle, radius, height, color, label }) => {
  const angle = endAngle - startAngle;
  const midAngle = startAngle + angle / 2;
  const sliceRef = useRef();

  // Subtle hover animation (pulse)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sliceRef.current) {
      sliceRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group rotation={[0, startAngle, 0]} ref={sliceRef}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 64, 1, false, 0, angle]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Slice Label */}
      <Html
        position={[
          Math.cos(midAngle) * (radius + 0.8),
          height / 2 + 0.1,
          Math.sin(midAngle) * (radius + 0.8),
        ]}
        center
      >
        <div className="text-xs bg-gray-900/70 text-gray-100 px-2 py-1 rounded-lg shadow-md border border-gray-700/60 backdrop-blur-sm">
          {label}
        </div>
      </Html>
    </group>
  );
};

/**
 * RoomStatusPieChart Component
 */
export const RoomStatusPieChart = ({ occupied, unoccupied, service }) => {
  const total = occupied + unoccupied + service;
  const occupiedAngle = (occupied / total) * Math.PI * 2;
  const unoccupiedAngle = (unoccupied / total) * Math.PI * 2;
  const serviceAngle = (service / total) * Math.PI * 2;

  let start = 0;
  const slices = [
    { value: occupiedAngle, color: "#6366f1", label: `Occupied: ${occupied}` },
    { value: unoccupiedAngle, color: "#16a34a", label: `Unoccupied: ${unoccupied}` },
    { value: serviceAngle, color: "#dc2626", label: `To be serviced: ${service}` },
  ];

  return (
    <>
      {slices.map((slice, i) => {
        const comp = (
          <PieSlice
            key={i}
            startAngle={start}
            endAngle={start + slice.value}
            radius={2}
            height={0.6}
            color={slice.color}
            label={slice.label}
          />
        );
        start += slice.value;
        return comp;
      })}
    </>
  );
};
