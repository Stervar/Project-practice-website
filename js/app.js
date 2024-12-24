
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Регистрация service worker
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/service-worker.js')
                .catch(error => console.error('Service Worker registration failed:', error));
        }

        // Инициализация логгера и менеджера событий
        const logger = new Logger();
        const eventManager = new EventManager();
        
        // Прячем overlay после загрузки
        const loadingOverlay = document.getElementById('loading-overlay');
        
        // Создание солнечной системы
        const solarSystem = new SolarSystem('solar-system-canvas', {
            performance: {
                renderQuality: 'high',
                enablePostProcessing: true,
                antialias: true
            }
        });

        // Настройка взаимодействия
        const planetInteractions = new AdvancedPlanetInteractions(solarSystem);

        // Скрытие загрузочного экрана
        loadingOverlay.classList.add('hidden');

        // Логирование событий
        logger.log(Logger.levels.INFO, 'Солнечная система инициализирована');
        eventManager.emit('systemReady', solarSystem);

    } catch (error) {
        console.error('Критическая ошибка инициализации:', error);
        
        // Показываем сообщение об ошибке
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.innerHTML = `
            <div class="error-message">
                <p>Ошибка загрузки системы</p>
                <button onclick="location.reload()">Перезагрузить</button>
            </div>
        `;
    }
});