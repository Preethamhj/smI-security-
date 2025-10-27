import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/web';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';

// Particle field background
function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 2000;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff9d"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Rotating hexagon grid
function HexGrid() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const hexagons = [];
  const radius = 0.5;
  const layers = 3;
  
  for (let layer = 0; layer < layers; layer++) {
    const count = layer === 0 ? 1 : layer * 6;
    const layerRadius = layer * 1.5;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * layerRadius;
      const y = Math.sin(angle) * layerRadius;
      
      const points = [];
      for (let j = 0; j <= 6; j++) {
        const a = (j / 6) * Math.PI * 2;
        points.push(new THREE.Vector3(
          x + Math.cos(a) * radius,
          y + Math.sin(a) * radius,
          0
        ));
      }
      
      hexagons.push(
        <Line
          key={`hex-${layer}-${i}`}
          points={points}
          color="#00ff9d"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      );
    }
  }

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {hexagons}
    </group>
  );
}

// Orbiting shield icon
function SecurityShield() {
  const shieldRef = useRef();
  
  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      shieldRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={shieldRef} position={[4, 0, -3]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#00ff9d"
        emissive="#00ff9d"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

// Main login component
export default function CyberLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.slow,
  });

  const glowSpring = useSpring({
    boxShadow: isFocused
      ? '0 0 30px rgba(0, 255, 157, 0.5), inset 0 0 20px rgba(0, 255, 157, 0.1)'
      : '0 0 15px rgba(0, 255, 157, 0.2), inset 0 0 10px rgba(0, 255, 157, 0.05)',
    config: config.gentle,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert('Login simulation - integrate with your backend');
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff9d" />
          <ParticleField />
          <HexGrid />
          <SecurityShield />
        </Canvas>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan" />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <animated.div 
          style={formSpring}
          className="w-full max-w-md"
        >
          <animated.div
            style={glowSpring}
            className="backdrop-blur-md bg-black/40 border border-cyan-500/30 rounded-lg p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Shield className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/30 -z-10" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
                SECURE ACCESS
              </h1>
              <p className="text-gray-400 text-sm tracking-widest">AUTHENTICATION REQUIRED</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setIsFocused('username')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-4 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-12 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors">
                  <input type="checkbox" className="mr-2 accent-cyan-400" />
                  <span className="font-mono">Remember Me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-emerald-400 transition-colors font-mono">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold py-3 rounded uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono relative overflow-hidden group"
              >
                <span className={isLoading ? 'opacity-0' : ''}>Initialize Access</span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-cyan-500/20 text-center">
              <p className="text-gray-500 text-xs font-mono">
                SECURED BY <span className="text-cyan-400">QUANTUM ENCRYPTION</span>
              </p>
            </div>
          </animated.div>

          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,157,0.8)]" />
              <span className="text-emerald-400 text-xs font-mono">SECURE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              <span className="text-cyan-400 text-xs font-mono">ENCRYPTED</span>
            </div>
          </div>
        </animated.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
}