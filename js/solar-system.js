class SolarSystem {
    constructor() {
        this.scaleFactor = 0.6;
        this.animationSpeed = 0.001;

        this.sun = {
            name: 'sun',
            size: 250 * this.scaleFactor,
            color: 'radial-gradient(circle, #ffff00, #ff8c00)',
            link: 'sun.html'
        };

        this.planets = [
            {
                name: 'mercury',
                orbitRadius: 150,
                size: 30,
                speed: 0.02,
                color: '#8c7853',
                startAngle: Math.random() * Math.PI * 2,
                link: 'mercury.html'
            },
            {
                name: 'venus',
                orbitRadius: 220,
                size: 40,
                speed: 0.015,
                color: '#ffa500',
                startAngle: Math.random() * Math.PI * 2,
                link: 'venus.html'
            },
            {
                name: 'earth',
                orbitRadius: 300,
                size: 50,
                speed: 0.01,
                color: '#0077be',
                startAngle: Math.random() * Math.PI * 2,
                link: 'earth.html'
            },
            {
                name: 'mars',
                orbitRadius: 400,
                size: 45,
                speed: 0.008,
                color: '#ff4500',
                startAngle: Math.random() * Math.PI * 2,
                link: 'mars.html'
            },
            {
                name: 'jupiter',
                orbitRadius: 550,
                size: 100,
                speed: 0.005,
                color: '#ff7f50',
                startAngle: Math.random() * Math.PI * 2,
                link: 'jupiter.html'
            },
            {
                name: 'saturn',
                orbitRadius: 700,
                size: 80,
                speed: 0.003,
                color: '#f5deb3',
                startAngle: Math.random() * Math.PI * 2,
                link: 'saturn.html'
            },
            {
                name: 'uranus',
                orbitRadius: 850,
                size: 60,
                speed: 0.002,
                color: '#87ceeb',
                startAngle: Math.random() * Math.PI * 2,
                link: 'uranus.html'
            },
            {
                name: 'neptune',
                orbitRadius: 1000,
                size: 55,
                speed: 0.001,
                color: '#4169e1',
                startAngle: Math.random() * Math.PI * 2,
                link: 'neptune.html'
            }
        ];

        this.createSun();
        this.createOrbits();
        this.createPlanets();
        this.animatePlanets();
        this.setupPlanetInteractions();
    }

    createSun() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
    
        const sunElement = document.createElement('div');
        sunElement.classList.add('celestial-body', 'sun');
        sunElement.id = this.sun.name;
        
        sunElement.style.width = `${this.sun.size}px`;
        sunElement.style.height = `${this.sun.size}px`;
        sunElement.style.background = this.sun.color;
        
        sunElement.style.left = `${centerX - this.sun.size / 2}px`;
        sunElement.style.top = `${centerY - this.sun.size / 2}px`;
        
        sunElement.style.boxShadow = '0 0 50px #ffff00, 0 0 100px #ff8c00';
        
        container.appendChild(sunElement);
    }
    
    setupPlanetInteractions() {
        const planets = document.querySelectorAll('.celestial-body.planet, .celestial-body.sun');
    
        planets.forEach(planet => {
            planet.addEventListener('click', () => {
                if (planet.classList.contains('sun')) {
                    window.location.href = this.sun.link;
                    return;
                }
    
                const planetData = this.planets.find(p => p.name === planet.id);
                window.location.href = planetData.link;
            });
    
            planet.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'scale(1.2)';
                e.target.style.zIndex = '10';
            });
    
            planet.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = '1';
            });
        });
    }
    
    createOrbits() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        this.planets.forEach(planet => {
            const orbit = document.createElement('div');
            orbit.classList.add('orbit');
            orbit.style.width = `${planet.orbitRadius * 2}px`;
            orbit.style.height = `${planet.orbitRadius * 2}px`;
            orbit.style.left = `${centerX - planet.orbitRadius}px`;
            orbit.style.top = `${centerY - planet.orbitRadius}px`;
            container.appendChild(orbit);
        });
    }

    createPlanets() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        this.planets.forEach(planet => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('celestial-body', 'planet');
            planetElement.id = planet.name;
            planetElement.style.width = `${planet.size}px`;
            planetElement.style.height = `${planet.size}px`;
            planetElement.style.backgroundColor = planet.color;

            const x = centerX + planet.orbitRadius * Math.cos(planet.startAngle);
            const y = centerY + planet.orbitRadius * Math.sin(planet.startAngle);
            planetElement.style.left = `${x}px`;
            planetElement.style.top = `${y}px`;

            container.appendChild(planetElement);
        });
    }

    animatePlanets() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        let lastTimestamp = 0;

        const animate = (timestamp) => {
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            this.planets.forEach(planet => {
                const planetElement = document.getElementById(planet.name);
                
                planet.startAngle += planet.speed * deltaTime * 0.01;

                const x = centerX + planet.orbitRadius * Math.cos(planet.startAngle);
                const y = centerY + planet.orbitRadius * Math.sin(planet.startAngle);

                planetElement.style.left = `${x}px`;
                planetElement.style.top = `${y}px`;
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('solar-system-container');
    if (container) {
        new SolarSystem();
    } else {
        console.error('Solar system container not found');
    }
});