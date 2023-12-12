// src/components/CellTowerComponent.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';

const CellTowerComponent = () => {
    const mountRef = useRef(null);
    const segments = [];

    useEffect(() => {
        // Scene
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x8FBCD4); // Optional: Set background color

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const segmentHeight = 5 / 10;
        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.CylinderGeometry(0.5, 0.5, segmentHeight, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
            const segment = new THREE.Mesh(geometry, material);
            segment.position.y = segmentHeight * i - 2.5 + segmentHeight / 2; // Adjust Y position for each segment
            segment.position.z = 10
            scene.add(segment);
            segments.push(segment);
        }

        const raycaster = new Raycaster();
        const mouse = new Vector2();

        // ... previous code for tower segments

        // Create antennas
        const antennaHeight = 1;
        const antennaRadius = 0.05;
        const antennaGeometry = new THREE.CylinderGeometry(antennaRadius, antennaRadius, antennaHeight, 32);
        const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

        const antennas = [];
        const antennaPositions = [
            { x: 0.9, y: 2.5, z: 0 },
            { x: 0.7, y: 2.5, z: 0 },
            { x: 0, y: -2.5, z: 0.7 },
            { x: 0, y: 2.5, z: 0.7 },
        ];

        antennaPositions.forEach(pos => {
            const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
            antenna.position.set(pos.x, pos.y, pos.z);
            scene.add(antenna);
            antennas.push(antenna);
        });

        // ... rest of the code (raycaster, animation, etc.)


        function onClick(event) {
            // Calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);

            // Calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(segments);

            if (intersects.length > 0) {
                console.log('Segment clicked:', intersects[0].object);
                intersects[0].object.material.color.set(0x808080); // Log or handle click event
            }
        }

        window.addEventListener('click', onClick);


        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Cell Tower Geometry
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x808080, 
            transparent: true,
            opacity: 0.5
        });
        const tower = new THREE.Mesh(geometry, material);
        scene.add(tower);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            // tower.rotation.x += 0.01;
            // tower.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Clean up
        return () => {
            window.removeEventListener('click', onClick);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef}></div>;
};

export default CellTowerComponent;
