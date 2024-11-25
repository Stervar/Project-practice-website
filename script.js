class AdvancedLavaBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;

        // Параметры взаимодействия
        this.particles = [];
        this.modes = [
            'fluid', 
            'cosmic', 
            'electric', 
            'organic', 
            'psychedelic'
        ];
        this.currentMode = 'fluid';
        this.colorPalettes = {
            fluid: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9d5e5'],
            cosmic: ['#8A4FFF', '#5200FF', '#00FFFF', '#FF00FF'],
            electric: ['#00FF00', '#0000FF', '#FF0000', '#FFFF00'],
            organic: ['#2ecc71', '#3498db', '#e74c3c', '#f39c12'],
            psychedelic: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000']
        };

        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }

    initParticles() {
        this.particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 10 + Math.random() * 50,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const palette = this.colorPalettes[this.currentMode];
        return palette[Math.floor(Math.random() * palette.length)];
    }

    setupEventListeners() {
        // Смена режима по клику
        window.addEventListener('click', () => {
            this.switchMode();
        });

        // Интерактивность с мышью
        this.canvas.addEventListener('mousemove', (e) => {
            this.particles.forEach(particle => {
                const dx = e.clientX - particle.x;
                const dy = e.clientY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    particle.vx += dx * 0.01;
                    particle.vy += dy * 0.01;
                }
            });
        });

        // Адаптивность
        window.addEventListener('resize', () => {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
            this.initParticles();
        });
    }

    switchMode() {
        const currentIndex = this.modes.indexOf(this.currentMode);
        this.currentMode = this.modes[(currentIndex + 1) % this.modes.length];
        this.initParticles();
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Отскок от границ
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;

            // Затухание движения
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(particle => {
            // Создаем размытый эффект
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация
window.addEventListener('load', () => {
    const canvas = document.getElementById('lavaLampCanvas');
    new AdvancedLavaBackground(canvas);
});