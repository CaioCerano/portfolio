import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LavaLamp: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Basic Three.js setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		if (mountRef.current) {
			mountRef.current.appendChild(renderer.domElement);
		}

		// Create multiple balls
		const balls = [];
		const geometry = new THREE.SphereGeometry(0.5, 32, 32);
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

		for (let i = 0; i < 10; i++) {
			const ball = new THREE.Mesh(geometry, material);
			ball.position.x = Math.random() * 5 - 2.5; // Random position
			ball.position.y = Math.random() * 5 - 2.5;
			balls.push(ball);
			scene.add(ball);
		}

		camera.position.z = 10;

		// Fluid-like movement
		const animateBalls = () => {
			const time = Date.now() * 0.0005;

			balls.forEach((ball, index) => {
				ball.position.x = Math.sin(time + index) * 2;
				ball.position.y = Math.cos(time + index) * 2;
			});
		};

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			animateBalls();
			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			mountRef.current?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={mountRef}></div>;
};

export default LavaLamp;
