import React, { Suspense, useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import WebGLErrorBoundary from './WebGLErrorBoundary';

/* ─────────────────────────────────────────────
   FLYING BIRDS  (light mode)
───────────────────────────────────────────── */
const FlyingBirds = ({ count = 18 }) => {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array([
       0, 0, 0,  -1.0, 0.5, 0,  -0.4, 0.15, 0,
       0, 0, 0,   1.0, 0.5, 0,   0.4, 0.15, 0,
    ]);
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    return g;
  }, []);

  const birds = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 14 + 8,
    z: (Math.random() - 0.5) * 20 - 10,
    speed: 0.04 + Math.random() * 0.04,
    flap: 4 + Math.random() * 6,
    phase: Math.random() * Math.PI * 2,
    size: 0.3 + Math.random() * 0.3,
  })), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    birds.forEach((b, i) => {
      b.x += b.speed;
      if (b.x > 35) b.x = -35;
      const wave = Math.sin(clock.elapsedTime * b.flap + b.phase);
      dummy.position.set(b.x, b.y + wave * 0.4, b.z);
      dummy.rotation.set(wave * 0.15, 0, 0);
      dummy.scale.setScalar(b.size);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[geo, null, count]}>
      <meshBasicMaterial color="#334155" side={THREE.DoubleSide} />
    </instancedMesh>
  );
};

/* ─────────────────────────────────────────────
   CLOUD  (light mode)
───────────────────────────────────────────── */
const Cloud = ({ position }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.1 + position[2]) * 2;
    }
  });
  return (
    <group ref={ref} position={position}>
      {[[0,0,0,3],[2.5,0.5,0,2.5],[-2.5,0.3,0,2.2],[1,1.2,0,1.8],[-1,1.0,0,1.6]].map(([x,y,z,r],i) => (
        <mesh key={i} position={[x,y,z]}>
          <sphereGeometry args={[r, 10, 10]} />
          <meshBasicMaterial color="white" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
};

/* ─────────────────────────────────────────────
   SUN  (light mode)
───────────────────────────────────────────── */
const Sun = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current?.children[1]) {
      ref.current.children[1].material.opacity = 0.3 + Math.sin(clock.elapsedTime * 1.5) * 0.1;
    }
  });
  return (
    <group ref={ref} position={[8, 14, -35]}>
      <mesh><sphereGeometry args={[5, 32, 32]} /><meshBasicMaterial color="#ffeb3b" /></mesh>
      <mesh><sphereGeometry args={[7, 32, 32]} /><meshBasicMaterial color="#ff9800" transparent opacity={0.35} blending={THREE.AdditiveBlending} /></mesh>
      <mesh><sphereGeometry args={[11, 32, 32]} /><meshBasicMaterial color="#ff5722" transparent opacity={0.15} blending={THREE.AdditiveBlending} /></mesh>
      <pointLight color="#fff3cd" intensity={2.5} distance={120} />
    </group>
  );
};

/* ─────────────────────────────────────────────
   MOON  (dark mode) — silver, NOT black
───────────────────────────────────────────── */
const Moon = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current?.children[1]) {
      ref.current.children[1].material.opacity = 0.2 + Math.sin(clock.elapsedTime * 0.6) * 0.06;
    }
  });
  return (
    <group ref={ref} position={[-6, 14, -35]}>
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshStandardMaterial color="#e8eaf6" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color="#90caf9" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#e8eaf6" intensity={0.8} distance={100} />
    </group>
  );
};

/* ─────────────────────────────────────────────
   3D SCENE
───────────────────────────────────────────── */
const Scene = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.7} />
      {isDark ? (
        <>
          <Stars radius={120} depth={60} count={5000} factor={5} saturation={0} fade speed={0.5} />
          <Moon />
        </>
      ) : (
        <>
          <Sun />
          <Cloud position={[-14, 10, -20]} />
          <Cloud position={[ 6, 12, -25]} />
          <Cloud position={[-5,  8, -15]} />
          <Cloud position={[16,  9, -22]} />
          <FlyingBirds count={20} />
        </>
      )}
    </>
  );
};

