class PlanetInteractions {
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.solarSystem.canvas.addEventListener('click', this.handlePlanetClick.bind(this));
        this.solarSystem.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.solarSystem.camera);
        const intersects = this.raycaster.intersectObjects(this.solarSystem.planets);

        if (intersects.length > 0) {
            document.body.style .cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }

    handlePlanetClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.solarSystem.camera);
        const intersects = this.raycaster.intersectObjects(this.solarSystem.planets);

        if (intersects.length > 0) {
            const selectedPlanet = intersects[0].object;
            this.showPlanetInfo(selectedPlanet);
        }
    }

    showPlanetInfo(planet) {
        const infoPanel = document.getElementById('planet-info-panel');
        infoPanel.innerHTML = `
            <h2>${planet.userData.name}</h2>
            <p>${planet.userData.description}</p>
            <p>Период орбиты: ${planet.userData.orbitPeriod} земных лет</p>
        `;

        // Анимация выделения планеты
        gsap.to(planet.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.5,
            onComplete: () => {
                gsap.to(planet.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.5
                });
            }
        });
    }

    handleResize() {
        this.solarSystem.camera.aspect = window.innerWidth / window.innerHeight;
        this.solarSystem.camera.updateProjectionMatrix();
        this.solarSystem.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}