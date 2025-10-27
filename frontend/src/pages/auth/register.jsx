import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/web';
import { Shield, Lock, User, Mail, Eye, EyeOff, Check } from 'lucide-react';
import Login from './login';  

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

// Main register component
export default function CyberRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Account creation initiated!');
    }, 2000);
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
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

      {/* Register Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
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
              <p className="text-gray-400 text-sm tracking-widest">CREATE NEW ACCOUNT</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Full Name Field */}
              <div className="relative">
                <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('name')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-4 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Enter full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-4 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Enter email"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-12 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Create password"
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

              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('confirmPassword')}
                    onBlur={() => setIsFocused(null)}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded pl-11 pr-12 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all font-mono"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all ${
                    agreeTerms 
                      ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,255,157,0.5)]' 
                      : 'border-cyan-500/50 hover:border-cyan-400'
                  } flex items-center justify-center`}
                >
                  {agreeTerms && <Check className="w-3 h-3 text-black" />}
                </button>
                <label className="text-gray-400 text-xs font-mono leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-cyan-400 hover:text-emerald-400 transition-colors underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-cyan-400 hover:text-emerald-400 transition-colors underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold py-3 rounded uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono relative overflow-hidden group mt-6"
              >
                <span className={isLoading ? 'opacity-0' : ''}>Create Account</span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <span className="text-gray-500 text-xs font-mono">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm font-mono">
                Already have an account?{' '}
                <a href="/login" className="text-cyan-400 hover:text-emerald-400 transition-colors font-bold">
                  Sign In
                </a>
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

          {/* Security Badge */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs font-mono flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              ENTERPRISE-GRADE ENCRYPTION
            </p>
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