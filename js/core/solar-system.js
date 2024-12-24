// js/core/solar-system.js
class SolarSystem {
    constructor(canvasId, config = {}) {
        this.config = {
            performance: {
                renderQuality: 'high',
                enablePostProcessing: true,
                antialias: true
            },
            ...config
        };

        this.canvas = document.getElementById(canvasId);
        this.initThreeComponents();
        this.setupScene();
        this.setupLighting();
        this.createSun();
        this.initializeSystem();
    }

    initThreeComponents() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            2000
        );
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: this.config.performance.antialias
        });

        this.planets = [];
    }

    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a1a);
        this.camera.position.z = 250;

        // Добавление starfield
        this.addStarfield();
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(0, 0, 0);
        this.scene.add(ambientLight, pointLight);
    }

    createSun() {
        const sunGeometry = new THREE.SphereGeometry(15, 64, 64);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 1
        });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(this.sun);
    }

    async initializeSystem() {
        try {
            await this.loadPlanets();
            this.setupPostProcessing();
            this.startAnimation();
        } catch (error) {
            Logger.log(Logger.levels.ERROR, 'Ошибка инициализации системы', error);
        }
    }

    async loadPlanets() {
        const planetsData = await AdvancedDataLoader.loadPlanetsWithTextures();
        
        planetsData.planets.forEach(planetData => {
            const planet = this.createPlanet(planetData);
            this.createPlanetParticleSystem(planet);
        });
    }

    createPlanet(planetData) {
        const geometry = new THREE.SphereGeometry(planetData.size, 64, 64);
        const material = new THREE.MeshStandardMaterial({ 
            map: planetData.texture,
            color: planetData.color,
            roughness: 0.7,
            metalness: 0.3
        });

        const planet = new THREE.Mesh(geometry, material);
        planet.name = planetData.name;
        planet.userData = planetData;

        this.createPlanetOrbit(planet);
        this.positionPlanet(planet);

        return planet;
    }

    createPlanetOrbit(planet) {
        const orbitGeometry = new THREE.RingGeometry(
            planet.userData.distance, 
            planet.userData.distance + 1, 
            128
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.1
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        this.scene.add(orbit);
    }

    positionPlanet(planet) {
        planet.position.set(planet.userData.distance, 0, 0);
        this.scene.add(planet);
        this.planets.push(planet);
    }

    addStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true
        });

        const starVertices = [];
        const starCount = this.config.visual?.starfieldDensity || 10000;

        for (let i = 0; i < starCount; i++) {
            starVertices.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
            );
        }

        starGeometry.setAttribute(
            'position', 
            new THREE.Float32BufferAttribute(starVertices, 3)
        );
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }

    setupPostProcessing() {
        if (!this.config.performance.enablePostProcessing) return;

        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,  // Интенсивность
            0.4,  // Радиус
            0.85  // Порог
        );
        this.composer.addPass(bloomPass);
    }

    createPlanetParticleSystem(planet) {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 5000;

        const posArray = new Float32Array(particlesCnt * 3);
        const particleRadius = planet.geometry.parameters.radius * 5;

        for (let i = 0; i < particlesCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * particleRadius;
        }

        particlesGeometry.setAttribute(
            'position', 
            new THREE.BufferAttribute(posArray, 3)
        );
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: planet.material.color,
            transparent: true,
            opacity: 0.5
        });

        const particleSystem = new THREE.Points(
            particlesGeometry, 
            particlesMaterial
        );
        
        particleSystem.position.copy(planet.position);
        this.scene.add(particleSystem);

        return particleSystem;
    }

    startAnimation() {
        const animate = () => {
            requestAnimationFrame(animate); // Вращение планет
            this.planets.forEach((planet, index) => {
                const angle = Date.now() * 0.0001 * (index + 1);
                planet.position.x = Math.cos(angle) * planet.userData.distance;
                planet.position.z = Math.sin(angle) * planet.userData.distance;
            });

            // Вращение солнца
            this.sun.rotation.y += 0.001;

            if (this.config.performance.enablePostProcessing) {
                this.composer.render();
            } else {
                this.renderer.render(this.scene, this.camera);
            }
        };

        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const solarSystem = new SolarSystem('solar-system-canvas', {
        config: SolarSystemConfig
    });
    new AdvancedPlanetInteractions(solarSystem);
});