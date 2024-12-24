class AdvancedDataLoader {
    static async loadPlanets() {
        try {
            const response = await fetch('/data/planets.json');
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки данных о планетах:', error);
            return { planets: [] };
        }
    }

    static async loadPlanetTextures(planets) {
        const textureLoader = new THREE.TextureLoader();
        
        const texturedPlanets = await Promise.all(
            planets.map(async (planet) => {
                try {
                    planet.texture = await textureLoader.loadAsync(
                        `/textures/${planet.name.toLowerCase()}.jpg`
                    );
                    return planet;
                } catch (error) {
                    console.warn(`Текстура для ${planet.name} не найдена`);
                    return planet;
                }
            })
        );

        return texturedPlanets;
    }

    static async cacheResources() {
        const resources = [
            '/data/planets.json',
            '/js/libs/three.min.js',
            '/js/libs/gsap.min.js',
            // Добавьте пути к текстурам и другим ресурсам
        ];

        await Promise.all(resources.map(url => 
            fetch(url).catch(error => console.warn(`Не удалось предварительно загрузить ${url}`))
        ));
    }
}