import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Droplets, Sparkles } from 'lucide-react';

interface ThreeBottleCanvasProps {
  perfumeColor?: string;
  className?: string;
}

const LIQUID_PRESETS = [
  { name: 'Imperial Amber', color: '#E5983A', desc: 'Golden Pharaoh' },
  { name: 'Royal Lotus Rose', color: '#D95D75', desc: 'Queen of the Nile' },
  { name: 'Sacred Temple Oud', color: '#9E5528', desc: 'Temple of Oud' },
  { name: 'Midnight Obsidian', color: '#3D2D23', desc: 'Black Obelisk' }
];

export const ThreeBottleCanvas: React.FC<ThreeBottleCanvasProps> = ({
  perfumeColor = '#E5983A',
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [selectedLiquid, setSelectedLiquid] = useState(LIQUID_PRESETS[0]);
  const [webglAvailable, setWebglAvailable] = useState(true);

  // Store references for runtime animations
  const sceneRef = useRef<THREE.Scene | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const meniscusMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const internalLightRef = useRef<THREE.PointLight | null>(null);
  const meniscusMeshRef = useRef<THREE.Mesh | null>(null);
  const bubblesGeomRef = useRef<THREE.BufferGeometry | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, velX: 0, velY: 0 });

  // Update liquid color dynamically
  useEffect(() => {
    const col = new THREE.Color(selectedLiquid.color);
    if (liquidMaterialRef.current) {
      liquidMaterialRef.current.color.copy(col);
      liquidMaterialRef.current.attenuationColor.copy(col);
    }
    if (meniscusMaterialRef.current) {
      meniscusMaterialRef.current.color.copy(col).multiplyScalar(1.2);
    }
    if (internalLightRef.current) {
      internalLightRef.current.color.copy(col);
    }
  }, [selectedLiquid]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Test WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglAvailable(false);
        return;
      }
    } catch {
      setWebglAvailable(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.1);
    scene.add(ambientLight);

    // Key Golden Hour Sun Light
    const sunLight = new THREE.DirectionalLight(0xffdfa8, 2.8);
    sunLight.position.set(4.5, 6, 4);
    scene.add(sunLight);

    // High-contrast Rim Light for crystal refractions
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(-4.5, 3.5, -3.5);
    scene.add(rimLight);

    // Warm underside reflection from obsidian surface
    const bottomLight = new THREE.PointLight(0xc6a15b, 2.0, 7);
    bottomLight.position.set(0, -2.2, 1.2);
    scene.add(bottomLight);

    // 3. Construct Bottle & Internal Liquid Group
    const bottleGroup = new THREE.Group();
    bottleGroupRef.current = bottleGroup;
    scene.add(bottleGroup);

    // A. Outer High-Clarity Crystal Glass Material
    const outerGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 0.28,
      transparent: true,
      roughness: 0.04,
      metalness: 0.02,
      ior: 1.54,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      depthWrite: false
    });

    // B. Inner Liquid Material (Glowing, rich translucent amber fluid)
    const initialColor = new THREE.Color(selectedLiquid.color);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: initialColor,
      transmission: 0.42,
      opacity: 0.94,
      transparent: true,
      roughness: 0.12,
      metalness: 0.08,
      ior: 1.38,
      attenuationColor: initialColor,
      attenuationDistance: 1.2,
      depthWrite: true
    });
    liquidMaterialRef.current = liquidMaterial;

    // C. Liquid Meniscus (Top surface of the perfume fluid)
    const meniscusMaterial = new THREE.MeshStandardMaterial({
      color: initialColor.clone().multiplyScalar(1.2),
      roughness: 0.15,
      metalness: 0.25,
      transparent: true,
      opacity: 0.92
    });
    meniscusMaterialRef.current = meniscusMaterial;

    // D. Antique Brushed Gold Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      metalness: 0.88,
      roughness: 0.28
    });

    // E. Internal Siphon Dip Tube (Clear glass capillary tube)
    const dipTubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      transparent: true,
      opacity: 0.7,
      roughness: 0.05,
      ior: 1.48
    });

    // F. Dark Polished Obsidian Pedestal
    const obsidianMaterial = new THREE.MeshStandardMaterial({
      color: 0x12100e,
      metalness: 0.65,
      roughness: 0.3
    });

    // --- 1. Outer Crystal Glass Vessel ---
    // Outer Body (Octagonal faceted heavy crystal)
    const outerBodyGeom = new THREE.CylinderGeometry(0.86, 0.96, 1.62, 8, 1, false);
    const outerBody = new THREE.Mesh(outerBodyGeom, outerGlassMaterial);
    outerBody.position.y = 0;
    bottleGroup.add(outerBody);

    // Beveled Crystal Shoulder
    const shoulderGeom = new THREE.ConeGeometry(0.86, 0.42, 8, 1, true);
    const shoulder = new THREE.Mesh(shoulderGeom, outerGlassMaterial);
    shoulder.rotation.x = Math.PI;
    shoulder.position.y = 1.02;
    bottleGroup.add(shoulder);

    // Heavy Crystal Glass Base (thick glass bottom typical of luxury flacons)
    const glassBaseGeom = new THREE.CylinderGeometry(0.95, 0.97, 0.22, 8);
    const glassBase = new THREE.Mesh(glassBaseGeom, outerGlassMaterial);
    glassBase.position.y = -0.78;
    bottleGroup.add(glassBase);

    // --- 2. Inner Perfume Liquid Reservoir ---
    // Notice: sits precisely inside the glass cavity, filled to ~75% height
    // leaving a realistic visible air gap above the meniscus!
    const liquidHeight = 1.25;
    const innerLiquidGeom = new THREE.CylinderGeometry(0.74, 0.82, liquidHeight, 8, 1, false);
    const innerLiquid = new THREE.Mesh(innerLiquidGeom, liquidMaterial);
    innerLiquid.position.y = -0.18; // base rests just above thick crystal bottom
    bottleGroup.add(innerLiquid);

    // Top Liquid Meniscus Disc (creates the visible fluid surface line)
    const meniscusGeom = new THREE.CylinderGeometry(0.74, 0.74, 0.035, 8);
    const meniscusMesh = new THREE.Mesh(meniscusGeom, meniscusMaterial);
    meniscusMesh.position.y = -0.18 + liquidHeight / 2;
    bottleGroup.add(meniscusMesh);
    meniscusMeshRef.current = meniscusMesh;

    // Glowing internal light placed inside the perfume liquid
    // This makes the amber fragrance radiate from within!
    const internalLight = new THREE.PointLight(initialColor, 2.2, 3.5);
    internalLight.position.set(0, -0.15, 0);
    bottleGroup.add(internalLight);
    internalLightRef.current = internalLight;

    // --- 3. Glass Dip Tube (Siphon) ---
    // Extends from the gold collar down to the bottom of the perfume liquid
    const dipTubeGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.48, 16);
    const dipTube = new THREE.Mesh(dipTubeGeom, dipTubeMaterial);
    dipTube.position.set(0.015, 0.22, 0);
    dipTube.rotation.z = -0.015;
    bottleGroup.add(dipTube);

    // Atomizer Pump Collar inside the neck
    const pumpGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
    const pumpMesh = new THREE.Mesh(pumpGeom, goldMaterial);
    pumpMesh.position.y = 1.0;
    bottleGroup.add(pumpMesh);

    // --- 4. Micro Effervescent Bubbles in Liquid ---
    const bubbleCount = 45;
    const bubbleGeom = new THREE.BufferGeometry();
    const bubblePos = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = new Float32Array(bubbleCount);

    for (let b = 0; b < bubbleCount; b++) {
      const radius = Math.random() * 0.55;
      const angle = Math.random() * Math.PI * 2;
      bubblePos[b * 3] = Math.cos(angle) * radius;
      bubblePos[b * 3 + 1] = -0.7 + Math.random() * 1.1; // inside liquid column
      bubblePos[b * 3 + 2] = Math.sin(angle) * radius;
      bubbleSpeeds[b] = 0.002 + Math.random() * 0.003;
    }

    bubbleGeom.setAttribute('position', new THREE.BufferAttribute(bubblePos, 3));
    bubblesGeomRef.current = bubbleGeom;

    const bubbleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const bubbleSystem = new THREE.Points(bubbleGeom, bubbleMaterial);
    bottleGroup.add(bubbleSystem);

    // --- 5. Egyptian Antique Gold Collar, Rings & Royal Cap ---
    // Gold Flacon Collar
    const collarGeom = new THREE.CylinderGeometry(0.42, 0.46, 0.28, 24);
    const collar = new THREE.Mesh(collarGeom, goldMaterial);
    collar.position.y = 1.18;
    bottleGroup.add(collar);

    // Hieroglyphic Ribbed Rings
    for (let r = 0; r < 3; r++) {
      const ringGeom = new THREE.TorusGeometry(0.44 + r * 0.01, 0.02, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeom, goldMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.08 + r * 0.09;
      bottleGroup.add(ringMesh);
    }

    // Royal Octagonal Cap
    const capBaseGeom = new THREE.CylinderGeometry(0.68, 0.58, 0.65, 8);
    const capMesh = new THREE.Mesh(capBaseGeom, goldMaterial);
    capMesh.position.y = 1.62;
    bottleGroup.add(capMesh);

    // Royal Lotus Crown Finial
    const finialGeom = new THREE.SphereGeometry(0.45, 8, 8);
    finialGeom.scale(1, 0.52, 1);
    const finialMesh = new THREE.Mesh(finialGeom, goldMaterial);
    finialMesh.position.y = 1.98;
    bottleGroup.add(finialMesh);

    // Front Inscribed Gold Medallion
    const plateGeom = new THREE.BoxGeometry(0.72, 0.46, 0.03);
    const plateMesh = new THREE.Mesh(plateGeom, goldMaterial);
    plateMesh.position.set(0, 0.05, 0.89);
    bottleGroup.add(plateMesh);

    // Dark Obsidian Pedestal Base
    const basePedestalGeom = new THREE.CylinderGeometry(1.25, 1.35, 0.18, 24);
    const basePedestal = new THREE.Mesh(basePedestalGeom, obsidianMaterial);
    basePedestal.position.y = -0.98;
    bottleGroup.add(basePedestal);

    // --- 6. Atmospheric Floating Sand Particles ---
    const particleCount = 100;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 6;
      particlePos[p * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 4;

      particleVel[p * 3] = (Math.random() - 0.5) * 0.002;
      particleVel[p * 3 + 1] = Math.random() * 0.003 + 0.001;
      particleVel[p * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe6d2a0,
      size: 0.032,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particleSystem);

    // --- 7. Mouse Interaction & Fluid Physics ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let sloshX = 0;
    let sloshZ = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;

      if (isDragging && bottleGroup) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        dragVelocityX = deltaX * 0.008;
        bottleGroup.rotation.y += dragVelocityX;

        // Slosh reaction when user turns the bottle
        sloshX += deltaX * 0.002;
        sloshZ += deltaY * 0.002;

        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- 8. Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse Parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Bottle Rotation & Bobbing
      if (bottleGroup) {
        if (isRotating && !isDragging) {
          bottleGroup.rotation.y += 0.006;
        } else if (!isDragging) {
          dragVelocityX *= 0.94;
          bottleGroup.rotation.y += dragVelocityX;
        }

        // Gentle floating bob
        bottleGroup.position.y = Math.sin(elapsed * 1.3) * 0.05;
        bottleGroup.rotation.x = mouseRef.current.y * 0.12;
        bottleGroup.rotation.z = -mouseRef.current.x * 0.08;
      }

      // Fluid Slosh Physics (top surface meniscus moves with inertia!)
      sloshX *= 0.92;
      sloshZ *= 0.92;
      const ambientSlosh = Math.sin(elapsed * 2.4) * 0.035;

      if (meniscusMesh) {
        meniscusMesh.rotation.z = sloshX + ambientSlosh;
        meniscusMesh.rotation.x = sloshZ + Math.cos(elapsed * 2.0) * 0.025;
      }

      // Rise micro bubbles inside the liquid
      const bPositions = bubbleGeom.attributes.position.array as Float32Array;
      for (let b = 0; b < bubbleCount; b++) {
        bPositions[b * 3 + 1] += bubbleSpeeds[b];
        bPositions[b * 3] += Math.sin(elapsed * 2 + b) * 0.0005;

        // Reset bubble when reaching top meniscus
        if (bPositions[b * 3 + 1] > 0.42) {
          bPositions[b * 3 + 1] = -0.72;
        }
      }
      bubbleGeom.attributes.position.needsUpdate = true;

      // Drift desert particles in room
      const pPositions = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += particleVel[i * 3 + 1];
        pPositions[i * 3] += Math.sin(elapsed + i) * 0.0007;

        if (pPositions[i * 3 + 1] > 2.8) {
          pPositions[i * 3 + 1] = -2.5;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      outerBodyGeom.dispose();
      shoulderGeom.dispose();
      glassBaseGeom.dispose();
      innerLiquidGeom.dispose();
      meniscusGeom.dispose();
      dipTubeGeom.dispose();
      collarGeom.dispose();
      capBaseGeom.dispose();
      finialGeom.dispose();
      plateGeom.dispose();
      basePedestalGeom.dispose();
      bubbleGeom.dispose();
      particleGeom.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update wireframe mode
  useEffect(() => {
    if (!bottleGroupRef.current) return;
    bottleGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframeMode));
        } else if (child.material) {
          child.material.wireframe = wireframeMode;
        }
      }
    });
  }, [wireframeMode]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      {webglAvailable ? (
        <div
          ref={mountRef}
          className="w-full h-[460px] md:h-[560px] cursor-grab active:cursor-grabbing relative z-10"
          title="Drag horizontally to rotate flacon and observe liquid slosh"
        />
      ) : (
        /* Fallback if WebGL disabled */
        <div className="w-full h-[460px] md:h-[560px] flex flex-col items-center justify-center bg-[#151310]/60 border border-[#C6A15B]/20 rounded-2xl p-6 text-center">
          <img
            src="/src/assets/images/perfume_golden_pharaoh_1792302698019.jpg"
            alt="Golden Pharaoh Flacon"
            className="w-64 h-80 object-cover rounded-lg shadow-2xl border border-[#C6A15B]/30"
          />
        </div>
      )}

      {/* Floating 3D Interaction Toolbar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 w-full max-w-sm px-4">
        {/* Liquid Color Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#151310]/90 backdrop-blur-md border border-[#C6A15B]/30 shadow-lg">
          <div className="flex items-center gap-1 px-2 text-[10px] uppercase font-mono tracking-wider text-[#C9B18A]">
            <Droplets className="w-3 h-3 text-[#C6A15B]" />
            <span className="hidden sm:inline">Liquid:</span>
          </div>
          {LIQUID_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setSelectedLiquid(preset)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] transition-all ${
                selectedLiquid.name === preset.name
                  ? 'bg-[#C6A15B] text-[#090909] font-semibold shadow-sm'
                  : 'text-[#F4EFE5]/80 hover:text-[#FFFFFF] hover:bg-white/5'
              }`}
              title={`${preset.name} (${preset.desc})`}
            >
              <span
                className="w-2 h-2 rounded-full border border-black/30"
                style={{ backgroundColor: preset.color }}
              />
              <span className="truncate max-w-[70px] sm:max-w-none">{preset.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Orbit & Wireframe Controls */}
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-[#151310]/80 backdrop-blur-md border border-[#C6A15B]/25 text-xs text-[#E6D2A0]">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-colors text-[11px] ${
              isRotating ? 'bg-[#C6A15B]/20 text-[#F4EFE5]' : 'hover:text-[#F4EFE5]'
            }`}
            title="Toggle auto-rotation"
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{isRotating ? 'Orbiting' : 'Paused'}</span>
          </button>

          <span className="w-px h-3 bg-[#C6A15B]/20" aria-hidden="true" />

          <button
            onClick={() => setWireframeMode((prev) => !prev)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors text-[11px] ${
              wireframeMode ? 'bg-[#C6A15B] text-[#090909] font-medium' : 'hover:text-[#F4EFE5]'
            }`}
            title="Inspect geometry wireframe"
          >
            <Eye className="w-3 h-3" />
            <span>Wireframe</span>
          </button>

          <span className="hidden sm:inline-block text-[10px] text-[#C9B18A]/60">· Drag to slosh</span>
        </div>
      </div>
    </div>
  );
};
