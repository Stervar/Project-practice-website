// Класс для создания интерактивной модели Солнечной системы
class SolarSystem {
    // Конструктор класса - инициализирует все параметры Солнечной системы
    constructor() {
        // Коэффициент масштабирования для унификации размеров
        this.scaleFactor = 0.6;
        
        // Базовая скорость анимации
        this.animationSpeed = 0.001;

        // Параметры Солнца
        this.sun = {
            name: 'sun',                                           // Уникальный идентификатор
            size: 250 * this.scaleFactor,                          // Размер с учетом масштабирования
            color: 'radial-gradient(circle, #ffff00, #ff8c00)',    // Градиентный цвет
            link: 'sun.html'                                       // Ссылка на страницу
        };

        // Массив планет с индивидуальными параметрами
        this.planets = [
            {
                name: 'mercury',                  // Название планеты
                orbitRadius: 150,                 // Радиус орбиты
                size: 30,                         // Размер планеты
                speed: 0.02,                      // Скорость движения
                color: '#8c7853',                 // Цвет планеты
                startAngle: Math.random() * Math.PI * 2,  // Случайное начальное положение
                link: 'mercury.html'              // Ссылка на страницу планеты
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

        // Вызов методов инициализации
        this.createSun();           // Создание визуального представления Солнца
        this.createOrbits();        // Создание орбитальных треков
        this.createPlanets();       // Создание планет
        this.animatePlanets();      // Запуск анимации движения планет
        this.setupPlanetInteractions(); // Настройка интерактивности планет
    }

    // Метод создания визуального представления Солнца
    createSun() {
        // Получение контейнера для солнечной системы
        const container = document.getElementById('solar-system-container');
        // Вычисление центра контейнера
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
    
        // Создание DOM-элемента Солнца
        const sunElement = document.createElement('div');
        sunElement.classList.add('celestial-body', 'sun');
        sunElement.id = this.sun.name;
        
        // Установка размеров Солнца
        sunElement.style.width = `${this.sun.size}px`;
        sunElement.style.height = `${this.sun.size}px`;
        sunElement.style.background = this.sun.color;
        
        // Позиционирование Солнца по центру
        sunElement.style.left = `${centerX - this.sun.size / 2}px`;
        sunElement.style.top = `${centerY - this.sun.size / 2}px`;
        
        // Добавление эффекта свечения
        sunElement.style.boxShadow = '0 0 50px #ffff00, 0 0 100px #ff8c00';
        
        // Добавление Солнца в контейнер
        container.appendChild(sunElement);
    }
    
    // Метод настройки интерактивности планет
    setupPlanetInteractions() {
        // Выбор всех планет и Солнца
        const planets = document.querySelectorAll('.celestial-body.planet, .celestial-body.sun');
    
        planets.forEach(planet => {
            // Обработчик клика - переход на страницу планеты
            planet.addEventListener('click', () => {
                if (planet.classList.contains('sun')) {
                    window.location.href = this.sun.link;
                    return;
                }
    
                const planetData = this.planets.find(p => p.name === planet.id);
                window.location.href = planetData.link;
            });
    
            // Эффект увеличения при наведении мыши
            planet.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'scale(1.2)';
                e.target.style.zIndex = '10';
            });
    
            // Возврат к исходному размеру при уводе мыши
            planet.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.zIndex = '1';
            });
        });
    }
    
    // Метод создания орбитальных треков
    createOrbits() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        // Создание орбиты для каждой планеты
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

    // Метод создания визуального представления планет
    createPlanets() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        // Создание DOM-элемента для каждой планеты
        this.planets.forEach(planet => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('celestial-body', 'planet');
            planetElement.id = planet.name;
            planetElement.style.width = `${planet.size}px`;
            planetElement.style.height = `${planet.size}px`;
            planetElement.style.backgroundColor = planet.color;

            // Вычисление начальной позиции планеты
            const x = centerX + planet.orbitRadius * Math.cos(planet.startAngle);
            const y = centerY + planet.orbitRadius * Math.sin(planet.startAngle);
            planetElement.style.left = `${x}px`;
            planetElement.style.top = `${y}px`;

            // Добавление планеты в контейнер
            container.appendChild(planetElement);
        });
    }

    // Метод анимации движения планет
    animatePlanets() {
        const container = document.getElementById('solar-system-container');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        let lastTimestamp = 0;

        // Функция анимации
        const animate = (timestamp) => {
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            // Обновление позиции каждой планеты
            this.planets.forEach(planet => {
                const planetElement = document.getElementById(planet.name);
                
                // Обновление угла поворота планеты
                planet.startAngle += planet.speed * deltaTime * 0.01;

                // Вычисление новой позиции планеты
                const x = centerX + planet.orbitRadius * Math.cos(planet.startAngle);
                const y = centerY + planet.orbitRadius * Math.sin(planet.startAngle);

                // Установка новой позиции планеты
                planetElement.style.left = `${x}px`;
                planetElement.style.top = `${y}px`;
            });

            // Запрос следующего кадра анимации
            requestAnimationFrame(animate);
        };

        // Запуск анимации
        requestAnimationFrame(animate);
    }
}

// Инициализация Солнечной системы после загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('solar-system-container');
    if (container) {
        new SolarSystem(); // Создание нового экземпляра класса SolarSystem
    } else {
        console.error('Solar system container not found'); // Ошибка, если контейнер не найден
    }
});