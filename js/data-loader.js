async function loadPlanets() {
    try {
        const response = await fetch('data/planets.json');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки планет:', error);
        return [];
    }
}

async function loadMoons() {
    try {
        const response = await fetch('data/moons.json');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки лун:', error);
        return [];
    }
}