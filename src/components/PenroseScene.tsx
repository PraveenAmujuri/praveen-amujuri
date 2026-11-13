"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PenroseSceneProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  onFrameUpdate: (data: { progress: number; pShape: number; pZoom: number }) => void;
}

export default function PenroseScene({ sectionRef, onFrameUpdate }: PenroseSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smoothstep function W(e, t, a)
    const W = (min: number, max: number, val: number) => {
      const r = Math.min(1, Math.max(0, (val - min) / (max - min)));
      return r * r * (3 - 2 * r);
    };

    // Linear interpolation L(e, t, a)
    const L = (a: number, b: number, t: number) => a + (b - a) * t;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent clear
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Architectural materials matching reference
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x131316,
      roughness: 0.32,
      metalness: 0.6,
    });
    const blueMaterial = new THREE.MeshStandardMaterial({
      color: 0x0037ff, // Reference electric blue
      roughness: 0.5,
      metalness: 0.1,
    });

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // Initial 3D Penrose configuration: 3 intersecting legs in 3D grid
    const g: [number, number, number][] = [];
    for (let e = 0; e <= 6; e++) g.push([e, 0, 0]);
    for (let e = 1; e <= 6; e++) g.push([6, e, 0]);
    for (let e = 1; e <= 6; e++) g.push([6, 6, e]);

    // Center of gravity b
    const b = new THREE.Vector3();
    g.forEach(([x, y, z]) => b.add(new THREE.Vector3(x, y, z)));
    b.multiplyScalar(1 / g.length);

    // Target 2D flat square loop configuration (5x5 cube loop)
    const w: [number, number][] = [];
    for (let e = 0; e <= 5; e++) w.push([e, 0]);
    for (let e = 1; e <= 5; e++) w.push([5, e]);
    for (let e = 4; e >= 0; e--) w.push([e, 5]);
    for (let e = 4; e >= 1; e--) w.push([0, e]);

    const y = w.map(([wx, wy]) => new THREE.Vector3(wx - 2.5, wy - 2.5 + 0.3, 0));

    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    interface CubeItem {
      m: THREE.Mesh;
      from: THREE.Vector3;
      to: THREE.Vector3;
      spawned?: boolean;
    }

    const cubes: CubeItem[] = [];
    g.forEach(([gx, gy, gz], idx) => {
      // 0-th cube is the blue accent corner
      const mesh = new THREE.Mesh(boxGeo, idx === 0 ? blueMaterial : darkMaterial);
      const fromPos = new THREE.Vector3(gx - b.x, gy - b.y, gz - b.z);
      mesh.position.copy(fromPos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      meshGroup.add(mesh);
      cubes.push({ m: mesh, from: fromPos, to: y[idx] });
    });

    // 20th spawned cube to complete the 20-cube square portal loop seamlessly
    const lastCube = cubes[cubes.length - 1];
    const spawnedMesh = new THREE.Mesh(boxGeo, darkMaterial);
    spawnedMesh.position.copy(lastCube.from);
    spawnedMesh.castShadow = true;
    spawnedMesh.receiveShadow = true;
    spawnedMesh.scale.setScalar(0.001);
    meshGroup.add(spawnedMesh);
    cubes.push({
      m: spawnedMesh,
      from: lastCube.from.clone(),
      to: y[cubes.length], // cubes.length is 19 before push, targeting y[19] = [0, 1]
      spawned: true,
    });

    // Aperture portal backdrop plane (fades in as shape becomes square)
    const portalBackdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshBasicMaterial({
        color: 0x101113,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    portalBackdrop.position.set(0, 0.3, 0);
    scene.add(portalBackdrop);

    // Floor shadow receiver matching reference shadow plane
    const shadowGeo = new THREE.PlaneGeometry(160, 160);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(10, 16, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.left = -16;
    dirLight.shadow.camera.bottom = -16;
    dirLight.shadow.camera.right = 16;
    dirLight.shadow.camera.top = 16;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xe4e9ff, 0.55);
    rimLight.position.set(-8, 4, -6);
    scene.add(rimLight);

    // Orthographic Camera (critical for true Penrose isometric perspective)
    const camera = new THREE.OrthographicCamera();
    camera.near = 0.1;
    camera.far = 200;

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      const aspect = width / height;
      const viewSize = Math.max(14, 9.5 / aspect);
      camera.left = (-viewSize * aspect) / 2;
      camera.right = (viewSize * aspect) / 2;
      camera.top = viewSize / 2;
      camera.bottom = -viewSize / 2;
      camera.updateProjectionMatrix();
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Camera angles:
    // C = isometric angle: az = 45deg (Math.PI/4), el = asin(1 / sqrt(3)) ~ 35.264deg
    // Azimuth & elevation configurations
    const C = { az: Math.PI / 4, el: Math.asin(1 / Math.sqrt(3)) };
    const I = { az: Math.PI / 2 - 0.3, el: 0.16 };
    const O = { az: Math.PI / 2, el: 0.02 };

    let currentScrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Compute progress directly from scroll position
    const calculateProgress = () => {
      const targetSection = sectionRef.current || container.closest("section");
      if (!targetSection) return 0;
      const rect = targetSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = rect.height - viewportHeight;
      if (scrollDistance <= 0) return 0;
      const p = -rect.top / scrollDistance;
      return Math.min(1, Math.max(0, p));
    };

    const onScroll = () => {
      targetScrollProgress = calculateProgress();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial evaluation
    targetScrollProgress = calculateProgress();
    currentScrollProgress = targetScrollProgress;

    let isVisible = true;
    let animFrameId: number;

    const renderLoop = () => {
      if (!isVisible) return;
      animFrameId = requestAnimationFrame(renderLoop);

      // Continuously read scroll position to guarantee zero lag even during fast scrolls
      targetScrollProgress = calculateProgress();

      // Inertial smoothing lerp
      const dampFactor = prefersReducedMotion ? 1 : 0.12;
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * dampFactor;

      // Phase transitions
      const A = currentScrollProgress;
      const pShape = W(0.04, 0.5, A); // Morph from Penrose triangle to flat square loop
      const m = W(0.0, 0.5, A);
      const pZoom = W(0.46, 0.86, A); // Zoom into the opening

      // Camera azimuth & elevation interpolation
      let az = L(C.az, I.az, m);
      let el = L(C.el, I.el, m);
      az = L(az, O.az, pZoom);
      el = L(el, O.el, pZoom);

      // Subtle mouse parallax only active when scrolled slightly, zero on idle (A < 0.02)
      const mouseWeight = prefersReducedMotion ? 0 : (A < 0.02 ? 0 : A) * (1 - pZoom);
      az += 0.05 * mouseX * mouseWeight;
      el += 0.04 * mouseY * mouseWeight;

      // Position orthographic camera on sphere around center
      camera.position.set(
        40 * Math.cos(el) * Math.cos(az),
        40 * Math.sin(el),
        40 * Math.cos(el) * Math.sin(az)
      );
      camera.lookAt(0, 0.3 * pShape, 0);

      // Zoom multiplication through the portal opening
      const zoomFactor = 1 + 26 * Math.pow(pZoom, 1.7);
      meshGroup.rotation.y = Math.PI * pShape;

      // Animate cubes positions & scales
      cubes.forEach((cube, i) => {
        const staggerP = W(0, 1, Math.min(1, Math.max(0, 1.18 * pShape - (i / cubes.length) * 0.18)));
        cube.m.position.lerpVectors(cube.from, cube.to, staggerP);
        const s = cube.spawned ? W(0.75, 1, staggerP) : 1;
        cube.m.scale.setScalar(Math.max(0.001, s));
        cube.m.position.multiplyScalar(L(1, zoomFactor, W(0.02, 1, pZoom) * staggerP));
      });

      // Aperture portal backdrop
      portalBackdrop.material.opacity = W(0.36, 0.52, A);
      portalBackdrop.scale.setScalar(zoomFactor);

      // Notify parent DOM elements for typography & counter synchronization
      onFrameUpdate({
        progress: A,
        pShape,
        pZoom,
      });

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animFrameId = requestAnimationFrame(renderLoop);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    renderLoop();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      boxGeo.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      portalBackdrop.geometry.dispose();
      portalBackdrop.material.dispose();
      darkMaterial.dispose();
      blueMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [sectionRef, onFrameUpdate]);

  return <div ref={containerRef} className="absolute inset-0 z-[1] w-full h-full pointer-events-none" />;
}
