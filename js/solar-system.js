class SolarSystem {
    constructor() {
        this.planets = [];
        this.currentPlanetIndex = -1;
        this.initializePlanets();
        this.setupEventListeners();
    }

    async initializePlanets() {
        try {
            this.planets = await loadPlanets();
            this.renderPlanets();
            this.updatePlanetInfo(null);
        } catch (error) {
            console.error('Ошибка инициализации:', error);
        }
    }

    renderPlanets() {
        const container = document.querySelector('.planet-orbit-container');
        container.innerHTML = '';


        const centerX = 500; 
        const centerY = 500; 
        const baseOrbitRadius = 200; 
        const orbitSpread = 100; 

        this.planets.forEach((planet, index) => {
            const orbit = document.createElement('div');
            orbit.classList.add('planet-orbit');

            const orbitRadius = baseOrbitRadius + (index * orbitSpread);
            orbit.style.width = `${orbitRadius * 2}px`;
            orbit.style.height = `${orbitRadius * 2}px`;
            orbit.style.left = `${centerX - orbitRadius}px`;
            orbit.style.top = `${centerY - orbitRadius}px`;

            const planetElement = this.createPlanetElement(planet, index);
            const angle = (index / this.planets.length) * 360;
            const x = orbitRadius * Math.cos(angle * Math.PI / 180);
            const y = orbitRadius * Math.sin(angle * Math.PI / 180);

            planetElement.style.position = 'absolute';
            planetElement.style.left = `${centerX + x}px`;
            planetElement.style.top = `${centerY + y}px`;

            orbit.appendChild(planetElement);
            container.appendChild(orbit);
        });
    }

    createPlanetElement(planet, index) {
        const element = document.createElement('div');
        element.classList.add('planet', planet.name.toLowerCase());
        element.dataset.index = index;

        const planetSize = 50 - (index * 2);
        element.style.width = `${planetSize}px`;
        element.style.height = `${planetSize}px`;

        const surface = document.createElement('div');
        surface.classList.add('planet-surface');
        surface.style.backgroundImage = `url(images/planets/${planet.name.toLowerCase()}.jpg)`;

        const atmosphere = document.createElement('div');
        atmosphere.classList.add('planet-atmosphere');

        const label = document.createElement('div');
        label.classList.add('planet-label');
        label.textContent = planet.name;

        element.appendChild(surface);
        element.appendChild(atmosphere);
        element.appendChild(label);

        element.addEventListener('click', () => this.showPlanetDetails(planet, index));
        return element;
    }

    showPlanetDetails(planet, index) {
        this.currentPlanetIndex = index;
        this.updatePlanetInfo(planet);

        const modal = document.getElementById('planet-modal');
        const modalContent = modal.querySelector('.modal-planet-info');

        modalContent.innerHTML = `
            <h2>${planet.name}</h2>
            <img src="images/planets/${planet.name.toLowerCase()}.jpg" alt="${planet.name}" style="max-width: 100%; border-radius: 10px;">
            <p>${planet.description}</p>
            <div class="planet-details">
                <p><strong>Диаметр:</strong> ${planet.diameter} км</p>
                <p><strong>Расстояние от Солнца:</strong> ${planet.distanceFromSun} млн км</p>
                <p><strong>Продолжительность года:</strong> ${planet.yearLength} земных дней</p>
            </div>
        `;

        modal.style.display = 'block';
    }

    updatePlanetInfo(planet) {
        const nameElement = document.getElementById('planet-name');
        const descriptionElement = document.getElementById('planet-description');

        if (planet) {
            nameElement.textContent = planet.name;
            descriptionElement.textContent = planet.description;
        } else {
            nameElement.textContent = 'Солнечная система';
            descriptionElement.textContent = 'Исследуйте удивительный мир планет и их спутников';
        }
    }

    setupEventListeners() {
        document.querySelector('.next-planet').addEventListener('click', () => this.nextPlanet());
        document.querySelector('.prev-planet').addEventListener('click', () => this.prevPlanet());
        
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('planet-modal').style.display = 'none';
        });
    }

    nextPlanet() {
        this.currentPlanetIndex = (this.currentPlanetIndex + 1) % (this.planets.length + 1);
        
        if (this.currentPlanetIndex === 0) {
            this.updatePlanetInfo(null);
        } else {
            const planet = this.planets[this.currentPlanetIndex - 1];
            this.updatePlanetInfo(planet);
        }
    }

    prevPlanet() {
        this.currentPlanetIndex--;
        
        if (this.currentPlanetIndex < 0) {
            this.currentPlanetIndex = this.planets.length;
        }

        if (this.currentPlanetIndex === 0) {
 this.updatePlanetInfo(null);
        } else {
            const planet = this.planets[this.currentPlanetIndex - 1];
            this.updatePlanetInfo(planet);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SolarSystem();
});