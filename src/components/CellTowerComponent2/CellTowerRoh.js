// src/CellTower.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

const CellTower = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('cell-tower').appendChild(renderer.domElement);

        const towerBaseGeometry = new THREE.Geometry();
        towerBaseGeometry.vertices.push(new THREE.Vector3(-1, 0, -1));
        towerBaseGeometry.vertices.push(new THREE.Vector3(1, 0, -1));
        towerBaseGeometry.vertices.push(new THREE.Vector3(1, 0, 1));
        towerBaseGeometry.vertices.push(new THREE.Vector3(-1, 0, 1));
        towerBaseGeometry.vertices.push(new THREE.Vector3(0, 2, 0));

        towerBaseGeometry.faces.push(new THREE.Face3(0, 1, 4));
        towerBaseGeometry.faces.push(new THREE.Face3(1, 2, 4));
        towerBaseGeometry.faces.push(new THREE.Face3(2, 3, 4));
        towerBaseGeometry.faces.push(new THREE.Face3(3, 0, 4));
        towerBaseGeometry.faces.push(new THREE.Face3(1, 0, 3, 2));

        const towerMaterial = new THREE.MeshBasicMaterial({ color: 0x3498db });
        const tower = new THREE.Mesh(towerBaseGeometry, towerMaterial);
        scene.add(tower);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return <div id="cell-tower" />;
};

export default CellTower;
