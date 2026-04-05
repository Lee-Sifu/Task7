import * as THREE from 'three';

// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.moonAngle = 0;
        this.moonAngle2 = 0;
        this.moonAngle3 = 0;
        //Create planet group
        this.group = new THREE.Group()
              
        // Create planet
        //STEP 1:
       const planetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
       const planetMaterial = new THREE.MeshStandardMaterial({color: 0x4555ff});
       this.planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
       this.planetMesh.castShadow = true;
       this.planetMesh.receiveShadow = true;
       this.group.add(this.planetMesh);

        //STEP 2: 
        const moonGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const moonGeometry2 = new THREE.SphereGeometry(0.3, 16, 16);
        const moonGeometry3 = new THREE.SphereGeometry(0.2, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const moonMaterial2 = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const moonMaterial3 = new THREE.MeshStandardMaterial({ color: 0x333333 });

        this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonMesh.castShadow = true;
        this.moonMesh.receiveShadow = true;
        this.group.add(this.moonMesh);
       
        this.moonMesh2 = new THREE.Mesh(moonGeometry2, moonMaterial2);
        this.moonMesh2.castShadow = true;
        this.moonMesh2.receiveShadow = true;
        this.group.add(this.moonMesh2);

        this.moonMesh3 = new THREE.Mesh(moonGeometry3, moonMaterial3);
        this.moonMesh3.castShadow = true;
        this.moonMesh3.receiveShadow = true;
        this.group.add(this.moonMesh3);

        //STEP 3:
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

        // Orbit moons around planet
        this.moonAngle += delta * 1.5;
        this.moonMesh.position.set(Math.cos(this.moonAngle) * 3, 0, Math.sin(this.moonAngle) * 3);

        this.moonAngle2 += delta * 2.2;
        this.moonMesh2.position.set(Math.cos(this.moonAngle2) * -3, 0.5, Math.sin(this.moonAngle2) * -3);

        this.moonAngle3 += delta * 3.0;
        this.moonMesh3.position.set(Math.cos(this.moonAngle3) * 2, -0.5, Math.sin(this.moonAngle3) * 2);
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

