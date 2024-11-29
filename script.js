const NUMBER_OF_STARS = 100; // Количество звезд

for (let i = 0; i < NUMBER_OF_STARS; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 10 + 5; // Увеличиваем размер звезд от 5 до 15 пикселей
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`; // Позиция по вертикали
    star.style.left = `${Math.random() * 100}vw`; // Позиция по горизонтали

    // Определяем цвет звезды в зависимости от случайного значения
    const temperatureType = Math.floor(Math.random() * 5); // Случайное число от 0 до 4
    let hue;
    
    switch (temperatureType) {
        case 0: // Красные звезды
            hue = Math.random() * 10; // Hue от 0 до 10
            break;
        case 1: // Оранжевые звезды
            hue = Math.random() * 30 + 10; // Hue от 10 до 40
            break;
        case 2: // Желтые звезды
            hue = Math.random() * 20 + 40; // Hue от 40 до 60
            break;
        case 3: // Белые звезды
            hue = 0; // Hue для белого цвета
            star.style.backgroundColor = `hsl(${hue}, 0%, 100%)`; // Белый цвет
            break;
        case 4: // Голубые звезды
            hue = Math.random() * 60 + 180; // Hue от 180 до 240
            break;
    }

    // Устанавливаем цвет, если это не белая звезда
    if (temperatureType !== 3) {
        star.style.backgroundColor = `hsl(${hue}, 100%, 80%)`; // Устанавливаем цвет
    }

    star.style.animationDuration = `${Math.random() * 1 + 0.5}s`; // Разное время анимации

    // Добавляем легкое движение звезды
    star.style.animation = `twinkle 1.5s infinite alternate, pulse 1.5s infinite alternate, particle-move 2s infinite alternate`;

    // Добавляем интерактивность
    star.addEventListener('mouseover', () => {
        star.style.transform = 'scale(1.5)'; // Увеличиваем звезду
        star.style.opacity = '1'; // Увеличиваем яркость
    });

    star.addEventListener('mouseout', () => {
        star.style.transform = 'scale(1)'; // Возвращаем звезду к исходному размеру
        star.style.opacity = Math.random() * 0.5 + 0.7; // Случайная яркость
    });

    // Добавляем эффект взрыва при нажатии
    star.addEventListener('click', () => {
        // Создаем эффект взрыва
        for (let j = 0; j < 20; j++) { // Создаем 20 "частиц"
            const particle = document.createElement('div');
            particle.className = 'star';
            const particleSize = Math.random() * 5 + 1; // Размер частиц
            particle.style.width = `${particleSize}px`;
            particle.style.height = `${particleSize}px`;
            particle.style.position = 'absolute';
            particle.style.backgroundColor = star.style.backgroundColor; // Цвет такой же, как у звезды
            particle.style.top = star.offsetTop + size / 2 + 'px'; // Центрируем по звезде
            particle.style.left = star.offsetLeft + size / 2 + 'px'; // Центрируем по звезде

            // Добавляем случайный угол и скорость для разлета частиц
            const angle = Math.random() * 2 * Math.PI; // Случайный угол
            const distance = Math.random() * 100 + 50; // Случайное расстояние
            particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            particle.style.animation = `particle-move 0.5s forwards`; // Запускаем анимацию движения частиц

            document.body.appendChild (particle);

            // Удаляем частицу после завершения анимации, но с эффектом растворения
            particle.addEventListener('animationend', () => {
                particle.style.transition = 'opacity 1s'; // Плавное растворение
                particle.style.opacity = '0'; // Уменьшаем непрозрачность
                setTimeout(() => {
                    particle.remove(); // Удаляем частицу после растворения
                }, 1000); // Задержка, чтобы дождаться завершения анимации растворения
            });
        }

        // Создаем круг для импульса
        const impulseCircle = document.createElement('div');
        impulseCircle.className = 'impulse-circle'; // Класс для стилей
        impulseCircle.style.width = `${size * 3}px`; // Ширина круга
        impulseCircle.style.height = `${size * 3}px`; // Высота круга
        impulseCircle.style.top = `${star.offsetTop + size / 2 - size}px`; // Центрируем по звезде
        impulseCircle.style.left = `${star.offsetLeft + size / 2 - size}px`; // Центрируем по звезде
        document.body.appendChild(impulseCircle);

        // Анимация импульса
        impulseCircle.style.animation = 'expand 0.5s forwards'; // Запускаем анимацию импульса
        impulseCircle .addEventListener('animationend', () => {
            impulseCircle.style.transition = 'opacity 1s'; // Плавное растворение
            impulseCircle.style.opacity = '0'; // Уменьшаем непрозрачность
            setTimeout(() => {
                impulseCircle.remove(); // Удаляем круг после растворения
            }, 1000); // Задержка, чтобы дождаться завершения анимации растворения
});
        // Запускаем анимацию взрыва для звезды
        star.style.animation = 'explode 0.5s forwards'; // Запускаем анимацию взрыва для звезды
        star.addEventListener('animationend', () => {
            star.remove(); // Удаляем звезду после завершения анимации
        });
    });

    document.body.appendChild(star);
}

function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';

    // Задаем случайную начальную позицию метеора с разных сторон экрана
    const side = Math.floor(Math.random() * 4); // Случайный выбор стороны
    let startX, startY;

    switch (side) {
        case 0: // Слева
            startX = -10; // Начальная позиция за пределами экрана слева
            startY = Math.random() * 100; // Случайная позиция по вертикали
            break;
        case 1: // Справа
            startX = 100; // Начальная позиция за пределами экрана справа
            startY = Math.random() * 100;
            break;
        case 2: // Сверху
            startX = Math.random() * 100;
            startY = -10; // Начальная позиция за пределами экрана сверху
            break;
        case 3: // Снизу
            startX = Math.random() * 100;
            startY = 100; // Начальная позиция за пределами экрана снизу
            break;
    }

    meteor.style.left = `${startX}vw`;
    meteor.style.top = `${startY}vh`; // Начальная позиция по вертикали

    // Задаем конечную позицию метеора
    const endX = Math.random() * 100; // Конечная позиция по горизонтали
    const endY = Math.random() * 100; // Конечная позиция по вертикали

    // Задаем анимацию для метеора, чтобы он летел медленнее
    meteor.style.animation = `move-meteor 6s linear forwards`; // Увеличиваем время анимации до 6 секунд

    document.body.appendChild(meteor);

        
    // Удаляем метеор и останавливаем создание частиц после завершения анимации
    meteor.addEventListener('animationend', () => {
        meteor.remove(); // Удаляем метеор после завершения анимации
    });
}

// Запускаем создание 3 метеоров каждые 30000 миллисекунд (30 секунд)
setInterval(() => {
    for (let i = 0; i < 3; i++) {
        createMeteor();
    }
}, 30000);

document.head.appendChild(style);