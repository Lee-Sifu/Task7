import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Planet class for Team A
export class PlanetA {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.moonAngle = 0;
        this.moonAngle2 = 0;

        //Create planet group
        this.group = new THREE.Group()
              
        // Create planet
        const planetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
        this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.group.add(this.planetMesh);

        //STEP 2: 
        const moonGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const moonGeometry2 = new THREE.SphereGeometry(0.3, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const moonMaterial2 = new THREE.MeshStandardMaterial({ color: 0x555555 });

        this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonMesh.castShadow = true;
        this.moonMesh.receiveShadow = true;
        this.group.add(this.moonMesh);

        this.moonMesh2 = new THREE.Mesh(moonGeometry2, moonMaterial2);
        this.moonMesh2.castShadow = true;
        this.moonMesh2.receiveShadow = true;
        this.group.add(this.moonMesh2);
       
        //STEP 3:
       const gltfLoader = new GLTFLoader();
       this.wolfModel = null;
       gltfLoader.load('assets/Wolf.glb', (gltf) => {
        this.wolfModel = gltf.scene;
        this.wolfModel.scale.set(0.3, 0.3, 0.3);
        this.wolfModel.position.set(0, 1.5, 0);
        this.wolfModel.rotation.x = -Math.PI / 10;
        
        this.wolfModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        this.group.add(this.wolfModel);
    },
    (xhr) => console.log('Wolf: ' + (xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.error('Error loading wolf model:', error)
);    
        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }
    
    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;
        
        // Rotate planet
        this.group.rotation.y += delta*0.5;

        //TODO: Do the moon orbits and the model animations here.
        this.moonAngle += delta * 1.5;
        this.moonMesh.position.set(Math.cos(this.moonAngle) * 3, 0, Math.sin(this.moonAngle) * 3);

        this.moonAngle2 += delta * 2.2;
        this.moonMesh2.position.set(Math.cos(this.moonAngle2) * -3, 0.5, Math.sin(this.moonAngle2) * -3);
    }

    click(mouse, scene, camera) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera); // Use mouse + camera, not hardcoded vectors

        const intersects = raycaster.intersectObjects(this.group.children, true);
        if (intersects.length > 0) {
            // Example animation: pulse the planet scale on click
            this.planetMesh.scale.set(1.3, 1.3, 1.3);
            setTimeout(() => this.planetMesh.scale.set(1, 1, 1), 300);
        }
    }
}
