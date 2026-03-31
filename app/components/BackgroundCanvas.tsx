"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

function Particles({ mouse }: { mouse: MouseRef }) {
  const group = useRef<THREE.Group | null>(null);
  const light = useRef<THREE.PointLight | null>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 1200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 22 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_state, delta) => {
    const g = group.current;
    if (!g) return;

    g.rotation.y += delta * 0.06;
    g.rotation.x += delta * 0.03;

    const targetX = mouse.current.x * 0.18;
    const targetY = mouse.current.y * 0.18;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.06);

    if (light.current) {
      light.current.position.x = mouse.current.x * 18;
      light.current.position.y = mouse.current.y * 18;
    }
  });

  return (
    <group ref={group}>
      <pointLight ref={light} intensity={0.9} color="#34d399" distance={80} />
      <pointLight intensity={0.55} color="#38bdf8" position={[18, -12, 18]} distance={90} />

      <points geometry={geometry}>
        <pointsMaterial
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
          color="#a7f3d0"
        />
      </points>

      <mesh position={[0, 0, -26]}>
        <planeGeometry args={[120, 120, 1, 1]} />
        <meshBasicMaterial color="#0b1220" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function BackgroundCanvas() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mounted]);

  if (!mounted) {
    return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-90" />;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-90">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.6]} camera={{ position: [0, 0, 42], fov: 55 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 18, 70]} />
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}

