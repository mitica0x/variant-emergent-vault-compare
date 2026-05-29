import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHero({ className = "", style }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isMobile = window.innerWidth < 768;
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = isMobile ? 4.5 : 3.8;
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const cyanLight = new THREE.PointLight(0x18b4d4, isMobile ? 3 : 4, 8);
    cyanLight.position.set(2, 1, 2);
    scene.add(cyanLight);
    const purpleLight = new THREE.PointLight(0x4f46e5, 3, 8);
    purpleLight.position.set(-2, -1, 1);
    scene.add(purpleLight);
    const emeraldLight = new THREE.PointLight(0x0dbe82, 3, 8);
    emeraldLight.position.set(-2, -1, 1);
    scene.add(emeraldLight);
    const rimLight = new THREE.DirectionalLight(0x18b4d4, 0.6);
    rimLight.position.set(0, 2, -2);
    scene.add(rimLight);
    const segments = isMobile ? 48 : 80;
    const geo = new THREE.SphereGeometry(1, segments, segments);
    const posAttr = geo.attributes.position;
    const originalPos = new Float32Array(posAttr.array);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0a1628),
      emissive: new THREE.Color(0x061220),
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: 0.92,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x18b4d4, wireframe: true, transparent: true, opacity: 0.06 });
    const wireMesh = new THREE.Mesh(new THREE.SphereGeometry(1.002, segments, segments), wireMat);
    scene.add(wireMesh);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      const w = mount.clientWidth; const h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const pos = posAttr.array;
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const ox = originalPos[ix], oy = originalPos[ix+1], oz = originalPos[ix+2];
        const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
        const nx = ox/len, ny = oy/len, nz = oz/len;
        const wave1 = Math.sin(nx*3.5 + t*0.7)*0.08;
        const wave2 = Math.sin(ny*4.0 + t*0.5+1.2)*0.06;
        const wave3 = Math.sin(nz*3.0 + t*0.9+2.4)*0.05;
        const wave4 = Math.sin((nx+ny)*2.5 + t*0.4)*0.04;
        const mouseInfluence = (nx*mouse.x + ny*mouse.y)*0.06;
        const d = 1 + wave1 + wave2 + wave3 + wave4 + mouseInfluence;
        pos[ix] = ox*d; pos[ix+1] = oy*d; pos[ix+2] = oz*d;
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
      mesh.rotation.y = t*0.12 + mouse.x*0.2;
      mesh.rotation.x = Math.sin(t*0.07)*0.1 - mouse.y*0.15;
      wireMesh.rotation.copy(mesh.rotation);
      cyanLight.position.x = Math.sin(t*0.4)*2.5;
      cyanLight.position.y = Math.cos(t*0.3)*1.5;
      purpleLight.position.x = Math.cos(t*0.35)*-2.5;
      purpleLight.position.y = Math.sin(t*0.25)*1.5;
      const hue = 0.214 + (Math.sin(t * 0.3) * 0.5 + 0.5) * 0.314;
      purpleLight.color.setHSL(hue, 0.9, 0.5);
      emeraldLight.position.x = Math.cos(t*0.35 + Math.PI*0.7)*-2.5;
      emeraldLight.position.y = Math.sin(t*0.25 + Math.PI*0.7)*1.5;
      emeraldLight.color.setHSL(0.214 + (Math.sin(t * 0.3 + Math.PI * 2 / 3) * 0.5 + 0.5) * 0.314, 0.9, 0.5);
      cyanLight.color.setHSL(0.214 + (Math.sin(t * 0.3 + Math.PI * 4 / 3) * 0.5 + 0.5) * 0.314, 0.9, 0.5);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose(); geo.dispose(); mat.dispose(); wireMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} style={{ pointerEvents: "none", ...style }} />;
}
