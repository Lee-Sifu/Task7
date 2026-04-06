import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Planet class for Team C
export class PlanetC {
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
        //STEP 1:
         const planetGeometry = new THREE.SphereGeometry(2, 32, 32);
         const planetMaterial = new THREE.MeshStandardMaterial({color: 0x0b87ff});
         this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
         this.planetMesh.castShadow = true;
         this.planetMesh.receiveShadow = true;
         this.group.add(this.planetMesh);
        
        //STEP 2: 
        // moons 
        const moonGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const moonGeometry2 = new THREE.SphereGeometry(0.3, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
        const moonMaterial2 = new THREE.MeshStandardMaterial({ color: 0x444444 });
       
        this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonMesh.castShadow = true;
        this.moonMesh.receiveShadow = true;
        this.group.add(this.moonMesh);
       
        this.moonMesh2 = new THREE.Mesh(moonGeometry2, moonMaterial2);
        this.moonMesh2.castShadow = true;
        this.moonMesh2.receiveShadow = true; 
        this.group.add(this.moonMesh2);

        //STEP 3:
        // Load Blender model to populate the planet
        const gltfLoader = new GLTFLoader();
this.kiwibirdModel = null;

gltfLoader.load(
    'assets/kiwibird/kiwibird.gltf',
    (gltf) => {
        this.kiwibirdModel = gltf.scene;
        this.kiwibirdModel.scale.set(2, 2, 2);
        this.kiwibirdModel.position.set(0, 1.5, 0);
        this.kiwibirdModel.rotation.x = -Math.PI / 10;
        this.kiwibirdModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        }); // <-- traverse closes here
        this.group.add(this.kiwibirdModel);
    },
    undefined, // progress callback (unused)
    (error) => {
        console.error('Failed to load kiwibird model:', error);
    }
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

        // Orbit moons around planet
        this.moonAngle += delta * 1.5;
        this.moonMesh.position.set(Math.cos(this.moonAngle) * 3, 0, Math.sin(this.moonAngle) * 3);

        this.moonAngle2 += delta * 2.2;
        this.moonMesh2.position.set(Math.cos(this.moonAngle2) * -3, 0.5, Math.sin(this.moonAngle2) * -3);
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

