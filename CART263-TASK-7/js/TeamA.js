import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Planet class for Team A
export class PlanetA {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

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
        const moonMaterial = new THREE.MeshStandardMaterial({color: 0x888888});
        const moonMaterial2 = new THREE.MeshStandardMaterial({color: 0x555555});
        this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonMesh.castShadow = true;
        this.moonMesh.receiveShadow = true;
        this.moonMesh.position.set(3, 0, 0); // Position the moon at a distance from the planet
        this.group.add(this.moonMesh);

        this.moonMesh2 = new THREE.Mesh(moonGeometry2, moonMaterial2);
        this.moonMesh2.castShadow = true;
        this.moonMesh2.receiveShadow = true;
        this.moonMesh2.position.set(-3, 0, 0); // Position the second moon at a distance from the planet
        this.group.add(this.moonMesh2);
       
        //STEP 3:
       const gltfLoader = new GLTFLoader();
this.wolfModel = null;

gltfLoader.load(
    'models/Wolf-Blender-2_82a.glb',   // use .glb — self-contained
    (gltf) => {
        this.wolfModel = gltf.scene;
        this.wolfModel.scale.set(10, 10, 10);

        // Place wolf on the surface of the planet (radius = 1.5)
        this.wolfModel.position.set(0, 1.5, 0);

        // Rotate so wolf stands upright on the planet surface
        this.wolfModel.rotation.x = 0;

        // Enable shadows
        this.wolfModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        this.group.add(this.wolfModel);   // ← don't forget this!
    },
    (xhr) => {
        console.log('Wolf: ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading wolf model:', error);
    }
);
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.
        
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
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