/* ─────────────────────────────────────────────
   CSS-ONLY FALLBACK (when WebGL not available)
───────────────────────────────────────────── */
const CSSFallbackSky = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* CSS twinkling stars (dark mode) */}
      {isDark && [...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + Math.random() * 2.5}px`,
            height: `${1 + Math.random() * 2.5}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${1.5 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}

      {/* Moon CSS (dark) */}
      {isDark && (
        <div
          className="absolute rounded-full"
          style={{
            width: '80px', height: '80px',
            top: '15%', left: '20%',
            background: 'radial-gradient(circle at 35% 35%, #f1f5f9, #cbd5e1)',
            boxShadow: '0 0 40px 15px rgba(144,202,249,0.3)',
            animation: 'moonPulse 4s ease-in-out infinite',
          }}
        />
      )}

      {/* Sun CSS (light) */}
      {!isDark && (
        <div
          className="absolute rounded-full"
          style={{
            width: '120px', height: '120px',
            top: '10%', right: '20%',
            background: 'radial-gradient(circle, #ffeb3b 30%, #ff9800 70%, transparent 100%)',
            boxShadow: '0 0 60px 30px rgba(255,152,0,0.4), 0 0 120px 60px rgba(255,235,59,0.15)',
            animation: 'sunPulse 3s ease-in-out infinite',
          }}
        />
      )}

      {/* CSS Clouds (light) */}
      {!isDark && [
        { top: '18%', left: '5%', w: 180, delay: '0s' },
        { top: '28%', left: '55%', w: 220, delay: '2s' },
        { top: '12%', left: '30%', w: 160, delay: '4s' },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: c.left,
            width: `${c.w}px`,
            height: '60px',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 60%, transparent 100%)',
            borderRadius: '50px',
            animation: `cloudDrift 8s ease-in-out infinite`,
            animationDelay: c.delay,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   CSS keyframes (injected once)
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.1; transform: scale(0.6); }
    }
    @keyframes moonPulse {
      0%, 100% { box-shadow: 0 0 40px 15px rgba(144,202,249,0.3); }
      50% { box-shadow: 0 0 60px 25px rgba(144,202,249,0.5); }
    }
    @keyframes sunPulse {
      0%, 100% { box-shadow: 0 0 60px 30px rgba(255,152,0,0.4), 0 0 120px 60px rgba(255,235,59,0.15); }
      50% { box-shadow: 0 0 80px 40px rgba(255,152,0,0.6), 0 0 160px 80px rgba(255,235,59,0.2); }
    }
    @keyframes cloudDrift {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(20px); }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = ({ theme }) => {
  const isDark = theme === 'dark';
  const [webglFailed, setWebglFailed] = useState(false);

  const skyDay   = 'linear-gradient(to bottom, #7dd3fc 0%, #fed7aa 60%, #fde68a 100%)';
  const skyNight = 'linear-gradient(to bottom, #020617 0%, #0f172a 60%, #1e1b4b 100%)';

  const handleWebGLError = useCallback((e) => {
    console.warn('WebGL context creation failed, falling back to CSS background.', e);
    setWebglFailed(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <GlobalStyles />

      {/* Sky Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ background: isDark ? skyNight : skyDay }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* 3D Canvas wrapped in Error Boundary → falls back to CSS sky */}
      <WebGLErrorBoundary fallback={<CSSFallbackSky theme={theme} />}>
        {!webglFailed ? (
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 12], fov: 55 }}
              gl={{ 
                antialias: false,
                powerPreference: 'default',
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', handleWebGLError);
              }}
            >
              <Suspense fallback={null}>
                <Scene theme={theme} />
              </Suspense>
            </Canvas>
          </div>
        ) : (
          <CSSFallbackSky theme={theme} />
        )}
      </WebGLErrorBoundary>

      {/* Extra CSS twinkle dots overlay (dark only) — supplement Three.js stars */}
      <AnimatePresence>
        {isDark && !webglFailed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-1 pointer-events-none"
          >
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  top: `${(i * 17 + 5) % 70}%`,
                  left: `${(i * 23 + 10) % 100}%`,
                  animation: `twinkle ${1.5 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.3) % 3}s`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 text-center relative pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="font-outfit text-xl md:text-2xl font-semibold mb-4 tracking-[0.2em] drop-shadow-md"
            style={{ color: isDark ? '#00f2ff' : '#f97316' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            CREATIVE DEVELOPER
          </motion.p>

          <h1 className="text-6xl md:text-9xl font-bold font-outfit leading-tight mb-8 drop-shadow-2xl">
            <span
              className="drop-shadow-xl"
              style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            >
              SHLOK
            </span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(90deg, #00f2ff, #bf00ff, #ff0080)'
                  : 'linear-gradient(90deg, #f97316, #ec4899, #8b5cf6)',
              }}
            >
              STAMPWALA
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pointer-events-auto">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold transition-all shadow-lg"
              style={{
                background: isDark ? '#00f2ff' : '#0f172a',
                color: isDark ? '#000' : '#fff',
                boxShadow: isDark ? '0 0 30px rgba(0,242,255,0.25)' : '0 8px 30px rgba(0,0,0,0.2)',
              }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold backdrop-blur-md transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                color: isDark ? '#fff' : '#0f172a',
              }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)' }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-12"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, #00f2ff, transparent)'
              : 'linear-gradient(to bottom, #f97316, transparent)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
